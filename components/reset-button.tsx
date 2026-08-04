"use client";

import { RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ResetButtonProps {
  onReset: () => void;
  label?: string;
  variant?: "default" | "outline" | "ghost" | "secondary" | "destructive";
  className?: string;
}

export function ResetButton({
  onReset,
  label = "Reset",
  variant = "ghost",
  className = "",
}: ResetButtonProps) {
  return (
    <Button
      variant={variant}
      onClick={onReset}
      className={`gap-2 ${className}`}
    >
      <RotateCcw className="h-4 w-4" />
      {label}
    </Button>
  );
}
