"use client";

import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
import { Landmark, Activity, Sparkles } from "lucide-react";

export function Navbar() {
  return (
    <header className="fixed top-0 w-full z-50 backdrop-blur-xl bg-surface/80 dark:bg-surface-dim/80 border-b border-outline-variant/20 shadow-lg shadow-primary/5 transition-colors duration-300">
      <div className="flex items-center justify-between px-margin-mobile md:px-margin-desktop py-3.5 max-w-container-max mx-auto">
        <Link
          href="/"
          className="flex items-center gap-2.5 cursor-pointer active:scale-95 transition-transform group"
        >
          <div className="w-10 h-10 rounded-xl bg-primary-container/10 dark:bg-primary/10 flex items-center justify-center border border-primary/20 group-hover:border-primary/50 transition-colors">
            <Activity className="w-6 h-6 text-primary" />
          </div>
          <span className="font-bold text-xl md:text-2xl text-primary tracking-tight font-sans">
            LendPredict <span className="text-on-surface font-semibold text-lg opacity-80">AI</span>
          </span>
        </Link>

        <nav className="hidden md:flex gap-8 items-center">
          <a
            href="#prediction-form"
            className="text-on-surface-variant font-medium text-sm hover:text-primary transition-colors duration-200"
          >
            Predictor
          </a>
          <a
            href="#features"
            className="text-on-surface-variant font-medium text-sm hover:text-primary transition-colors duration-200"
          >
            Capabilities
          </a>
          <a
            href="#how-it-works"
            className="text-on-surface-variant font-medium text-sm hover:text-primary transition-colors duration-200"
          >
            How it Works
          </a>

          <div className="flex items-center gap-3 pl-4 border-l border-outline-variant/30">
            <ThemeToggle />
            <a
              href="#prediction-form"
              className="bg-primary text-on-primary px-4 py-2 rounded-xl text-sm font-semibold shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 flex items-center gap-1.5"
            >
              <Sparkles className="w-4 h-4" />
              <span>Get Started</span>
            </a>
          </div>
        </nav>

        <div className="md:hidden flex items-center gap-3">
          <ThemeToggle />
          <a
            href="#prediction-form"
            className="bg-primary text-on-primary px-3 py-1.5 rounded-lg text-xs font-semibold"
          >
            Predict
          </a>
        </div>
      </div>
    </header>
  );
}
