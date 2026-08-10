# 🏦 LendPredict AI - Loan Approval Prediction Application

A full-stack, production-ready machine learning web application that predicts loan approval outcomes based on applicant financial data. Built with **Next.js 15 (App Router)**, **TypeScript**, **Tailwind CSS**, and a **Python FastAPI** backend serving a trained **K-Nearest Neighbors (KNN)** model.

---

## 🌟 Key Features

- **Google Stitch Next.js UI**: Faithfully preserves layout, colors (`#004ac6`), glassmorphism cards (`glass-card`), typography (`Inter`), animations, and responsive design.
- **Light & Dark Theme Switcher**: Instant theme toggle supporting `next-themes` and CSS design tokens.
- **11-Feature Validated Form**:
  - `Gender` (Male / Female)
  - `Married` (Yes / No)
  - `Dependents` (0, 1, 2, 3+)
  - `Education` (Graduate / Not Graduate)
  - `Self_Employed` (Yes / No)
  - `ApplicantIncome` ($ / month)
  - `CoapplicantIncome` ($ / month)
  - `LoanAmount` ($ in thousands)
  - `Loan_Amount_Term` (Term in months)
  - `Credit_History` (1.0 Good / 0.0 Bad)
  - `Property_Area` (Urban / Semiurban / Rural)
- **Interactive Preset Scenarios**: 1-click test buttons for quick demo of Approved and Rejected outcomes.
- **Dynamic Animated Result Card**:
  - Green Success card with checkmark icon for **Approved**.
  - Red Warning card with cross icon for **Rejected**.
  - SVG Circular Gauge showing **Confidence Score %**.
  - Detailed financial metrics breakdown (Debt-to-Income, Total Income, Loan Terms).
- **Python FastAPI REST API**:
  - Preprocesses inputs matching `StandardScaler` and `LabelEncoder` parameters.
  - Returns prediction (`Approved` / `Rejected`), probabilities, confidence score, and input summary.
  - Enabled CORS for frontend connection.

---

## 📁 Project Structure

```
Loan Prediction/
├── backend/
│   ├── app.py              # FastAPI server (POST /predict, GET /health)
│   ├── train_model.py      # ML training pipeline script
│   ├── requirements.txt    # Python dependencies
│   └── model/              # Saved model joblib artifacts & scaler
│       ├── model.joblib
│       ├── scaler.joblib
│       ├── encoders.joblib
│       └── metadata.json
├── frontend/
│   ├── app/
│   │   ├── globals.css     # Stitch color tokens & dark mode rules
│   │   ├── layout.tsx      # Next.js 15 Root Layout & Theme Provider
│   │   ├── page.tsx        # Main application page
│   │   └── providers.tsx   # next-themes Provider
│   ├── components/
│   │   ├── navbar.tsx      # Header & Theme Toggle
│   │   ├── hero.tsx        # Hero banner with AI metrics
│   │   ├── prediction-form.tsx # Form with validation & API submit
│   │   ├── preset-buttons.tsx  # 1-Click test scenarios
│   │   ├── result-card.tsx # Animated decision & confidence gauge
│   │   ├── features.tsx    # Bento grid capabilities section
│   │   └── theme-toggle.tsx# Sun/Moon mode switcher
│   ├── tailwind.config.ts  # Theme configuration
│   ├── package.json        # Frontend dependencies
│   └── tsconfig.json       # TypeScript configuration
├── train.csv               # Dataset used for training
├── KNN.ipynb               # Original exploratory notebook
└── README.md               # Documentation & Guide
```

---

## ⚙️ Installation & Running Guide

### 1. Prerequisites
- **Python** (v3.9 or higher)
- **Node.js** (v18.0 or higher) & **npm**

---

### 2. Backend Setup (FastAPI & ML Model)

Navigate to the `backend/` directory and install Python dependencies:

```bash
cd backend
pip install -r requirements.txt
```

#### Train the Model
Run the training script to process `train.csv` and output trained artifacts (`model.joblib`, `scaler.joblib`, `encoders.joblib`):

```bash
python train_model.py
```

#### Start the Backend API Server
Launch the FastAPI uvicorn server on `http://127.0.0.1:8000`:

```bash
python app.py
```
*API documentation will be available interactively at [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs).*

---

### 3. Frontend Setup (Next.js 15)

Open a new terminal window, navigate to the `frontend/` directory and install Node packages:

```bash
cd frontend
npm install
```

#### Start the Next.js Development Server

```bash
npm run dev
```

Open your browser and visit [http://localhost:3000](http://localhost:3000).

---

## 📡 API Endpoint Reference

### `POST /predict`

**Request Body Example:**
```json
{
  "gender": "Male",
  "married": "Yes",
  "dependents": "1",
  "education": "Graduate",
  "self_employed": "No",
  "applicant_income": 5849,
  "coapplicant_income": 2000,
  "loan_amount": 140,
  "loan_amount_term": 360,
  "credit_history": 1.0,
  "property_area": "Semiurban"
}
```

**Response Example (Approved):**
```json
{
  "status": "success",
  "prediction": "Approved",
  "is_approved": true,
  "confidence": 92.4,
  "probability_approved": 0.924,
  "probability_rejected": 0.076,
  "summary": {
    "total_income": 7849.0,
    "loan_amount_usd": 140000.0,
    "term_months": 360,
    "credit_status": "Good (1.0)",
    "debt_to_annual_income_ratio_pct": 148.6,
    "property_area": "Semiurban"
  }
}
```

---

## 🎨 Theme Support

The application features full Light and Dark mode switching powered by `next-themes` and CSS variables configured in `tailwind.config.ts`. Click the Sun/Moon icon in the navigation bar to toggle themes seamlessly.
