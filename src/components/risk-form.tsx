"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const formSchema = z.object({
  sex: z.enum(["male", "female"], {
    required_error: "Por favor, seleccione su sexo.",
  }),
  age: z.coerce
    .number({ invalid_type_error: "La edad debe ser un número." })
    .min(1, "La edad debe ser un número positivo.")
    .max(120, "La edad parece demasiado alta."),
  packs: z.coerce
    .number({ invalid_type_error: "El valor debe ser un número." })
    .min(0, "Los paquetes no pueden ser negativos.")
    .max(200, "Este es un número muy alto."),
});

export type RiskFormValues = z.infer<typeof formSchema>;

type RiskFormProps = {
  onCalculate: (data: RiskFormValues) => Promise<void>;
};

export default function RiskForm({ onCalculate }: RiskFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<RiskFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      age: 18,
      packs: 0,
    },
  });

  async function onSubmit(values: RiskFormValues) {
    setIsSubmitting(true);
    await onCalculate(values);
    setIsSubmitting(false);
  }

  return (
    <Card className="w-full shadow-lg border-2 border-primary/20">
      <CardHeader>
        <CardTitle className="text-center text-2xl font-headline">
          Calculadora de Riesgo
        </CardTitle>
        <CardDescription className="text-center">
          Ingrese sus datos para evaluar su perfil de riesgo.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="sex"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sexo</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={isSubmitting}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione su sexo" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="male">Hombre</SelectItem>
                      <SelectItem value="female">Mujer</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Edad</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="e.g., 45"
                      {...field}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="packs"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Paquetes de cigarrillos por año</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="e.g., 10"
                      {...field}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
              size="lg"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Calculando...
                </>
              ) : (
                "Calcular Riesgo"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
