"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { CopyButton } from "@/components/copy-button";
import { RefreshCw, Key, ShieldCheck } from "lucide-react";
import { ToolLayout } from "@/components/tool-layout";
import { getToolBySlug } from "@/lib/tools-data";

export function PasswordGenerator() {
  const tool = getToolBySlug("password-generator")!;
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(16);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);

  const generatePassword = () => {
    let charset = "";
    if (includeUppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (includeLowercase) charset += "abcdefghijklmnopqrstuvwxyz";
    if (includeNumbers) charset += "0123456789";
    if (includeSymbols) charset += "!@#$%^&*()_+~`|}{[]:;?><,./-=";

    if (charset === "") {
      setPassword("Please select at least one option");
      return;
    }

    let newPassword = "";
    const array = new Uint32Array(length);
    window.crypto.getRandomValues(array);

    for (let i = 0; i < length; i++) {
      newPassword += charset[array[i] % charset.length];
    }

    setPassword(newPassword);
  };

  // Generate on mount
  useEffect(() => {
    generatePassword();
  }, [length, includeUppercase, includeLowercase, includeNumbers, includeSymbols]);

  const calculateStrength = () => {
    if (!password || password === "Please select at least one option") return 0;
    let strength = 0;
    if (password.length >= 12) strength += 1;
    if (password.length >= 16) strength += 1;
    if (includeUppercase) strength += 1;
    if (includeNumbers) strength += 1;
    if (includeSymbols) strength += 1;
    return Math.min(5, strength);
  };

  const strength = calculateStrength();
  const strengthLabels = ["Very Weak", "Weak", "Fair", "Good", "Strong", "Very Strong"];
  const strengthColors = [
    "bg-red-500",
    "bg-orange-500",
    "bg-yellow-500",
    "bg-blue-500",
    "bg-green-500",
    "bg-green-600",
  ];

  return (
    <ToolLayout tool={tool} seoTips={[]} faqs={[]}>
      <div className="mx-auto max-w-2xl">
      <div className="rounded-2xl border border-border/50 bg-card p-6 sm:p-8 shadow-xl shadow-black/5">
        
        {/* Output Area */}
        <div className="relative mb-8 overflow-hidden rounded-xl bg-muted/50 border border-border p-6 text-center">
          <p className="font-mono text-2xl sm:text-3xl font-bold tracking-wider break-all text-foreground">
            {password}
          </p>
          <div className="absolute top-3 right-3">
            <CopyButton text={password} />
          </div>
        </div>

        {/* Strength Meter */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <Label className="text-sm font-semibold">Password Strength</Label>
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              {strengthLabels[strength]}
            </span>
          </div>
          <div className="flex gap-1 h-2 w-full">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className={`h-full flex-1 rounded-full transition-colors duration-500 ${
                  i < strength ? strengthColors[strength] : "bg-muted"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Controls */}
        <div className="space-y-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="length-slider" className="text-sm font-semibold">
                Password Length
              </Label>
              <span className="text-sm font-bold text-violet-500">{length} characters</span>
            </div>
            <input
              id="length-slider"
              type="range"
              min="8"
              max="128"
              value={length}
              onChange={(e) => setLength(parseInt(e.target.value))}
              className="w-full accent-violet-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-border/50">
            {[
              { id: "uppercase", label: "Uppercase (A-Z)", state: includeUppercase, setter: setIncludeUppercase },
              { id: "lowercase", label: "Lowercase (a-z)", state: includeLowercase, setter: setIncludeLowercase },
              { id: "numbers", label: "Numbers (0-9)", state: includeNumbers, setter: setIncludeNumbers },
              { id: "symbols", label: "Symbols (!@#$)", state: includeSymbols, setter: setIncludeSymbols },
            ].map(({ id, label, state, setter }) => (
              <label
                key={id}
                htmlFor={id}
                className={`flex cursor-pointer items-center gap-3 rounded-lg border p-4 transition-all hover:bg-muted/50 ${
                  state ? "border-violet-500 bg-violet-500/5" : "border-border"
                }`}
              >
                <div className="flex h-5 w-5 items-center justify-center rounded border border-border/50 bg-background">
                  {state && <ShieldCheck className="h-3.5 w-3.5 text-violet-500" />}
                </div>
                <input
                  type="checkbox"
                  id={id}
                  className="hidden"
                  checked={state}
                  onChange={(e) => setter(e.target.checked)}
                />
                <span className="text-sm font-medium select-none">{label}</span>
              </label>
            ))}
          </div>

          <Button 
            onClick={generatePassword} 
            className="w-full h-12 text-base font-semibold bg-gradient-to-r from-violet-600 to-indigo-600 hover:opacity-90 shadow-lg shadow-violet-500/25"
          >
            <RefreshCw className="mr-2 h-5 w-5" />
            Generate New Password
          </Button>
        </div>
      </div>
    </div>
  </ToolLayout>
  );
}
