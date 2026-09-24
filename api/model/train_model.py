"""
train_model.py
---------------
Trains CVD risk models and saves them as .pkl files,
plus writes model_metrics.json (used by the app Model Info page).

Run from the project root:
    python api/model/train_model.py
  OR from api/model/ directory:
    python train_model.py
"""

import json
import os
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier
from sklearn.naive_bayes import GaussianNB
from sklearn.neighbors import KNeighborsClassifier
from sklearn.svm import LinearSVC
from sklearn.calibration import CalibratedClassifierCV
from sklearn.metrics import accuracy_score, f1_score, roc_auc_score
import joblib

# ---------------------------------------------------------------
# 0. Resolve paths robustly (works when run from any directory)
# ---------------------------------------------------------------
_HERE = os.path.dirname(os.path.abspath(__file__))
_ROOT = os.path.abspath(os.path.join(_HERE, '..', '..'))

DATA_PATH = os.path.join(_ROOT, 'data', 'cardio_train.csv')
BUNDLE_OUT = os.path.join(_HERE, 'cardio_models.pkl')
LEGACY_OUT = os.path.join(_HERE, 'cardio_model.pkl')
METRICS_OUT = os.path.join(_HERE, 'model_metrics.json')

# ---------------------------------------------------------------
# 1. Load data
# ---------------------------------------------------------------
df = pd.read_csv(DATA_PATH, sep=';')
raw_records = len(df)
print(f"Loaded {raw_records} records.")

# ---------------------------------------------------------------
# 2. Data cleaning
# ---------------------------------------------------------------
df = df.drop(columns=['id'])
df = df[
    (df['height'] >= 100) & (df['height'] <= 220) &
    (df['weight'] >= 30) & (df['weight'] <= 200) &
    (df['ap_hi'] >= 80) & (df['ap_hi'] <= 250) &
    (df['ap_lo'] >= 50) & (df['ap_lo'] <= 180) &
    (df['ap_hi'] > df['ap_lo'])
].reset_index(drop=True)

final_records = len(df)
rows_removed = raw_records - final_records
print(f"After cleaning: {final_records} records ({rows_removed} removed).")

# Convert age to years for a friendlier feature
df['age_years'] = (df['age'] / 365.25).round(1)

# ---------------------------------------------------------------
# 3. Feature / target split
# ---------------------------------------------------------------
FEATURES = ['age_years', 'gender', 'height', 'weight', 'ap_hi', 'ap_lo',
            'cholesterol', 'gluc', 'smoke', 'alco', 'active']
X = df[FEATURES]
y = df['cardio']

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)

scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# ---------------------------------------------------------------
# 4. Model specs
#    Random Forest is the DEFAULT: highest accuracy and handles
#    non-linear feature interactions properly — smoke/alco/active
#    won't falsely inflate risk scores when clinical indicators are normal.
#    Gradient Boosting added as a second high-accuracy ensemble option.
# ---------------------------------------------------------------
MODEL_SPECS = [
    {
        'key': 'random_forest',
        'label': 'Random Forest',
        'use_scaler': False,
        'estimator': RandomForestClassifier(
            n_estimators=200,
            max_depth=12,
            min_samples_leaf=10,
            n_jobs=-1,
            random_state=42,
        ),
    },
    {
        'key': 'gradient_boosting',
        'label': 'Gradient Boosting',
        'use_scaler': False,
        'estimator': GradientBoostingClassifier(
            n_estimators=150,
            max_depth=5,
            learning_rate=0.1,
            subsample=0.8,
            random_state=42,
        ),
    },
    {
        'key': 'logistic_regression',
        'label': 'Logistic Regression',
        'use_scaler': True,
        'estimator': LogisticRegression(max_iter=1000, random_state=42),
    },
    {
        'key': 'decision_tree',
        'label': 'Decision Tree',
        'use_scaler': False,
        'estimator': DecisionTreeClassifier(max_depth=8, min_samples_leaf=20, random_state=42),
    },
    {
        'key': 'gaussian_nb',
        'label': 'Gaussian Naive Bayes',
        'use_scaler': True,
        'estimator': GaussianNB(),
    },
    {
        'key': 'knn',
        'label': 'K-Nearest Neighbors',
        'use_scaler': True,
        'estimator': KNeighborsClassifier(n_neighbors=15),
    },
    {
        'key': 'svc',
        'label': 'Support Vector Classifier',
        'use_scaler': True,
        # Kernel SVC + probability=True is too slow on ~55k rows; LinearSVC
        # with calibration keeps the same features and yields predict_proba.
        'estimator': CalibratedClassifierCV(
            LinearSVC(max_iter=3000, dual=False, random_state=42),
            cv=3,
        ),
    },
]

