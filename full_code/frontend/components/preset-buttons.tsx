"use client";

import { CheckCircle2, XCircle, Sparkles } from "lucide-react";

export interface LoanFormData {
  gender: string;
  married: string;
  dependents: string;
  education: string;
  self_employed: string;
  applicant_income: string;
  coapplicant_income: string;
  loan_amount: string;
  loan_amount_term: string;
  credit_history: string;
  property_area: string;
}

interface PresetButtonsProps {
  onSelectPreset: (presetData: LoanFormData) => void;
}

export const PRESETS: { label: string; icon: "success" | "warning" | "neutral"; data: LoanFormData }[] = [
  {
    label: "Prime Applicant (High Approval)",
    icon: "success",
    data: {
      gender: "Male",
      married: "Yes",
      dependents: "1",
      education: "Graduate",
      self_employed: "No",
      applicant_income: "5849",
      coapplicant_income: "2000",
      loan_amount: "140",
      loan_amount_term: "360",
      credit_history: "1",
      property_area: "Semiurban",
    },
  },
  {
    label: "High Risk Applicant (Likely Rejection)",
    icon: "warning",
    data: {
      gender: "Male",
      married: "Yes",
      dependents: "3+",
      education: "Not Graduate",
      self_employed: "Yes",
      applicant_income: "2600",
      coapplicant_income: "0",
      loan_amount: "250",
      loan_amount_term: "360",
      credit_history: "0",
      property_area: "Rural",
    },
  },
  {
    label: "Graduate Single Applicant",
    icon: "neutral",
    data: {
      gender: "Female",
      married: "No",
      dependents: "0",
      education: "Graduate",
      self_employed: "No",
      applicant_income: "6000",
      coapplicant_income: "0",
      loan_amount: "141",
      loan_amount_term: "360",
      credit_history: "1",
      property_area: "Urban",
    },
  },
];

export function PresetButtons({ onSelectPreset }: PresetButtonsProps) {
  return (
    <div className="mb-8 p-4 rounded-xl bg-surface-container-low/70 border border-outline-variant/40">
      <div className="flex items-center gap-2 mb-3 text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
        <Sparkles className="w-3.5 h-3.5 text-primary" />
        <span>Quick Sample Scenarios (One-Click Demo)</span>
      </div>
      <div className="flex flex-wrap gap-2.5">
        {PRESETS.map((preset, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => onSelectPreset(preset.data)}
            className="px-3.5 py-2 rounded-lg text-xs font-semibold bg-surface-container-lowest hover:bg-surface-container border border-outline-variant/60 hover:border-primary/50 text-on-surface transition-all duration-200 shadow-sm flex items-center gap-2 hover:-translate-y-0.5 active:translate-y-0"
          >
            {preset.icon === "success" && (
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            )}
            {preset.icon === "warning" && (
              <XCircle className="w-3.5 h-3.5 text-rose-500" />
            )}
            {preset.icon === "neutral" && (
              <Sparkles className="w-3.5 h-3.5 text-primary" />
            )}
            <span>{preset.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
