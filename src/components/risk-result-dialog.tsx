"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { ShieldAlert, ShieldCheck, Shield } from "lucide-react";
import { cn } from "@/lib/utils";

type RiskResultDialogProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  riskScore: number | null;
};

export default function RiskResultDialog({
  isOpen,
  onOpenChange,
  riskScore,
}: RiskResultDialogProps) {
  if (riskScore === null) return null;

  let title = "Evaluación de Riesgo Estándar";
  let description =
    "Su perfil de riesgo se considera estándar. Recomendamos mantener un estilo de vida saludable y continuar con los chequeos anuales regulares.";
  let Icon = Shield;
  let iconColor = "text-primary";
  let titleColor = "text-foreground";

  if (riskScore > 7) {
    title = "Riesgo Alto Detectado";
    description =
      "Se recomienda encarecidamente una consulta urgente con un especialista y la realización de pruebas específicas como una Tomografía Computarizada (TC) de baja dosis y análisis de marcadores tumorales.";
    Icon = ShieldAlert;
    iconColor = "text-destructive";
    titleColor = "text-destructive";
  } else if (riskScore < -7) {
    title = "Perfil de Bajo Riesgo";
    description =
      "Su perfil de riesgo general es bajo. Para una evaluación completa, se sugieren diferentes pruebas preventivas como un análisis de sangre general y una consulta de seguimiento con su médico.";
    Icon = ShieldCheck;
    iconColor = "text-accent";
    titleColor = "text-foreground";
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
          <div className="flex justify-center">
            <Icon className={cn("h-16 w-16 mb-4", iconColor)} />
          </div>
          <AlertDialogTitle className={cn("text-2xl text-center font-headline", titleColor)}>
            {title}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center pt-2 text-base">
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction
            className="w-full"
            onClick={() => onOpenChange(false)}
          >
            Entendido
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