DEFAULT_MODEL = 'random_forest'

# ---------------------------------------------------------------
# 5. Train models
# ---------------------------------------------------------------
trained = {}
per_model_metrics = {}

for spec in MODEL_SPECS:
    key = spec['key']
    estimator = spec['estimator']
    use_scaler = spec['use_scaler']
    X_fit = X_train_scaled if use_scaler else X_train
    X_eval = X_test_scaled if use_scaler else X_test

    print(f"Training {spec['label']}...")
    estimator.fit(X_fit, y_train)

    y_pred = estimator.predict(X_eval)
    y_proba = estimator.predict_proba(X_eval)[:, 1]

    accuracy = accuracy_score(y_test, y_pred)
    f1 = f1_score(y_test, y_pred)
    roc_auc = roc_auc_score(y_test, y_proba)

    print(f"  Accuracy: {accuracy:.3f}  F1: {f1:.3f}  ROC AUC: {roc_auc:.3f}")

    trained[key] = {
        'estimator': estimator,
        'use_scaler': use_scaler,
        'label': spec['label'],
    }
    per_model_metrics[key] = {
        'label': spec['label'],
        'use_scaler': use_scaler,
        'accuracy': round(accuracy * 100, 1),
        'f1_score': round(f1 * 100, 1),
        'roc_auc': round(roc_auc * 100, 1),
    }

rf_model = trained[DEFAULT_MODEL]['estimator']
rf_metrics = per_model_metrics[DEFAULT_MODEL]

# ---------------------------------------------------------------
# 6. Save models
# ---------------------------------------------------------------
joblib.dump(
    {
        'features': FEATURES,
        'scaler': scaler,
        'default_model': DEFAULT_MODEL,
        'models': trained,
    },
    BUNDLE_OUT,
)
print(f"Saved model bundle as '{BUNDLE_OUT}'")

# Keep the original single-model pickle for backward compatibility (now RF)
joblib.dump({'model': rf_model, 'features': FEATURES}, LEGACY_OUT)
print(f"Default Random Forest model saved as '{LEGACY_OUT}'")

# ---------------------------------------------------------------
# 7. Save metrics + feature importance + EDA numbers for the app
# ---------------------------------------------------------------
importances = pd.Series(rf_model.feature_importances_, index=FEATURES)
importances = (importances / importances.sum() * 100).sort_values(ascending=False)

metrics = {
    "algorithm": "RandomForestClassifier",
    "library": "scikit-learn",
    "feature_count": len(FEATURES),
    "default_model": DEFAULT_MODEL,
    "hyperparameters": {
        "n_estimators": 200,
        "max_depth": 12,
        "min_samples_leaf": 10,
    },
    "performance": {
        "accuracy": rf_metrics['accuracy'],
        "f1_score": rf_metrics['f1_score'],
        "roc_auc": rf_metrics['roc_auc'],
    },
    "models": per_model_metrics,
    "feature_importance": importances.round(1).to_dict(),
    "eda": {
        "raw_records": int(raw_records),
        "rows_removed": int(rows_removed),
        "rows_removed_pct": round(rows_removed / raw_records * 100, 2),
        "final_records": int(final_records),
    },
}

with open(METRICS_OUT, 'w') as f:
    json.dump(metrics, f, indent=2)

print(f"Saved {METRICS_OUT}")
print(f"\nDone! Default model: {DEFAULT_MODEL}")
print("All models available:", list(trained.keys()))
