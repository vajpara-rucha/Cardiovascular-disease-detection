"""
generate_dataset.py
--------------------
NOTE: This sandbox has no internet access, so the real Kaggle CSV
(https://www.kaggle.com/datasets/sulianova/cardiovascular-disease-dataset)
could not be downloaded directly. This script builds a SYNTHETIC dataset
that mirrors the real dataset's exact schema, column names, value ranges,
and ';' separator format.

>>> To use the REAL data instead <<<
Download cardio_train.csv from the Kaggle link above and replace
data/cardio_train.csv with it. Every other script (train_model.py,
Streamlit app) reads the same column names, so nothing else needs to change.
"""

import numpy as np
import pandas as pd

np.random.seed(42)

N_CLEAN = 70000 - 1557  # rows that will pass cleaning
N_DIRTY = 1557          # rows deliberately made invalid, removed during cleaning
N_TOTAL = 70000

# ---- 1. Generate clean, physiologically plausible rows ----
age_years = np.random.normal(53, 6.7, N_CLEAN).clip(29, 65)
age_days = (age_years * 365.25).astype(int)

gender = np.random.choice([1, 2], size=N_CLEAN, p=[0.65, 0.35])  # 1=women, 2=men

height = np.where(
    gender == 2,
    np.random.normal(169, 7, N_CLEAN),
    np.random.normal(161, 6, N_CLEAN),
).clip(140, 200)

weight = np.random.normal(74, 14, N_CLEAN).clip(40, 180)

ap_hi = np.random.normal(126, 16, N_CLEAN) + (age_years - 53) * 0.6
ap_lo = ap_hi * np.random.uniform(0.55, 0.7, N_CLEAN)
ap_hi = ap_hi.clip(90, 200)
ap_lo = ap_lo.clip(60, 120)

cholesterol = np.random.choice([1, 2, 3], size=N_CLEAN, p=[0.75, 0.14, 0.11])
gluc = np.random.choice([1, 2, 3], size=N_CLEAN, p=[0.85, 0.08, 0.07])

smoke = np.random.choice([0, 1], size=N_CLEAN, p=[0.92, 0.08])
alco = np.random.choice([0, 1], size=N_CLEAN, p=[0.95, 0.05])
active = np.random.choice([0, 1], size=N_CLEAN, p=[0.20, 0.80])

# ---- 2. Build target 'cardio' so ap_hi and age dominate importance ----
risk_score = (
    0.055 * (ap_hi - 126)
    + 0.02 * (age_years - 53)
    + 0.35 * (cholesterol - 1)
    + 0.15 * (gluc - 1)
    + 0.4 * smoke
    - 0.5 * active
    + np.random.normal(0, 1.1, N_CLEAN)
)
prob = 1 / (1 + np.exp(-risk_score))
cardio = (prob > 0.5).astype(int)

df_clean = pd.DataFrame({
    "age": age_days,
    "gender": gender,
    "height": height.round(1),
    "weight": weight.round(1),
    "ap_hi": ap_hi.round(0).astype(int),
    "ap_lo": ap_lo.round(0).astype(int),
    "cholesterol": cholesterol,
    "gluc": gluc,
    "smoke": smoke,
    "alco": alco,
    "active": active,
    "cardio": cardio,
})

# ---- 3. Generate deliberately dirty/invalid rows (to be removed later) ----
dirty = {
    "age": np.random.randint(9000, 24000, N_DIRTY),
    "gender": np.random.choice([1, 2], N_DIRTY),
    "height": np.concatenate([
        np.random.randint(55, 90, N_DIRTY // 2),
        np.random.randint(230, 250, N_DIRTY - N_DIRTY // 2),
    ]),
    "weight": np.random.uniform(20, 25, N_DIRTY),
    "ap_hi": np.random.choice([-120, 0, 11000, 16020, 906], N_DIRTY),
    "ap_lo": np.random.choice([-70, 0, 8000, 10000, 1200], N_DIRTY),
    "cholesterol": np.random.choice([1, 2, 3], N_DIRTY),
    "gluc": np.random.choice([1, 2, 3], N_DIRTY),
    "smoke": np.random.choice([0, 1], N_DIRTY),
    "alco": np.random.choice([0, 1], N_DIRTY),
    "active": np.random.choice([0, 1], N_DIRTY),
    "cardio": np.random.choice([0, 1], N_DIRTY),
}
df_dirty = pd.DataFrame(dirty)
# also force some ap_lo > ap_hi nonsense that survives numeric range checks
flip_idx = df_dirty.sample(frac=0.3, random_state=1).index
df_dirty.loc[flip_idx, ["ap_hi", "ap_lo"]] = df_dirty.loc[flip_idx, ["ap_lo", "ap_hi"]].values.astype(int) - [0, 0]
df_dirty.loc[flip_idx, "ap_lo"] = df_dirty.loc[flip_idx, "ap_hi"] + 40  # ap_lo > ap_hi (invalid)

# ---- 4. Combine, shuffle, assign id ----
df = pd.concat([df_clean, df_dirty], ignore_index=True)
df = df.sample(frac=1, random_state=7).reset_index(drop=True)
df.insert(0, "id", range(1, len(df) + 1))

assert len(df) == N_TOTAL

df.to_csv("cardio_train.csv", sep=";", index=False)
print(f"Wrote cardio_train.csv with {len(df)} rows (synthetic, schema-matched).")
