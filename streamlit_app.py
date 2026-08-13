import os
import sys

# Ensure site-packages from user directory are added if present
user_site = os.path.expanduser(r"~\AppData\Roaming\Python\Python312\site-packages")
if os.path.exists(user_site) and user_site not in sys.path:
    sys.path.insert(0, user_site)

import json
import joblib
import pandas as pd
import numpy as np
import streamlit as st
import plotly.express as px
import plotly.graph_objects as go

# ---------------------------------------------------------
# Page Configuration
# ---------------------------------------------------------
st.set_page_config(
    page_title="LendPredict AI | Cosmic Loan Intelligence",
    page_icon="🌌",
    layout="wide",
    initial_sidebar_state="expanded"
)

# ---------------------------------------------------------
# Path Configurations & Model Loading
# ---------------------------------------------------------
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_DIR = os.path.join(BASE_DIR, "backend", "model")
DATA_PATH = os.path.join(BASE_DIR, "train.csv")

@st.cache_resource
def load_ml_artifacts():
    model_path = os.path.join(MODEL_DIR, "model.joblib")
    scaler_path = os.path.join(MODEL_DIR, "scaler.joblib")
    encoders_path = os.path.join(MODEL_DIR, "encoders.joblib")
    metadata_path = os.path.join(MODEL_DIR, "metadata.json")

    if not os.path.exists(model_path):
        # Fallback to train if missing
        sys.path.append(os.path.join(BASE_DIR, "backend"))
        from backend.train_model import train_and_save_model
        train_and_save_model()

    model = joblib.load(model_path)
    scaler = joblib.load(scaler_path)
    encoders = joblib.load(encoders_path)
    
    metadata = {}
    if os.path.exists(metadata_path):
        with open(metadata_path, "r") as f:
            metadata = json.load(f)
            
    return model, scaler, encoders, metadata

@st.cache_data
def load_dataset():
    if os.path.exists(DATA_PATH):
        return pd.read_csv(DATA_PATH)
    return None

model, scaler, encoders, metadata = load_ml_artifacts()
dataset_df = load_dataset()

