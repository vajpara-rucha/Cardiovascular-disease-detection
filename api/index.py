import os
import joblib
import pandas as pd
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional

app = FastAPI(title="Cardiovascular Disease Risk Prediction API")

# Setup CORS to allow frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust this in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

MODEL_DIR = os.path.join(os.path.dirname(__file__), 'model')
BUNDLE_PATH = os.path.join(MODEL_DIR, 'cardio_models.pkl')
LEGACY_PATH = os.path.join(MODEL_DIR, 'cardio_model.pkl')

FALLBACK_FEATURES = [
    'age_years', 'gender', 'height', 'weight', 'ap_hi', 'ap_lo',
    'cholesterol', 'gluc', 'smoke', 'alco', 'active',
]

models = {}
expected_features = FALLBACK_FEATURES
scaler = None
default_model_key = 'decision_tree'


def _register_legacy_model(payload):
    global models, expected_features, default_model_key
    expected_features = payload.get('features', FALLBACK_FEATURES)
    models = {
        'decision_tree': {
            'estimator': payload['model'],
            'use_scaler': False,
            'label': 'Decision Tree',
        }
    }
    default_model_key = 'decision_tree'


try:
    if os.path.exists(BUNDLE_PATH):
        bundle = joblib.load(BUNDLE_PATH)
        expected_features = bundle.get('features', FALLBACK_FEATURES)
        scaler = bundle.get('scaler')
        default_model_key = bundle.get('default_model', 'decision_tree')
        models = bundle.get('models', {})
    else:
        model_data = joblib.load(LEGACY_PATH)
        _register_legacy_model(model_data)
except Exception as e:
    print(f"Warning: Could not load models. Error: {e}")
    models = {}
    expected_features = FALLBACK_FEATURES
    scaler = None
    default_model_key = 'decision_tree'


class PredictionRequest(BaseModel):
    age_years: float
    gender: int
    height: float
    weight: float
    ap_hi: float
    ap_lo: float
    cholesterol: int
    gluc: int
    smoke: int
    alco: int
    active: int
    model: Optional[str] = None


def _resolve_model(requested_key: Optional[str]):
    if not models:
        return None, None, None

    key = (requested_key or default_model_key or next(iter(models))).strip()
    if key not in models:
        raise HTTPException(
            status_code=400,
            detail=f"Unknown model '{key}'. Available: {', '.join(models.keys())}",
        )
    entry = models[key]
    return key, entry['estimator'], entry


@app.get("/api/models")
def list_models():
    catalog = []
    for key, entry in models.items():
        catalog.append({
            'key': key,
            'name': entry.get('label', key),
            'default': key == default_model_key,
        })
    return {
        'models': catalog,
        'default': default_model_key if default_model_key in models else (
            catalog[0]['key'] if catalog else None
        ),
    }


@app.post("/api/predict")
def predict(request: PredictionRequest):
    if not models:
        return {"error": "Model not loaded"}

    model_key, estimator, entry = _resolve_model(request.model)

    data = {
        'age_years': [request.age_years],
        'gender': [request.gender],
        'height': [request.height],
        'weight': [request.weight],
        'ap_hi': [request.ap_hi],
        'ap_lo': [request.ap_lo],
        'cholesterol': [request.cholesterol],
        'gluc': [request.gluc],
        'smoke': [request.smoke],
        'alco': [request.alco],
        'active': [request.active],
    }

    df = pd.DataFrame(data)
    df = df[expected_features]

    features = df
    if entry.get('use_scaler'):
        if scaler is None:
            raise HTTPException(
                status_code=500,
                detail=f"Model '{model_key}' requires a scaler that was not loaded.",
            )
        features = scaler.transform(df)

    prediction = int(estimator.predict(features)[0])
    probability = float(estimator.predict_proba(features)[0][1])
    model_used = entry.get('label', model_key)

    if prediction == 1:
        message = "High risk detected. The model predicts a potential cardiovascular issue based on the provided data."
    else:
        message = "Low risk detected. The model does not predict cardiovascular disease based on the provided data."

    return {
        "prediction": prediction,
        "probability": probability,
        "message": message,
        "model_used": model_used,
        "model_key": model_key,
    }
