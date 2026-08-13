import type { Metadata } from "next";
import { Providers } from "./providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "LendPredict AI - Loan Approval Predictor",
  description: "Precise AI-driven loan approval predictions powered by K-Nearest Neighbors machine learning and Next.js 15.",
  keywords: ["Loan Prediction", "KNN", "Machine Learning", "Next.js 15", "FastAPI", "Fintech"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body className="bg-background text-on-background font-sans antialiased min-h-screen flex flex-col selection:bg-primary-container selection:text-on-primary-container">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
