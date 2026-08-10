"use client";

import { ClipboardList, Cpu, BarChart3, CheckCircle2 } from "lucide-react";

const STEPS = [
  {
    icon: ClipboardList,
    step: "01",
    title: "Enter Applicant Details",
    description:
      "Fill in the 11 financial parameters — income, loan amount, credit history, employment type, and more — into the prediction form.",
  },
  {
    icon: Cpu,
    step: "02",
    title: "KNN Model Processing",
    description:
      "Your data is encoded, scaled via StandardScaler, and passed to the trained K-Nearest Neighbors classifier running on the FastAPI backend.",
  },
  {
    icon: BarChart3,
    step: "03",
    title: "Probability Calculation",
    description:
      "The model finds the K closest neighbors in the training dataset and computes the approval probability based on their weighted vote.",
  },
  {
    icon: CheckCircle2,
    step: "04",
    title: "Instant Result Delivered",
    description:
      "You receive an Approved or Rejected prediction with a confidence percentage, debt-to-income ratio, and a full financial summary.",
  },
];

export function HowItWorks() {
  return (
    <section
      className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-16"
      id="how-it-works"
    >
      <div className="text-center mb-12">
        <span className="text-xs font-bold uppercase tracking-wider text-primary">
          Model Pipeline
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-on-surface tracking-tight mt-1">
          How the KNN Model Works
        </h2>
        <p className="text-base text-on-surface-variant mt-2 max-w-xl mx-auto">
          A transparent, step-by-step breakdown of how your loan application is
          evaluated by our machine learning system.
        </p>
      </div>

      <div className="relative">
        <div className="hidden md:block absolute top-10 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-primary/10 via-primary/40 to-primary/10 z-0" />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
          {STEPS.map(({ icon: Icon, step, title, description }) => (
            <div key={step} className="flex flex-col items-center text-center group">
              <div className="w-20 h-20 rounded-2xl bg-surface-container-lowest border-2 border-outline-variant/40 group-hover:border-primary/60 group-hover:shadow-xl group-hover:shadow-primary/10 flex items-center justify-center mb-5 transition-all duration-300 relative">
                <Icon className="w-8 h-8 text-primary" />
                <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary text-on-primary text-[10px] font-extrabold flex items-center justify-center shadow-md">
                  {step.slice(1)}
                </span>
              </div>
              <h3 className="text-base font-bold text-on-surface mb-2 group-hover:text-primary transition-colors duration-200">
                {title}
              </h3>
              <p className="text-sm text-on-surface-variant leading-relaxed max-w-xs">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-14 rounded-2xl bg-surface-container-lowest border border-outline-variant/40 p-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        {[
          { label: "Algorithm", value: "KNN Classifier" },
          { label: "Training Features", value: "11 Parameters" },
          { label: "Test Accuracy", value: "78%+" },
          { label: "Response Time", value: "< 200 ms" },
        ].map(({ label, value }) => (
          <div key={label}>
            <p className="text-xl font-extrabold text-primary">{value}</p>
            <p className="text-xs text-on-surface-variant mt-1">{label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
