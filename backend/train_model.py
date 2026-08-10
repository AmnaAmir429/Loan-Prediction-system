import os
import sys
user_site = os.path.expanduser(r"~\AppData\Roaming\Python\Python312\site-packages")
if os.path.exists(user_site) and user_site not in sys.path:
    sys.path.insert(0, user_site)

import json
import pandas as pd

import numpy as np
import joblib
from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.neighbors import KNeighborsClassifier
from sklearn.metrics import accuracy_score, confusion_matrix

def train_and_save_model():
    print("Starting Model Training Pipeline...")
    
    # Paths
    base_dir = os.path.dirname(os.path.abspath(__file__))
    data_path = os.path.abspath(os.path.join(base_dir, "..", "train.csv"))
    model_dir = os.path.join(base_dir, "model")
    os.makedirs(model_dir, exist_ok=True)
    
    if not os.path.exists(data_path):
        raise FileNotFoundError(f"Training dataset not found at {data_path}")
        
    df = pd.read_csv(data_path)
    print(f"Loaded dataset with {len(df)} rows.")

    # Drop Loan_ID as it's an arbitrary identifier
    if "Loan_ID" in df.columns:
        df = df.drop("Loan_ID", axis=1)

    # Separate target
    target_col = "Loan_Status"
    
    # Feature columns (11 required features)
    feature_cols = [
        "Gender", "Married", "Dependents", "Education", "Self_Employed",
        "ApplicantIncome", "CoapplicantIncome", "LoanAmount",
        "Loan_Amount_Term", "Credit_History", "Property_Area"
    ]
    
    cat_cols = ["Gender", "Married", "Dependents", "Education", "Self_Employed", "Property_Area"]
    num_cols = ["ApplicantIncome", "CoapplicantIncome", "LoanAmount", "Loan_Amount_Term", "Credit_History"]

    # Impute missing values
    for col in num_cols:
        median_val = df[col].median()
        df[col] = df[col].fillna(median_val)

    for col in cat_cols:
        mode_val = df[col].mode()[0]
        df[col] = df[col].fillna(mode_val)

    # Encode categorical features
    encoders = {}
    encoded_df = df.copy()

    for col in cat_cols:
        le = LabelEncoder()
        encoded_df[col] = le.fit_transform(df[col].astype(str))
        encoders[col] = {
            "classes": le.classes_.tolist(),
            "mapping": {str(cls): int(idx) for idx, cls in enumerate(le.classes_)}
        }
        
    # Encode target: 'Y' -> 1 (Approved), 'N' -> 0 (Rejected)
    target_le = LabelEncoder()
    encoded_df[target_col] = target_le.fit_transform(df[target_col].astype(str))
    encoders["target"] = {
        "classes": target_le.classes_.tolist(),
        "mapping": {str(cls): int(idx) for idx, cls in enumerate(target_le.classes_)}
    }

    X = encoded_df[feature_cols]
    y = encoded_df[target_col]

    # Train-Test Split
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.20, random_state=42, stratify=y
    )

    # Scale Features
    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)

    # Grid Search for best KNN model
    param_grid = {"n_neighbors": [3, 5, 7, 9, 11, 13, 15]}
    grid = GridSearchCV(
        KNeighborsClassifier(weights="distance"),
        param_grid,
        cv=5,
        scoring="accuracy"
    )
    grid.fit(X_train_scaled, y_train)

    best_knn = grid.best_estimator_
    y_pred = best_knn.predict(X_test_scaled)
    acc = accuracy_score(y_test, y_pred)
    cm = confusion_matrix(y_test, y_pred)

    print(f"Best Parameters: {grid.best_params_}")
    print(f"Test Accuracy: {acc:.4f}")
    print(f"Confusion Matrix:\n{cm}")

    # Save artifacts
    joblib.dump(best_knn, os.path.join(model_dir, "model.joblib"))
    joblib.dump(scaler, os.path.join(model_dir, "scaler.joblib"))
    joblib.dump(encoders, os.path.join(model_dir, "encoders.joblib"))
    
    metadata = {
        "feature_cols": feature_cols,
        "cat_cols": cat_cols,
        "num_cols": num_cols,
        "best_k": grid.best_params_["n_neighbors"],
        "accuracy": float(acc),
        "target_mapping": encoders["target"]["mapping"]
    }
    
    with open(os.path.join(model_dir, "metadata.json"), "w") as f:
        json.dump(metadata, f, indent=2)

    print(f"Model artifacts successfully saved to {model_dir}")

if __name__ == "__main__":
    train_and_save_model()