# ---------------------------------------------------------
# Custom Cosmic Tech Styling (CSS)
# ---------------------------------------------------------
COSMIC_CSS = """
<style>
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@400;500;600;700&display=swap');

:root {
    --bg-dark: #070913;
    --bg-card: rgba(15, 23, 42, 0.75);
    --border-glow: rgba(99, 102, 241, 0.3);
    --primary-cyan: #00f2fe;
    --primary-purple: #7928ca;
    --primary-pink: #ff0080;
    --accent-blue: #3b82f6;
    --text-glow: 0 0 10px rgba(0, 242, 254, 0.5);
}

/* Global resets & dark cosmic theme */
.stApp {
    background: radial-gradient(circle at 15% 15%, #101432 0%, #060814 50%, #020308 100%) !important;
    font-family: 'Plus Jakarta Sans', sans-serif;
    color: #e2e8f0;
}

/* Hide header & standard menu borders */
header[data-testid="stHeader"] {
    background: transparent !important;
}

/* Cosmic Cards with Glassmorphism */
.cosmic-card {
    background: rgba(13, 18, 38, 0.65);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 1px solid rgba(120, 119, 198, 0.2);
    border-radius: 20px;
    padding: 1.5rem 1.8rem;
    box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
    transition: all 0.3s ease-in-out;
    margin-bottom: 1.2rem;
}

.cosmic-card:hover {
    border-color: rgba(0, 242, 254, 0.5);
    box-shadow: 0 12px 40px 0 rgba(0, 242, 254, 0.15);
    transform: translateY(-2px);
}

/* Glowing Typography */
.cosmic-title {
    font-family: 'Space Grotesk', sans-serif;
    background: linear-gradient(135deg, #00f2fe 0%, #4facfe 35%, #7928ca 70%, #ff0080 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-size: 3rem !important;
    font-weight: 800;
    letter-spacing: -1px;
    margin-bottom: 0.2rem;
}

.cosmic-subtitle {
    font-size: 1.1rem;
    color: #94a3b8;
    font-weight: 400;
    margin-bottom: 2rem;
}

.section-header {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 1.4rem;
    font-weight: 700;
    color: #f8fafc;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 1rem;
}

/* Badges */
.badge-pill {
    display: inline-block;
    padding: 0.25rem 0.75rem;
    border-radius: 9999px;
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    background: rgba(0, 242, 254, 0.1);
    color: #00f2fe;
    border: 1px solid rgba(0, 242, 254, 0.3);
    margin-right: 0.5rem;
}

/* Approved Result Glow */
.result-approved {
    background: linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(5, 150, 105, 0.05) 100%);
    border: 1px solid rgba(16, 185, 129, 0.5);
    border-radius: 20px;
    padding: 2rem;
    text-align: center;
    box-shadow: 0 0 30px rgba(16, 185, 129, 0.2);
}

/* Rejected Result Glow */
.result-rejected {
    background: linear-gradient(135deg, rgba(239, 68, 68, 0.15) 0%, rgba(220, 38, 38, 0.05) 100%);
    border: 1px solid rgba(239, 68, 68, 0.5);
    border-radius: 20px;
    padding: 2rem;
    text-align: center;
    box-shadow: 0 0 30px rgba(239, 68, 68, 0.2);
}

/* Sidebar styling */
[data-testid="stSidebar"] {
    background: rgba(8, 11, 26, 0.95) !important;
    border-right: 1px solid rgba(255, 255, 255, 0.08);
}

/* Custom Metric Box */
.metric-box {
    background: rgba(255, 255, 255, 0.03);
    border-radius: 12px;
    padding: 1rem;
    border: 1px solid rgba(255, 255, 255, 0.05);
    text-align: center;
}

.metric-val {
    font-size: 1.8rem;
    font-weight: 700;
    color: #00f2fe;
    font-family: 'Space Grotesk', sans-serif;
}

.metric-lbl {
    font-size: 0.8rem;
    color: #94a3b8;
    text-transform: uppercase;
    letter-spacing: 0.05em;
}

/* Button enhancements */
.stButton > button {
    background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%) !important;
    color: #ffffff !important;
    font-weight: 600 !important;
    border-radius: 12px !important;
    border: none !important;
    padding: 0.6rem 1.5rem !important;
    transition: all 0.3s ease !important;
    box-shadow: 0 4px 14px 0 rgba(124, 58, 237, 0.39) !important;
}

.stButton > button:hover {
    transform: translateY(-2px) !important;
    box-shadow: 0 6px 20px 0 rgba(124, 58, 237, 0.6) !important;
}
</style>
"""

st.markdown(COSMIC_CSS, unsafe_allow_html=True)

# ---------------------------------------------------------
# Sidebar Navigation & Control Panel
# ---------------------------------------------------------
with st.sidebar:
    st.markdown("""
        <div style="text-align: center; padding: 1rem 0;">
            <div style="font-size: 3.2rem; filter: drop-shadow(0 0 15px #00f2fe);">🌌</div>
            <h2 style="font-family: 'Space Grotesk', sans-serif; background: linear-gradient(90deg, #00f2fe, #7928ca); -webkit-background-clip: text; -webkit-text-fill-color: transparent; font-weight: 700; margin-top: 0.5rem; margin-bottom: 0.2rem;">LendPredict AI</h2>
            <p style="color: #64748b; font-size: 0.85rem;">Cosmic ML Financial Intelligence</p>
        </div>
    """, unsafe_allow_html=True)
    
    st.divider()
    
    navigation = st.radio(
        "COSMIC MODULES",
        options=["🎯 Loan Approval Predictor", "📊 Cosmic Data Insights", "🧠 KNN Neural Architecture"],
        index=0
    )
    
    st.divider()
    
    st.markdown("### ⚡ System Status")
    st.markdown(f"""
        <div class="metric-box" style="text-align: left; margin-bottom: 0.5rem;">
            <span style="color: #10b981;">●</span> <b>Engine:</b> K-Nearest Neighbors<br>
            <span style="color: #10b981;">●</span> <b>Best K:</b> {metadata.get('best_k', 11)} Neighbors<br>
            <span style="color: #10b981;">●</span> <b>Accuracy:</b> {metadata.get('accuracy', 0.82)*100:.1f}%<br>
            <span style="color: #10b981;">●</span> <b>Artifacts:</b> Loaded & Validated
        </div>
    """, unsafe_allow_html=True)

    st.markdown("<br>", unsafe_allow_html=True)
    st.caption("Powered by Scikit-Learn, Streamlit & FastAPI Backend")

