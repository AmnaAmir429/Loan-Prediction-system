"use client";

import { Sparkles, ArrowRight, PlayCircle, ShieldCheck, Cpu } from "lucide-react";

export function Hero() {
  return (
    <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop pt-10 md:pt-16 pb-12">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
        <div className="md:col-span-7 flex flex-col gap-6 fade-in-up" style={{ animationDelay: "0.1s" }}>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-container-high border border-primary/20 w-fit">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse"></span>
            <span className="text-xs font-semibold text-primary uppercase tracking-wider">
              KNN ML Model Powered • v1.0
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-on-surface leading-[1.15] tracking-tight">
            Precise AI <br />
            <span className="text-primary bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary-container to-blue-600">
              Loan Approval Predictions
            </span>
          </h1>

          <p className="text-base sm:text-lg text-on-surface-variant max-w-xl leading-relaxed">
            Leverage advanced K-Nearest Neighbors machine learning to predict loan approval probabilities with verified confidence. Fast, transparent, and data-backed financial intelligence.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <a
              href="#prediction-form"
              className="bg-primary text-on-primary px-7 py-3.5 rounded-xl font-semibold shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/35 hover:-translate-y-1 active:translate-y-0 transition-all duration-300 flex items-center gap-2 text-sm sm:text-base group"
            >
              <span>Predict Loan Now</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#how-it-works"
              className="bg-surface-container-low text-primary px-6 py-3.5 rounded-xl font-semibold border border-outline-variant/60 hover:bg-surface-container transition-all duration-300 flex items-center gap-2 text-sm sm:text-base"
            >
              <PlayCircle className="w-5 h-5 text-primary" />
              <span>How Model Works</span>
            </a>
          </div>

          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-outline-variant/20 max-w-md">
            <div>
              <p className="text-xl sm:text-2xl font-bold text-on-surface">11</p>
              <p className="text-xs text-on-surface-variant">Validated Features</p>
            </div>
            <div>
              <p className="text-xl sm:text-2xl font-bold text-primary">78%+</p>
              <p className="text-xs text-on-surface-variant">KNN Model Accuracy</p>
            </div>
            <div>
              <p className="text-xl sm:text-2xl font-bold text-on-surface">Instant</p>
              <p className="text-xs text-on-surface-variant">Real-Time Scoring</p>
            </div>
          </div>
        </div>

        <div className="md:col-span-5 fade-in-up relative" style={{ animationDelay: "0.3s" }}>
          <div className="relative rounded-3xl p-6 glass-card border border-primary/20 shadow-2xl shadow-primary/10 overflow-hidden group">
            <div className="absolute -right-16 -top-16 w-64 h-64 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all duration-500"></div>
            
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-outline-variant/30">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary-container text-white flex items-center justify-center shadow-md">
                  <Cpu className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-on-surface">AI Risk Engine</h3>
                  <p className="text-xs text-on-surface-variant">KNN Classifier Active</p>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                Online
              </span>
            </div>

            <div className="space-y-4">
              <div className="p-3.5 rounded-xl bg-surface-container-low/70 border border-outline-variant/30 flex items-center justify-between">
                <span className="text-xs font-medium text-on-surface-variant">Credit History Weight</span>
                <span className="text-xs font-bold text-primary">Primary Factor</span>
              </div>
              <div className="p-3.5 rounded-xl bg-surface-container-low/70 border border-outline-variant/30 flex items-center justify-between">
                <span className="text-xs font-medium text-on-surface-variant">Debt-to-Income Assessment</span>
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">Automated</span>
              </div>
              <div className="p-3.5 rounded-xl bg-surface-container-low/70 border border-outline-variant/30 flex items-center justify-between">
                <span className="text-xs font-medium text-on-surface-variant">Standardized Feature Scaler</span>
                <span className="text-xs font-bold text-on-surface">Active</span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-outline-variant/30 flex items-center justify-between text-xs text-on-surface-variant">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-primary" />
                End-to-End Encryption
              </span>
              <span>FastAPI REST API</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
