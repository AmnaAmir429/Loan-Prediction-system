"use client";

import { motion } from "framer-motion";
import { CheckCircle2, XCircle, AlertCircle, ArrowUpRight, DollarSign, Calendar, ShieldCheck, Activity } from "lucide-react";

export interface PredictionResult {
  status: string;
  prediction: "Approved" | "Rejected";
  is_approved: boolean;
  confidence: number;
  probability_approved: number;
  probability_rejected: number;
  summary: {
    total_income: number;
    loan_amount_usd: number;
    term_months: number;
    credit_status: string;
    debt_to_annual_income_ratio_pct: number;
    property_area: string;
  };
}

interface ResultCardProps {
  result: PredictionResult;
  onReset?: () => void;
}

export function ResultCard({ result, onReset }: ResultCardProps) {
  const isApproved = result.is_approved;
  const confidence = result.confidence;

  // SVG Gauge calculations
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (confidence / 100) * circumference;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="mt-8 rounded-2xl overflow-hidden shadow-2xl border transition-all duration-300"
    >
      {/* Dynamic Header Banner */}
      <div
        className={`p-6 sm:p-8 border-b ${
          isApproved
            ? "bg-gradient-to-r from-emerald-600 via-emerald-700 to-teal-800 text-white border-emerald-500/30"
            : "bg-gradient-to-r from-rose-700 via-red-700 to-rose-900 text-white border-rose-500/30"
        }`}
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div
              className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg ${
                isApproved
                  ? "bg-white/20 backdrop-blur-md text-white border border-white/30"
                  : "bg-white/20 backdrop-blur-md text-white border border-white/30"
              }`}
            >
              {isApproved ? (
                <CheckCircle2 className="w-10 h-10 text-emerald-200 animate-bounce" />
              ) : (
                <XCircle className="w-10 h-10 text-rose-200" />
              )}
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-widest opacity-80">
                  ML Prediction Decision
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-white/20 border border-white/30">
                  KNN Classifier
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-1">
                Loan {result.prediction}
              </h3>
              <p className="text-sm opacity-90 font-medium">
                {isApproved
                  ? "Applicant profile satisfies approval threshold according to trained KNN model."
                  : "Applicant profile presents elevated risk criteria based on credit and income metrics."}
              </p>
            </div>
          </div>

          {/* Circular Gauge */}
          <div className="relative w-24 h-24 flex-shrink-0 self-center sm:self-auto">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle
                className="text-white/20"
                cx="50"
                cy="50"
                r={radius}
                fill="transparent"
                stroke="currentColor"
                strokeWidth="8"
              />
              <motion.circle
                className={isApproved ? "text-emerald-200" : "text-rose-200"}
                cx="50"
                cy="50"
                r={radius}
                fill="transparent"
                stroke="currentColor"
                strokeWidth="8"
                strokeDasharray={circumference}
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-xl font-extrabold tracking-tight leading-none text-white">
                {confidence}%
              </span>
              <span className="text-[10px] font-medium opacity-80 mt-0.5">Confidence</span>
            </div>
          </div>
        </div>
      </div>

      {/* Breakdown Details */}
      <div className="p-6 sm:p-8 bg-surface-container-lowest dark:bg-surface-container-lowest/80 space-y-6">
        <h4 className="text-sm font-bold uppercase tracking-wider text-on-surface-variant flex items-center gap-2">
          <Activity className="w-4 h-4 text-primary" />
          Financial & Credit Summary Breakdown
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-surface-container-low/70 border border-outline-variant/30">
            <div className="flex items-center gap-2 text-xs font-semibold text-on-surface-variant mb-1">
              <DollarSign className="w-4 h-4 text-primary" />
              <span>Combined Total Income</span>
            </div>
            <p className="text-lg font-bold text-on-surface">
              ${result.summary.total_income.toLocaleString("en-US")} / yr
            </p>
          </div>

          <div className="p-4 rounded-xl bg-surface-container-low/70 border border-outline-variant/30">
            <div className="flex items-center gap-2 text-xs font-semibold text-on-surface-variant mb-1">
              <DollarSign className="w-4 h-4 text-primary" />
              <span>Requested Loan Amount</span>
            </div>
            <p className="text-lg font-bold text-on-surface">
              ${result.summary.loan_amount_usd.toLocaleString("en-US")}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-surface-container-low/70 border border-outline-variant/30">
            <div className="flex items-center gap-2 text-xs font-semibold text-on-surface-variant mb-1">
              <ShieldCheck className="w-4 h-4 text-primary" />
              <span>Credit History Status</span>
            </div>
            <p className="text-base font-bold text-on-surface">
              {result.summary.credit_status}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-surface-container-low/70 border border-outline-variant/30">
            <div className="flex items-center gap-2 text-xs font-semibold text-on-surface-variant mb-1">
              <Calendar className="w-4 h-4 text-primary" />
              <span>Loan Amount Term</span>
            </div>
            <p className="text-base font-bold text-on-surface">
              {result.summary.term_months} Months ({roundToYears(result.summary.term_months)} Years)
            </p>
          </div>

          <div className="p-4 rounded-xl bg-surface-container-low/70 border border-outline-variant/30">
            <div className="flex items-center gap-2 text-xs font-semibold text-on-surface-variant mb-1">
              <AlertCircle className="w-4 h-4 text-primary" />
              <span>Loan to Annual Income</span>
            </div>
            <p className="text-base font-bold text-on-surface">
              {result.summary.debt_to_annual_income_ratio_pct}%
            </p>
          </div>

          <div className="p-4 rounded-xl bg-surface-container-low/70 border border-outline-variant/30">
            <div className="flex items-center gap-2 text-xs font-semibold text-on-surface-variant mb-1">
              <ArrowUpRight className="w-4 h-4 text-primary" />
              <span>Property Area Category</span>
            </div>
            <p className="text-base font-bold text-on-surface">
              {result.summary.property_area}
            </p>
          </div>
        </div>

        {onReset && (
          <div className="pt-4 border-t border-outline-variant/30 flex justify-end">
            <button
              onClick={onReset}
              className="px-6 py-2.5 rounded-xl font-semibold text-sm bg-surface-container-low hover:bg-surface-container border border-outline-variant/60 text-primary transition-all duration-200"
            >
              Test Another Application
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}

function roundToYears(months: number): string {
  if (!months) return "0";
  return (months / 12).toFixed(1);
}
