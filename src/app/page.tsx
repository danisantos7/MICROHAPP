"use client";

import { useState } from "react";
import RiskForm, { type RiskFormValues } from "@/components/risk-form";
import RiskResultDialog from "@/components/risk-result-dialog";

export default function Home() {
  const [riskScore, setRiskScore] = useState<number | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleCalculateRisk = (data: RiskFormValues) => {
    // Artificial delay to show loading state
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        const { age, packs, sex } = data;
        // Formula: score = (age - 45) * 0.3 + packs * 0.4 + (sex === 'male' ? 3 : -3)
        const score = (age - 45) * 0.3 + packs * 0.4 + (sex === "male" ? 3 : -3);
        setRiskScore(score);
        setIsDialogOpen(true);
        resolve();
      }, 1500);
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="p-4 shadow-md bg-card sticky top-0 z-10">
        <h1 className="text-3xl font-bold text-primary text-center font-headline">
          MICROHAPP
        </h1>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-md">
          <RiskForm onCalculate={handleCalculateRisk} />
        </div>
      </main>

      <footer className="p-4 text-center text-muted-foreground text-sm">
        <p>Desarrollado por Daniel Santos Olmo Montoya</p>
      </footer>

      <RiskResultDialog
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        riskScore={riskScore}
      />
    </div>
  );
}