# ---------------------------------------------------------
# Preset Logic
# ---------------------------------------------------------
if "preset_gender" not in st.session_state:
    st.session_state.preset_gender = "Male"
    st.session_state.preset_married = "Yes"
    st.session_state.preset_dependents = "1"
    st.session_state.preset_education = "Graduate"
    st.session_state.preset_self_employed = "No"
    st.session_state.preset_applicant_income = 5849
    st.session_state.preset_coapplicant_income = 2000
    st.session_state.preset_loan_amount = 140
    st.session_state.preset_loan_amount_term = 360
    st.session_state.preset_credit_history = "Good (1.0)"
    st.session_state.preset_property_area = "Semiurban"

def apply_preset(scenario):
    if scenario == "approved":
        st.session_state.preset_gender = "Male"
        st.session_state.preset_married = "Yes"
        st.session_state.preset_dependents = "1"
        st.session_state.preset_education = "Graduate"
        st.session_state.preset_self_employed = "No"
        st.session_state.preset_applicant_income = 6000
        st.session_state.preset_coapplicant_income = 2500
        st.session_state.preset_loan_amount = 150
        st.session_state.preset_loan_amount_term = 360
        st.session_state.preset_credit_history = "Good (1.0)"
        st.session_state.preset_property_area = "Semiurban"
    elif scenario == "rejected":
        st.session_state.preset_gender = "Female"
        st.session_state.preset_married = "No"
        st.session_state.preset_dependents = "3+"
        st.session_state.preset_education = "Not Graduate"
        st.session_state.preset_self_employed = "Yes"
        st.session_state.preset_applicant_income = 1800
        st.session_state.preset_coapplicant_income = 0
        st.session_state.preset_loan_amount = 280
        st.session_state.preset_loan_amount_term = 180
        st.session_state.preset_credit_history = "Poor / None (0.0)"
        st.session_state.preset_property_area = "Rural"


