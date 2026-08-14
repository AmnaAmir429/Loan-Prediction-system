import os
import json
import joblib
from contextlib import asynccontextmanager

import pandas as pd
import numpy as np
from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import Dict, Any

# Global variables for model artifacts
MODEL = None
SCALER = None
ENCODERS = None
METADATA = None

# Model directory path
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_DIR = os.path.join(BASE_DIR, "model")

def load_artifacts():
    global MODEL, SCALER, ENCODERS, METADATA
    model_path = os.path.join(MODEL_DIR, "model.joblib")
    scaler_path = os.path.join(MODEL_DIR, "scaler.joblib")
    encoders_path = os.path.join(MODEL_DIR, "encoders.joblib")
    metadata_path = os.path.join(MODEL_DIR, "metadata.json")

    if not os.path.exists(model_path):
        # Auto-train if artifacts are missing
        print("Model artifacts not found. Training model now...")
        from train_model import train_and_save_model
        train_and_save_model()

    MODEL = joblib.load(model_path)
    SCALER = joblib.load(scaler_path)
    ENCODERS = joblib.load(encoders_path)
    with open(metadata_path, "r") as f:
        METADATA = json.load(f)
    print("Loaded model artifacts successfully.")

@asynccontextmanager
async def lifespan(app: FastAPI):
    load_artifacts()
    yield

# FastAPI App Instance
app = FastAPI(
    title="Loan Approval Prediction API",
    description="Production-ready REST API for ML KNN Loan Approval Prediction",
    version="1.0.0",
    lifespan=lifespan
)

# Enable CORS — allow_credentials must be False when allow_origins=["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)



# Input Pydantic Schema matching the 11 required form fields
class LoanRequest(BaseModel):
    gender: str = Field(..., description="Gender: Male or Female", example="Male")
    married: str = Field(..., description="Married: Yes or No", example="Yes")
    dependents: str = Field(..., description="Dependents: 0, 1, 2, 3+", example="1")
    education: str = Field(..., description="Education: Graduate or Not Graduate", example="Graduate")
    self_employed: str = Field(..., description="Self Employed: Yes or No", example="No")
    applicant_income: float = Field(..., description="Applicant Income ($)", example=5417.0, ge=0)
    coapplicant_income: float = Field(..., description="Coapplicant Income ($)", example=4196.0, ge=0)
    loan_amount: float = Field(..., description="Loan Amount ($ in thousands)", example=267.0, gt=0)
    loan_amount_term: float = Field(..., description="Loan Amount Term in days/months", example=360.0, gt=0)
    credit_history: float = Field(..., description="Credit History: 1.0 (Good) or 0.0 (Bad)", example=1.0)
    property_area: str = Field(..., description="Property Area: Urban, Semiurban, or Rural", example="Urban")

@app.get("/")
def read_root():
    return {
        "message": "Loan Approval Prediction API is online",
        "docs": "/docs",
        "health": "/health"
    }

@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "model_loaded": MODEL is not None,
        "best_k": METADATA.get("best_k") if METADATA else None,
        "test_accuracy": METADATA.get("accuracy") if METADATA else None
    }

@app.post("/predict")
def predict_loan(req: LoanRequest) -> Dict[str, Any]:
    if MODEL is None or SCALER is None or ENCODERS is None:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Machine learning model is not loaded"
        )
    
    try:
        # Normalize and validate categorical inputs
        gender = req.gender.strip().capitalize()
        married = req.married.strip().capitalize()
        dependents = req.dependents.strip()
        education = "Graduate" if "grad" in req.education.lower() and "not" not in req.education.lower() else "Not Graduate"
        self_employed = req.self_employed.strip().capitalize()
        property_area = req.property_area.strip().capitalize()

        # Map to dataset exact values
        if gender not in ["Male", "Female"]:
            gender = "Male"
        if married not in ["Yes", "No"]:
            married = "Yes" if married.startswith("Y") else "No"
        if dependents not in ["0", "1", "2", "3+"]:
            dependents = "0"
        if self_employed not in ["Yes", "No"]:
            self_employed = "No"
        if property_area not in ["Urban", "Semiurban", "Rural"]:
            property_area = "Urban"

        # Encode categorical variables using loaded encoders
        try:
            gender_enc = ENCODERS["Gender"]["mapping"][gender]
            married_enc = ENCODERS["Married"]["mapping"][married]
            dependents_enc = ENCODERS["Dependents"]["mapping"][dependents]
            education_enc = ENCODERS["Education"]["mapping"][education]
            self_employed_enc = ENCODERS["Self_Employed"]["mapping"][self_employed]
            property_area_enc = ENCODERS["Property_Area"]["mapping"][property_area]
        except KeyError as ke:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Invalid categorical value provided: {ke}"
            )

        # Build feature vector in exact order:
        # ["Gender", "Married", "Dependents", "Education", "Self_Employed",
        #  "ApplicantIncome", "CoapplicantIncome", "LoanAmount",
        #  "Loan_Amount_Term", "Credit_History", "Property_Area"]
        features = np.array([[
            gender_enc,
            married_enc,
            dependents_enc,
            education_enc,
            self_employed_enc,
            req.applicant_income,
            req.coapplicant_income,
            req.loan_amount,
            req.loan_amount_term,
            1.0 if req.credit_history >= 0.5 else 0.0,
            property_area_enc
        ]])

        # Scale features
        features_scaled = SCALER.transform(features)

        # Predict
        prediction_val = MODEL.predict(features_scaled)[0]
        
        # Calculate probabilities
        probabilities = MODEL.predict_proba(features_scaled)[0]
        
        # Target mapping: 1 -> Approved ('Y'), 0 -> Rejected ('N')
        is_approved = bool(prediction_val == 1)
        prob_approved = float(probabilities[1]) if len(probabilities) > 1 else (1.0 if is_approved else 0.0)
        prob_rejected = float(probabilities[0]) if len(probabilities) > 1 else (0.0 if is_approved else 1.0)
        
        confidence_pct = round(prob_approved * 100, 1) if is_approved else round(prob_rejected * 100, 1)

        # Calculate financial ratios for feedback
        total_income = req.applicant_income + req.coapplicant_income
        loan_amount_actual = req.loan_amount * 1000  # since loan_amount is in thousands
        debt_to_income_ratio = round((loan_amount_actual / (total_income * 12)) * 100, 1) if total_income > 0 else 999.0

        return {
            "status": "success",
            "prediction": "Approved" if is_approved else "Rejected",
            "is_approved": is_approved,
            "confidence": confidence_pct,
            "probability_approved": round(prob_approved, 4),
            "probability_rejected": round(prob_rejected, 4),
            "summary": {
                "total_income": total_income,
                "loan_amount_usd": loan_amount_actual,
                "term_months": int(req.loan_amount_term),
                "credit_status": "Good (1.0)" if req.credit_history >= 0.5 else "Poor / No History (0.0)",
                "debt_to_annual_income_ratio_pct": debt_to_income_ratio,
                "property_area": property_area
            }
        }

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"An error occurred during prediction: {str(e)}"
        )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app:app", host="0.0.0.0", port=8000, reload=True)
