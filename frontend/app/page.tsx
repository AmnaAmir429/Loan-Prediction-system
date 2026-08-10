import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { PredictionForm } from "@/components/prediction-form";
import { Features } from "@/components/features";
import { Activity } from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow pt-20">
        <Hero />
        <PredictionForm />
        <Features />
      </main>

      <footer className="w-full py-10 bg-surface-container-low dark:bg-surface-container-highest/60 border-t border-outline-variant/30 mt-auto transition-colors duration-300">
        <div className="flex flex-col md:flex-row justify-between items-center px-margin-mobile md:px-margin-desktop gap-6 max-w-container-max mx-auto text-sm">
          <div className="flex flex-col items-center md:items-start gap-1">
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-primary" />
              <span className="font-bold text-lg text-primary tracking-tight">
                LendPredict AI
              </span>
            </div>
            <p className="text-xs text-on-surface-variant text-center md:text-left">
              © {new Date().getFullYear()} LendPredict AI. All rights reserved. Precise predictions for responsible lending.
            </p>
          </div>

          <nav className="flex flex-wrap justify-center gap-6 text-xs text-on-surface-variant">
            <a href="#prediction-form" className="hover:text-primary transition-colors">
              Predictor
            </a>
            <a href="#features" className="hover:text-primary transition-colors">
              Capabilities
            </a>
            <span className="text-outline/50">•</span>
            <span>FastAPI + Next.js 15</span>
          </nav>
        </div>
      </footer>
    </div>
  );
}