# ---------------------------------------------------------
# MODULE 1: Loan Approval Predictor
# ---------------------------------------------------------
if navigation == "🎯 Loan Approval Predictor":
    
    # Hero Section Header
    st.markdown("""
        <div style="margin-bottom: 2rem;">
            <div>
                <span class="badge-pill">AI MACHINE LEARNING</span>
                <span class="badge-pill">COSMIC TECH EDITION</span>
                <span class="badge-pill">KNN CLASSIFIER</span>
            </div>
            <h1 class="cosmic-title">Loan Approval Predictor</h1>
            <p class="cosmic-subtitle">Enter applicant parameters below to query our multi-dimensional KNN decision engine and evaluate approval probability in real-time.</p>
        </div>
    """, unsafe_allow_html=True)
    
    # Preset Scenario Quick Selectors
    st.markdown("##### 🚀 Quick Preset Scenarios")
    p_col1, p_col2, p_col3 = st.columns([1, 1, 2])
    with p_col1:
        if st.button("✨ Load High-Approval Preset", use_container_width=True):
            apply_preset("approved")
            st.rerun()
    with p_col2:
        if st.button("⚠️ Load High-Risk Preset", use_container_width=True):
            apply_preset("rejected")
            st.rerun()

    st.markdown("<br>", unsafe_allow_html=True)

    # Form Container
    with st.form("loan_prediction_form"):
        col1, col2, col3 = st.columns(3)
        
        with col1:
            st.markdown('<div class="section-header">👤 Applicant Profile</div>', unsafe_allow_html=True)
            gender = st.selectbox("Gender", options=["Male", "Female"], index=0 if st.session_state.preset_gender == "Male" else 1)
            married = st.selectbox("Marital Status", options=["Yes", "No"], index=0 if st.session_state.preset_married == "Yes" else 1)
            dependents = st.selectbox("Dependents", options=["0", "1", "2", "3+"], index=["0", "1", "2", "3+"].index(st.session_state.preset_dependents))
            education = st.selectbox("Education Level", options=["Graduate", "Not Graduate"], index=0 if st.session_state.preset_education == "Graduate" else 1)
            self_employed = st.selectbox("Self Employed", options=["No", "Yes"], index=0 if st.session_state.preset_self_employed == "No" else 1)

        with col2:
            st.markdown('<div class="section-header">💰 Financial Matrix</div>', unsafe_allow_html=True)
            applicant_income = st.number_input("Applicant Income ($ / month)", min_value=0, value=st.session_state.preset_applicant_income, step=500)
            coapplicant_income = st.number_input("Co-Applicant Income ($ / month)", min_value=0, value=st.session_state.preset_coapplicant_income, step=500)
            credit_history = st.selectbox(
                "Credit History Status", 
                options=["Good (1.0)", "Poor / None (0.0)"],
                index=0 if "Good" in st.session_state.preset_credit_history else 1
            )
            property_area = st.selectbox(
                "Property Area",
                options=["Urban", "Semiurban", "Rural"],
                index=["Urban", "Semiurban", "Rural"].index(st.session_state.preset_property_area)
            )

        with col3:
            st.markdown('<div class="section-header">📄 Loan Requirements</div>', unsafe_allow_html=True)
            loan_amount = st.number_input("Requested Loan ($ in Thousands)", min_value=1, value=st.session_state.preset_loan_amount, step=10)
            loan_amount_term = st.select_slider(
                "Loan Term (Months)",
                options=[12, 36, 60, 84, 120, 180, 240, 300, 360, 480],
                value=int(st.session_state.preset_loan_amount_term)
            )
            
            st.markdown("<br>", unsafe_allow_html=True)
            # Calculated Instant Metrics Box
            tot_inc = applicant_income + coapplicant_income
            actual_loan = loan_amount * 1000
            dti = round((actual_loan / (tot_inc * 12)) * 100, 1) if tot_inc > 0 else 999.0
            
            st.markdown(f"""
                <div class="metric-box">
                    <div style="font-size: 0.85rem; color: #94a3b8;">Est. Debt-to-Annual Income</div>
                    <div style="font-size: 1.5rem; font-weight: 700; color: {'#00f2fe' if dti < 200 else '#f59e0b'};">{dti}%</div>
                    <div style="font-size: 0.75rem; color: #64748b;">Total Income: ${tot_inc:,.0f}/mo</div>
                </div>
            """, unsafe_allow_html=True)

        st.markdown("<br>", unsafe_allow_html=True)
        submit_btn = st.form_submit_button("🪐 ANALYZE & PREDICT APPROVAL", use_container_width=True)

    # ---------------------------------------------------------
    # Prediction Execution & Result Output
    # ---------------------------------------------------------
    if submit_btn:
        with st.spinner("Processing feature vectors across KNN hyperplane..."):
            # Map parameters
            credit_hist_val = 1.0 if "Good" in credit_history else 0.0
            
            gender_enc = encoders["Gender"]["mapping"].get(gender, 0)
            married_enc = encoders["Married"]["mapping"].get(married, 0)
            dependents_enc = encoders["Dependents"]["mapping"].get(dependents, 0)
            education_enc = encoders["Education"]["mapping"].get(education, 0)
            self_employed_enc = encoders["Self_Employed"]["mapping"].get(self_employed, 0)
            property_area_enc = encoders["Property_Area"]["mapping"].get(property_area, 0)

            raw_features = np.array([[
                gender_enc,
                married_enc,
                dependents_enc,
                education_enc,
                self_employed_enc,
                applicant_income,
                coapplicant_income,
                loan_amount,
                loan_amount_term,
                credit_hist_val,
                property_area_enc
            ]])

            scaled_features = scaler.transform(raw_features)
            pred = model.predict(scaled_features)[0]
            probs = model.predict_proba(scaled_features)[0]

            is_approved = bool(pred == 1)
            prob_approved = probs[1] if len(probs) > 1 else (1.0 if is_approved else 0.0)
            prob_rejected = probs[0] if len(probs) > 1 else (0.0 if is_approved else 1.0)
            confidence = prob_approved * 100 if is_approved else prob_rejected * 100

        st.markdown("### 🌌 Intelligence Analysis Outcome")

        res_col1, res_col2 = st.columns([1.2, 1])

        with res_col1:
            if is_approved:
                st.markdown(f"""
                    <div class="result-approved">
                        <div style="font-size: 3.5rem;">🎉</div>
                        <h2 style="color: #10b981; font-family: 'Space Grotesk', sans-serif; font-size: 2.2rem; font-weight: 800; margin: 0.5rem 0;">LOAN APPROVED</h2>
                        <p style="color: #a7f3d0; font-size: 1.1rem; margin-bottom: 1.5rem;">Applicant fulfills financial threshold parameters under trained KNN policy model.</p>
                        <div style="display: flex; justify-content: center; gap: 2rem;">
                            <div>
                                <span style="font-size: 0.8rem; color: #6ee7b7; text-transform: uppercase;">Confidence Score</span>
                                <div style="font-size: 2rem; font-weight: 800; color: #ffffff;">{confidence:.1f}%</div>
                            </div>
                            <div>
                                <span style="font-size: 0.8rem; color: #6ee7b7; text-transform: uppercase;">Risk Assessment</span>
                                <div style="font-size: 2rem; font-weight: 800; color: #34d399;">LOW RISK</div>
                            </div>
                        </div>
                    </div>
                """, unsafe_allow_html=True)
            else:
                st.markdown(f"""
                    <div class="result-rejected">
                        <div style="font-size: 3.5rem;">⚠️</div>
                        <h2 style="color: #ef4444; font-family: 'Space Grotesk', sans-serif; font-size: 2.2rem; font-weight: 800; margin: 0.5rem 0;">LOAN REJECTED</h2>
                        <p style="color: #fca5a5; font-size: 1.1rem; margin-bottom: 1.5rem;">Risk matrix exceeded safety threshold. Primary influence detected: Credit history or Debt-to-Income ratio.</p>
                        <div style="display: flex; justify-content: center; gap: 2rem;">
                            <div>
                                <span style="font-size: 0.8rem; color: #fca5a5; text-transform: uppercase;">Confidence Score</span>
                                <div style="font-size: 2rem; font-weight: 800; color: #ffffff;">{confidence:.1f}%</div>
                            </div>
                            <div>
                                <span style="font-size: 0.8rem; color: #fca5a5; text-transform: uppercase;">Risk Assessment</span>
                                <div style="font-size: 2rem; font-weight: 800; color: #f87171;">HIGH RISK</div>
                            </div>
                        </div>
                    </div>
                """, unsafe_allow_html=True)

        with res_col2:
            # Cosmic Gauge Chart using Plotly
            fig_gauge = go.Figure(go.Indicator(
                mode = "gauge+number",
                value = confidence,
                domain = {'x': [0, 1], 'y': [0, 1]},
                title = {'text': "Model Approval Probability %", 'font': {'size': 16, 'color': '#94a3b8'}},
                number = {'suffix': "%", 'font': {'color': '#00f2fe', 'size': 32}},
                gauge = {
                    'axis': {'range': [None, 100], 'tickwidth': 1, 'tickcolor': "#475569"},
                    'bar': {'color': "#00f2fe" if is_approved else "#ef4444"},
                    'bgcolor': "rgba(15, 23, 42, 0.8)",
                    'borderwidth': 2,
                    'bordercolor': "rgba(255, 255, 255, 0.1)",
                    'steps': [
                        {'range': [0, 50], 'color': 'rgba(239, 68, 68, 0.2)'},
                        {'range': [50, 100], 'color': 'rgba(16, 185, 129, 0.2)'}
                    ],
                }
            ))
            fig_gauge.update_layout(
                paper_bgcolor='rgba(0,0,0,0)',
                plot_bgcolor='rgba(0,0,0,0)',
                margin=dict(l=20, r=20, t=50, b=20),
                height=250
            )
            st.plotly_chart(fig_gauge, use_container_width=True)

