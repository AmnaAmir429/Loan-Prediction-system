"use client";

import React, { useState } from "react";
import { PresetButtons, LoanFormData } from "./preset-buttons";
import { PredictionResult, ResultCard } from "./result-card";
import {
  User,
  Users,
  Briefcase,
  GraduationCap,
  Building,
  DollarSign,
  Wallet,
  Calendar,
  ShieldCheck,
  MapPin,
  ArrowRight,
  Loader2,
  AlertCircle,
  Sparkles,
} from "lucide-react";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://127.0.0.1:8000";

const INITIAL_FORM_DATA: LoanFormData = {
  gender: "Male",
  married: "Yes",
  dependents: "0",
  education: "Graduate",
  self_employed: "No",
  applicant_income: "",
  coapplicant_income: "0",
  loan_amount: "",
  loan_amount_term: "360",
  credit_history: "1",
  property_area: "Urban",
};

interface FormErrors {
  [key: string]: string;
}

export function PredictionForm() {
  const [formData, setFormData] = useState<LoanFormData>(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [result, setResult] = useState<PredictionResult | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    if (errors[id]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[id];
        return updated;
      });
    }
  };

  const handleSelectPreset = (preset: LoanFormData) => {
    setFormData(preset);
    setErrors({});
    setApiError(null);
    setResult(null);
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.applicant_income || parseFloat(formData.applicant_income) < 0) {
      newErrors.applicant_income = "Valid Applicant Income is required ($0 or higher)";
    }
    if (formData.coapplicant_income === "" || parseFloat(formData.coapplicant_income) < 0) {
      newErrors.coapplicant_income = "Valid Coapplicant Income is required ($0 or higher)";
    }
    if (!formData.loan_amount || parseFloat(formData.loan_amount) <= 0) {
      newErrors.loan_amount = "Valid Loan Amount is required (greater than $0)";
    }
    if (!formData.loan_amount_term || parseFloat(formData.loan_amount_term) <= 0) {
      newErrors.loan_amount_term = "Loan Amount Term is required";
    }
    if (formData.credit_history === "") {
      newErrors.credit_history = "Please select Credit History status";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError(null);
    setResult(null);

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    const payload = {
      gender: formData.gender,
      married: formData.married,
      dependents: formData.dependents,
      education: formData.education,
      self_employed: formData.self_employed,
      applicant_income: parseFloat(formData.applicant_income),
      coapplicant_income: parseFloat(formData.coapplicant_income || "0"),
      loan_amount: parseFloat(formData.loan_amount),
      loan_amount_term: parseFloat(formData.loan_amount_term),
      credit_history: parseFloat(formData.credit_history),
      property_area: formData.property_area,
    };

    try {
      const response = await fetch(`${BACKEND_URL}/predict`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.detail || `Server error (HTTP ${response.status})`
        );
      }

      const data: PredictionResult = await response.json();
      setResult(data);

      // Scroll smoothly to result card
      setTimeout(() => {
        const resultElement = document.getElementById("prediction-result-section");
        if (resultElement) {
          resultElement.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } catch (err: any) {
      console.error("Prediction Error:", err);
      setApiError(
        err.message ||
          "Could not connect to the backend server. Please ensure the Python FastAPI backend is running on http://127.0.0.1:8000."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-16 relative" id="prediction-form">
      <div className="absolute inset-0 bg-gradient-to-br from-surface-container-low to-surface opacity-50 rounded-3xl -z-10" />

      <div className="text-center mb-10">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          Interactive AI Predictor
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-on-surface tracking-tight">
          Try the Loan Approval Predictor
        </h2>
        <p className="text-base text-on-surface-variant mt-2 max-w-xl mx-auto">
          Enter applicant financial details for an instant, machine-learning powered confidence evaluation.
        </p>
      </div>

      <div className="glass-card rounded-3xl shadow-2xl p-6 sm:p-10 max-w-4xl mx-auto border-t-[4px] border-t-primary relative">
        {/* Preset quick test buttons */}
        <PresetButtons onSelectPreset={handleSelectPreset} />

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 1. Applicant Income */}
          <div className="flex flex-col gap-1.5 group relative">
            <label className="text-xs font-semibold text-on-surface-variant transition-colors group-focus-within:text-primary flex items-center justify-between" htmlFor="applicant_income">
              <span>Applicant Income ($ / month) *</span>
              <span className="text-[11px] opacity-70">e.g. 5849</span>
            </label>
            <div className="relative">
              <DollarSign className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors" />
              <input
                id="applicant_income"
                type="number"
                step="any"
                value={formData.applicant_income}
                onChange={handleChange}
                placeholder="5849"
                className={`w-full pl-10 pr-4 py-3 bg-surface-container-lowest border ${
                  errors.applicant_income ? "border-error focus:ring-error" : "border-outline-variant focus:border-primary focus:ring-primary"
                } rounded-xl font-medium text-sm text-on-surface focus:ring-1 focus:outline-none transition-shadow shadow-sm`}
              />
            </div>
            {errors.applicant_income && (
              <p className="text-xs text-error font-medium mt-0.5">{errors.applicant_income}</p>
            )}
          </div>

          {/* 2. Coapplicant Income */}
          <div className="flex flex-col gap-1.5 group relative">
            <label className="text-xs font-semibold text-on-surface-variant transition-colors group-focus-within:text-primary flex items-center justify-between" htmlFor="coapplicant_income">
              <span>Coapplicant Income ($ / month) *</span>
              <span className="text-[11px] opacity-70">e.g. 1508 (0 if none)</span>
            </label>
            <div className="relative">
              <DollarSign className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors" />
              <input
                id="coapplicant_income"
                type="number"
                step="any"
                value={formData.coapplicant_income}
                onChange={handleChange}
                placeholder="0"
                className={`w-full pl-10 pr-4 py-3 bg-surface-container-lowest border ${
                  errors.coapplicant_income ? "border-error focus:ring-error" : "border-outline-variant focus:border-primary focus:ring-primary"
                } rounded-xl font-medium text-sm text-on-surface focus:ring-1 focus:outline-none transition-shadow shadow-sm`}
              />
            </div>
            {errors.coapplicant_income && (
              <p className="text-xs text-error font-medium mt-0.5">{errors.coapplicant_income}</p>
            )}
          </div>

          {/* 3. Requested Loan Amount */}
          <div className="flex flex-col gap-1.5 group relative">
            <label className="text-xs font-semibold text-on-surface-variant transition-colors group-focus-within:text-primary flex items-center justify-between" htmlFor="loan_amount">
              <span>Loan Amount ($ in Thousands) *</span>
              <span className="text-[11px] opacity-70">e.g. 128 = $128,000</span>
            </label>
            <div className="relative">
              <Wallet className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors" />
              <input
                id="loan_amount"
                type="number"
                step="any"
                value={formData.loan_amount}
                onChange={handleChange}
                placeholder="128"
                className={`w-full pl-10 pr-4 py-3 bg-surface-container-lowest border ${
                  errors.loan_amount ? "border-error focus:ring-error" : "border-outline-variant focus:border-primary focus:ring-primary"
                } rounded-xl font-medium text-sm text-on-surface focus:ring-1 focus:outline-none transition-shadow shadow-sm`}
              />
            </div>
            {errors.loan_amount && (
              <p className="text-xs text-error font-medium mt-0.5">{errors.loan_amount}</p>
            )}
          </div>

          {/* 4. Loan Amount Term */}
          <div className="flex flex-col gap-1.5 group relative">
            <label className="text-xs font-semibold text-on-surface-variant transition-colors group-focus-within:text-primary" htmlFor="loan_amount_term">
              Loan Term Duration *
            </label>
            <div className="relative">
              <Calendar className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors" />
              <select
                id="loan_amount_term"
                value={formData.loan_amount_term}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 bg-surface-container-lowest border border-outline-variant rounded-xl font-medium text-sm text-on-surface focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-shadow shadow-sm cursor-pointer"
              >
                <option value="360">360 Months (30 Years)</option>
                <option value="240">240 Months (20 Years)</option>
                <option value="180">180 Months (15 Years)</option>
                <option value="120">120 Months (10 Years)</option>
                <option value="84">84 Months (7 Years)</option>
                <option value="60">60 Months (5 Years)</option>
                <option value="36">36 Months (3 Years)</option>
              </select>
            </div>
          </div>

          {/* 5. Credit History */}
          <div className="flex flex-col gap-1.5 group relative">
            <label className="text-xs font-semibold text-on-surface-variant transition-colors group-focus-within:text-primary" htmlFor="credit_history">
              Credit History Record *
            </label>
            <div className="relative">
              <ShieldCheck className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors" />
              <select
                id="credit_history"
                value={formData.credit_history}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 bg-surface-container-lowest border border-outline-variant rounded-xl font-medium text-sm text-on-surface focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-shadow shadow-sm cursor-pointer"
              >
                <option value="1">1.0 - Good Credit (No Debts Defaulted)</option>
                <option value="0">0.0 - Bad Credit / Debts Uncleared</option>
              </select>
            </div>
          </div>

          {/* 6. Gender */}
          <div className="flex flex-col gap-1.5 group relative">
            <label className="text-xs font-semibold text-on-surface-variant transition-colors group-focus-within:text-primary" htmlFor="gender">
              Gender *
            </label>
            <div className="relative">
              <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors" />
              <select
                id="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 bg-surface-container-lowest border border-outline-variant rounded-xl font-medium text-sm text-on-surface focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-shadow shadow-sm cursor-pointer"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
          </div>

          {/* 7. Married */}
          <div className="flex flex-col gap-1.5 group relative">
            <label className="text-xs font-semibold text-on-surface-variant transition-colors group-focus-within:text-primary" htmlFor="married">
              Marital Status *
            </label>
            <div className="relative">
              <Users className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors" />
              <select
                id="married"
                value={formData.married}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 bg-surface-container-lowest border border-outline-variant rounded-xl font-medium text-sm text-on-surface focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-shadow shadow-sm cursor-pointer"
              >
                <option value="Yes">Married (Yes)</option>
                <option value="No">Single (No)</option>
              </select>
            </div>
          </div>

          {/* 8. Dependents */}
          <div className="flex flex-col gap-1.5 group relative">
            <label className="text-xs font-semibold text-on-surface-variant transition-colors group-focus-within:text-primary" htmlFor="dependents">
              Number of Dependents *
            </label>
            <div className="relative">
              <Users className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors" />
              <select
                id="dependents"
                value={formData.dependents}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 bg-surface-container-lowest border border-outline-variant rounded-xl font-medium text-sm text-on-surface focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-shadow shadow-sm cursor-pointer"
              >
                <option value="0">0 Dependents</option>
                <option value="1">1 Dependent</option>
                <option value="2">2 Dependents</option>
                <option value="3+">3+ Dependents</option>
              </select>
            </div>
          </div>

          {/* 9. Education */}
          <div className="flex flex-col gap-1.5 group relative">
            <label className="text-xs font-semibold text-on-surface-variant transition-colors group-focus-within:text-primary" htmlFor="education">
              Education Level *
            </label>
            <div className="relative">
              <GraduationCap className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors" />
              <select
                id="education"
                value={formData.education}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 bg-surface-container-lowest border border-outline-variant rounded-xl font-medium text-sm text-on-surface focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-shadow shadow-sm cursor-pointer"
              >
                <option value="Graduate">Graduate</option>
                <option value="Not Graduate">Not Graduate</option>
              </select>
            </div>
          </div>

          {/* 10. Self Employed */}
          <div className="flex flex-col gap-1.5 group relative">
            <label className="text-xs font-semibold text-on-surface-variant transition-colors group-focus-within:text-primary" htmlFor="self_employed">
              Employment Type *
            </label>
            <div className="relative">
              <Briefcase className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors" />
              <select
                id="self_employed"
                value={formData.self_employed}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 bg-surface-container-lowest border border-outline-variant rounded-xl font-medium text-sm text-on-surface focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-shadow shadow-sm cursor-pointer"
              >
                <option value="No">Salaried / Employed (No)</option>
                <option value="Yes">Self-Employed (Yes)</option>
              </select>
            </div>
          </div>

          {/* 11. Property Area */}
          <div className="flex flex-col gap-1.5 group relative md:col-span-2">
            <label className="text-xs font-semibold text-on-surface-variant transition-colors group-focus-within:text-primary" htmlFor="property_area">
              Property Location Area *
            </label>
            <div className="relative">
              <MapPin className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors" />
              <select
                id="property_area"
                value={formData.property_area}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 bg-surface-container-lowest border border-outline-variant rounded-xl font-medium text-sm text-on-surface focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-shadow shadow-sm cursor-pointer"
              >
                <option value="Urban">Urban</option>
                <option value="Semiurban">Semiurban</option>
                <option value="Rural">Rural</option>
              </select>
            </div>
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2 pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-on-surface-variant font-medium">
              * All 11 parameters are required for KNN model prediction.
            </p>
            <button
              type="submit"
              disabled={isLoading}
              className="bg-primary text-on-primary px-8 py-3.5 rounded-xl font-semibold shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/35 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 flex items-center gap-2 group w-full sm:w-auto justify-center text-base"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin text-white" />
                  <span>Evaluating Model...</span>
                </>
              ) : (
                <>
                  <span>Run Analysis & Predict</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </div>
        </form>

        {/* API Error Notification */}
        {apiError && (
          <div className="mt-6 p-4 rounded-xl bg-error-container/40 border border-error/40 text-on-error-container flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-error flex-shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm">
              <p className="font-bold">Prediction Request Failed</p>
              <p className="mt-0.5 opacity-90">{apiError}</p>
            </div>
          </div>
        )}

        {/* Dynamic Animated Result Section */}
        {result && (
          <div id="prediction-result-section">
            <ResultCard result={result} onReset={() => setResult(null)} />
          </div>
        )}
      </div>
    </section>
  );
}
