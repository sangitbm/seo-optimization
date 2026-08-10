"use client";

import { useEffect, useRef } from "react";

interface AdSlotProps {
  variant?: "banner" | "sidebar" | "in-content" | "footer";
  className?: string;
  slotId?: string;
}

export function AdSlot({ variant = "banner", className = "", slotId }: AdSlotProps) {
  // Temporarily disabled per user request
  return null;
}

