"use client";

import { useState } from "react";
import Image from "next/image";
import RiskForm, { type RiskFormValues } from "@/components/risk-form";
import RiskResultDialog from "@/components/risk-result-dialog";
import placeholderData from "@/app/lib/placeholder-images.json";

const appLogo = placeholderData.placeholderImages.find(
  (img) => img.id === "app-logo"
);
const hospitalLogo = placeholderData.placeholderImages.find(
  (img) => img.id === "hospital-credits-logo"
);

export default function Home() {
  const [riskScore, setRiskScore] = useState<number | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleCalculateRisk = (data: RiskFormValues) => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        const { age, packs, sex } = data;

        const sexValue = sex === "male" ? 1 : 0;
        const A =
          -7.4071 + 0.0729 * age + 0.7788 * sexValue + 0.0124 * packs;
        const probability = 1 / (1 + Math.exp(-A));

        setRiskScore(probability * 100);
        setIsDialogOpen(true);
        resolve();
      }, 1500);
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="p-4 shadow-md bg-card sticky top-0 z-10">
        <div className="flex items-center justify-center gap-3">
          {appLogo ? (
            <Image
              src={appLogo.imageUrl}
              alt={appLogo.description}
              width={70}
              height={70}
              data-ai-hint={appLogo.imageHint}
              className="rounded-full"
            />
          ) : (
            <div className="w-[70px] h-[70px] bg-muted rounded-full" />
          )}
          <h1 className="text-3xl font-bold text-primary font-headline">
            MICROHAPP
          </h1>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-4 md:p-8">
        <div className="text-center max-w-2xl mb-8">
            <p className="text-muted-foreground">
                Calculadora para la estratificación de riesgo de tumor urotelial (vejiga y tracto urinario superior) en pacientes con microhematuria asintomática.
            </p>
        </div>
        <div className="w-full max-w-md">
          <RiskForm onCalculate={handleCalculateRisk} />
        </div>
      </main>

      <footer className="p-4 text-center text-muted-foreground text-sm flex flex-col items-center">
        <p className="mb-4 max-w-lg text-foreground/80">
          Esta calculadora tiene fines informativos y no sustituye el juicio clínico. Los creadores no se hacen responsables del manejo de los pacientes ni de las decisiones clínicas derivadas de su uso.
        </p>
        {hospitalLogo ? (
            <Image
              src={hospitalLogo.imageUrl}
              alt={hospitalLogo.description}
              width={70}
              height={70}
              data-ai-hint={hospitalLogo.imageHint}
              className="rounded-full"
            />
          ) : (
             <div className="w-[70px] h-[70px] bg-muted rounded-full" />
        )}
        <p className="mt-4">Desarrollado por Daniel Santos Olmo Montoya</p>
      </footer>

      <RiskResultDialog
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        riskScore={riskScore}
      />
    </div>
  );
}
