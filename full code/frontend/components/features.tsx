"use client";

import { Cpu, ShieldCheck, BarChart3, Zap, Layers, Lock } from "lucide-react";

export function Features() {
  return (
    <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-16" id="features">
      <div className="text-center mb-12">
        <span className="text-xs font-bold uppercase tracking-wider text-primary">Architecture Capabilities</span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-on-surface tracking-tight mt-1">
          Engineered for Financial Precision
        </h2>
        <p className="text-base text-on-surface-variant mt-2 max-w-xl mx-auto">
          Combining scikit-learn Machine Learning with modern Next.js 15 App Router architecture.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Feature 1 */}
        <div className="bg-surface-container-lowest p-8 rounded-2xl border border-outline-variant/40 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 group flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-xl bg-surface-container-low flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300 border border-outline-variant/30">
              <Cpu className="w-6 h-6 text-primary group-hover:text-white transition-colors" />
            </div>
            <h3 className="text-xl font-bold text-on-surface mb-2">Trained KNN Model</h3>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              Trained on standard loan dataset features using median/mode imputation, categorical LabelEncoding, and StandardScaler normalization.
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-outline-variant/20 flex items-center gap-2 text-xs font-semibold text-primary">
            <span>scikit-learn & joblib</span>
          </div>
        </div>

        {/* Feature 2 */}
        <div className="bg-surface-container-lowest p-8 rounded-2xl border border-outline-variant/40 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 group flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-xl bg-surface-container-low flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300 border border-outline-variant/30">
              <Zap className="w-6 h-6 text-primary group-hover:text-white transition-colors" />
            </div>
            <h3 className="text-xl font-bold text-on-surface mb-2">FastAPI REST Backend</h3>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              High-performance asynchronous Python API exposing strict Pydantic input validation, CORS headers, and confidence probability calculation.
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-outline-variant/20 flex items-center gap-2 text-xs font-semibold text-primary">
            <span>FastAPI & Pydantic v2</span>
          </div>
        </div>

        {/* Feature 3 */}
        <div className="bg-surface-container-lowest p-8 rounded-2xl border border-outline-variant/40 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 group flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-xl bg-surface-container-low flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300 border border-outline-variant/30">
              <BarChart3 className="w-6 h-6 text-primary group-hover:text-white transition-colors" />
            </div>
            <h3 className="text-xl font-bold text-on-surface mb-2">Google Stitch Design</h3>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              Pixel-perfect implementation preserving Stitch typography, color palette, glassmorphism, responsive grid, and interactive theme switcher.
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-outline-variant/20 flex items-center gap-2 text-xs font-semibold text-primary">
            <span>Tailwind CSS & next-themes</span>
          </div>
        </div>
      </div>
    </section>
  );
}