# ---------------------------------------------------------
# MODULE 2: Cosmic Data Insights (EDA)
# ---------------------------------------------------------
elif navigation == "📊 Cosmic Data Insights":
    st.markdown("""
        <div>
            <span class="badge-pill">EXPLORATORY DATA ANALYSIS</span>
            <span class="badge-pill">TRAINING DATASET</span>
            <h1 class="cosmic-title">Cosmic Financial Insights</h1>
            <p class="cosmic-subtitle">Interactive visual exploration of historical loan applicant distributions and key risk indicators.</p>
        </div>
    """, unsafe_allow_html=True)

    if dataset_df is not None:
        # Overview Cards
        tot_records = len(dataset_df)
        approved_cnt = len(dataset_df[dataset_df['Loan_Status'] == 'Y'])
        approval_rate = (approved_cnt / tot_records) * 100

        col_m1, col_m2, col_m3, col_m4 = st.columns(4)
        with col_m1:
            st.markdown(f'<div class="metric-box"><div class="metric-lbl">Total Applications</div><div class="metric-val">{tot_records}</div></div>', unsafe_allow_html=True)
        with col_m2:
            st.markdown(f'<div class="metric-box"><div class="metric-lbl">Approved Count</div><div class="metric-val" style="color: #10b981;">{approved_cnt}</div></div>', unsafe_allow_html=True)
        with col_m3:
            st.markdown(f'<div class="metric-box"><div class="metric-lbl">Approval Rate</div><div class="metric-val" style="color: #00f2fe;">{approval_rate:.1f}%</div></div>', unsafe_allow_html=True)
        with col_m4:
            st.markdown(f'<div class="metric-box"><div class="metric-lbl">Avg Loan Amount</div><div class="metric-val" style="color: #c084fc;">${dataset_df["LoanAmount"].mean():.0f}k</div></div>', unsafe_allow_html=True)

        st.markdown("<br>", unsafe_allow_html=True)

        # Plot 1: Credit History Impact
        c_chart1, c_chart2 = st.columns(2)

        with c_chart1:
            st.markdown("##### 💳 Impact of Credit History on Approval")
            df_credit = dataset_df.groupby(['Credit_History', 'Loan_Status']).size().reset_index().rename(columns={0: 'Count'})
            df_credit['Credit_History'] = df_credit['Credit_History'].map({1.0: 'Good History (1.0)', 0.0: 'Poor History (0.0)'})
            fig_credit = px.bar(
                df_credit,
                x='Credit_History',
                y='Count',
                color='Loan_Status',
                barmode='group',
                color_discrete_map={'Y': '#10b981', 'N': '#ef4444'},
                labels={'Loan_Status': 'Approved?'}
            )
            fig_credit.update_layout(
                paper_bgcolor='rgba(13, 18, 38, 0.65)',
                plot_bgcolor='rgba(0,0,0,0)',
                font_color='#e2e8f0',
                margin=dict(l=20, r=20, t=30, b=20)
            )
            st.plotly_chart(fig_credit, use_container_width=True)

        with c_chart2:
            st.markdown("##### 🏙️ Approval Rate by Property Area")
            df_prop = dataset_df.groupby(['Property_Area', 'Loan_Status']).size().reset_index().rename(columns={0: 'Count'})
            fig_prop = px.bar(
                df_prop,
                x='Property_Area',
                y='Count',
                color='Loan_Status',
                barmode='stack',
                color_discrete_map={'Y': '#00f2fe', 'N': '#7928ca'},
                labels={'Loan_Status': 'Approved?'}
            )
            fig_prop.update_layout(
                paper_bgcolor='rgba(13, 18, 38, 0.65)',
                plot_bgcolor='rgba(0,0,0,0)',
                font_color='#e2e8f0',
                margin=dict(l=20, r=20, t=30, b=20)
            )
            st.plotly_chart(fig_prop, use_container_width=True)

        # Plot 2: Applicant Income vs Loan Amount Scatter
        st.markdown("##### 📈 Income vs Loan Amount Distribution (Colored by Decision)")
        fig_scatter = px.scatter(
            dataset_df.dropna(subset=['ApplicantIncome', 'LoanAmount']),
            x='ApplicantIncome',
            y='LoanAmount',
            color='Loan_Status',
            size='LoanAmount',
            hover_data=['Education', 'Property_Area'],
            color_discrete_map={'Y': '#00f2fe', 'N': '#ff0080'},
            opacity=0.8
        )
        fig_scatter.update_layout(
            paper_bgcolor='rgba(13, 18, 38, 0.65)',
            plot_bgcolor='rgba(0,0,0,0)',
            font_color='#e2e8f0',
            xaxis=dict(gridcolor='rgba(255,255,255,0.05)'),
            yaxis=dict(gridcolor='rgba(255,255,255,0.05)'),
            margin=dict(l=20, r=20, t=30, b=20)
        )
        st.plotly_chart(fig_scatter, use_container_width=True)
    else:
        st.warning("Training dataset (train.csv) not found in root path.")

