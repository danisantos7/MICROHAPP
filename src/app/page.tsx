"use client";

import { useState } from "react";
import Image from "next/image";
import RiskForm, { type RiskFormValues } from "@/components/risk-form";
import RiskResultDialog from "@/components/risk-result-dialog";
import creditosImg from "./creditoshospital.jpeg";

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
    <div className="flex flex-col min-h-svh bg-background text-foreground">
      <header className="p-4 shadow-md bg-card sticky top-0 z-10">
        <div className="flex items-center justify-center gap-3">
          <Image
            src="/icon.png"
            alt="App Logo"
            width={70}
            height={70}
            data-ai-hint="medical logo"
            className="rounded-full"
          />
          <h1 className="text-3xl font-bold text-primary font-headline">
            MICROHAPP
          </h1>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-start pt-6 pb-0 md:px-8 md:pb-0">
        <div className="text-center max-w-2xl mb-4 px-4">
            <p className="text-muted-foreground">
                Calculadora para la estratificación de riesgo de tumor urotelial (vejiga y tracto urinario superior) en pacientes con microhematuria asintomática.
            </p>
        </div>
        <div className="w-full max-w-md px-4">
          <RiskForm onCalculate={handleCalculateRisk} />
        </div>
        <div className="text-center text-[13px] max-w-2xl px-4 mt-6 mb-2">
            <p className="text-muted-foreground">
            Esta calculadora tiene fines informativos y no sustituye el juicio clínico. Los creadores no se hacen responsables del manejo de los pacientes ni de las decisiones clínicas derivadas de su uso.
            </p>
        </div>
      </main>

      <footer className="p-4 text-center text-muted-foreground text-sm flex flex-col items-center bg-slate-50/50">
        <Image
            src={creditosImg}
            alt="Créditos del hospital"
            width={220}
            data-ai-hint="hospital logo"
            className="rounded-full"
          />
        <p className="mt-4">Modelo clínico: Dra. Milagros Muñoz Montoya</p>
        <p className="mt-4">Desarrollo de software: Daniel Santos Olmo Montoya</p>
      </footer>

      <RiskResultDialog
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        riskScore={riskScore}
      />
    </div>
  );
}