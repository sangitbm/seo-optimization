"use client";

import { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setIsSubmitting(true);

    // Using mailto as a reliable, no-backend fallback
    // This opens the user's email client pre-filled — works 100% without a server
    const mailtoUrl = `mailto:seoopti654@gmail.com?subject=${encodeURIComponent(
      subject || `Contact Form: Message from ${name}`
    )}&body=${encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\n${message}`
    )}`;

    // Short delay for UX, then open email client
    await new Promise((resolve) => setTimeout(resolve, 600));
    window.location.href = mailtoUrl;

    setIsSubmitting(false);
    setSubmitted(true);
    toast.success("Your email client has opened. Please send the email to complete your message.");
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-16 space-y-4">
        <div className="bg-green-100 dark:bg-green-900/30 p-4 rounded-full">
          <CheckCircle2 className="h-10 w-10 text-green-600 dark:text-green-400" />
        </div>
        <h2 className="text-2xl font-bold">Message Prepared!</h2>
        <p className="text-muted-foreground max-w-sm">
          Your email client should have opened with the message pre-filled. Just hit send and we'll get back to you within 24 hours.
        </p>
        <Button variant="outline" onClick={() => { setSubmitted(false); setName(""); setEmail(""); setSubject(""); setMessage(""); }}>
          Send Another Message
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="contact-name">Your Name <span className="text-red-500">*</span></Label>
          <Input
            id="contact-name"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="h-11"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="contact-email">Email Address <span className="text-red-500">*</span></Label>
          <Input
            id="contact-email"
            type="email"
            placeholder="john@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="h-11"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="contact-subject">Subject</Label>
        <Input
          id="contact-subject"
          placeholder="e.g., Bug report, Feature request, General question..."
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="h-11"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="contact-message">Message <span className="text-red-500">*</span></Label>
        <Textarea
          id="contact-message"
          placeholder="Describe your question or issue in detail..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          className="min-h-[140px] resize-y"
        />
      </div>

      <Button
        type="submit"
        size="lg"
        disabled={isSubmitting}
        className="w-full gap-2 bg-gradient-to-r from-violet-600 to-indigo-600 text-white hover:opacity-90"
      >
        <Send className="h-4 w-4" />
        {isSubmitting ? "Preparing..." : "Send Message"}
      </Button>

      <p className="text-xs text-center text-muted-foreground">
        We typically reply within 24 hours.
      </p>
    </form>
  );
}