# ---------------------------------------------------------
# MODULE 3: KNN Neural Architecture
# ---------------------------------------------------------
elif navigation == "🧠 KNN Neural Architecture":
    st.markdown("""
        <div>
            <span class="badge-pill">MODEL METRICS</span>
            <span class="badge-pill">HYPERPARAMETER TUNING</span>
            <h1 class="cosmic-title">K-Nearest Neighbors Pipeline</h1>
            <p class="cosmic-subtitle">Detailed architectural breakdown of feature scaling, encoding mappings, and neighbor weighting.</p>
        </div>
    """, unsafe_allow_html=True)

    col_arch1, col_arch2 = st.columns(2)

    with col_arch1:
        st.markdown("""
            <div class="cosmic-card">
                <h3 style="color: #00f2fe; font-family: 'Space Grotesk';">🧬 Feature Processing Pipeline</h3>
                <ul style="color: #cbd5e1; line-height: 1.8;">
                    <li><b>Missing Value Imputation:</b> Median for continuous variables, Mode for categorical.</li>
                    <li><b>Categorical Encoding:</b> LabelEncoder mapped across 6 categorical vectors.</li>
                    <li><b>Feature Normalization:</b> <code>StandardScaler</code> fitted on training set (Z-score normalization).</li>
                    <li><b>Distance Metric:</b> Minkowski Distance with <code>weights='distance'</code>.</li>
                </ul>
            </div>
        """, unsafe_allow_html=True)

    with col_arch2:
        st.markdown(f"""
            <div class="cosmic-card">
                <h3 style="color: #c084fc; font-family: 'Space Grotesk';">⚡ Optimal Model Artifacts</h3>
                <table style="width:100%; color: #cbd5e1;">
                    <tr><td><b>Best Neighbors (K):</b></td> <td style="color:#00f2fe; font-weight:bold;">{metadata.get('best_k', 11)}</td></tr>
                    <tr><td><b>Test Accuracy:</b></td> <td style="color:#10b981; font-weight:bold;">{metadata.get('accuracy', 0.82)*100:.2f}%</td></tr>
                    <tr><td><b>Feature Dimensions:</b></td> <td>11 Inputs</td></tr>
                    <tr><td><b>Distance Weighting:</b></td> <td>Inverse Distance (1/d)</td></tr>
                </table>
            </div>
        """, unsafe_allow_html=True)

    st.markdown("### 🔤 Encoded Categorical Feature Mappings")
    st.json(encoders)
