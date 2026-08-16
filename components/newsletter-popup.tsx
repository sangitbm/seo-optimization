"use client";

import { useState, useEffect } from "react";
import { Mail } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const NEWSLETTER_KEY = "seoutilities_newsletter_dismissed";

export function NewsletterPopup() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Check if user has already dismissed or subscribed
    const isDismissed = localStorage.getItem(NEWSLETTER_KEY);
    
    if (!isDismissed) {
      // Show popup after 5 seconds
      const timer = setTimeout(() => {
        setOpen(true);
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setOpen(false);
    localStorage.setItem(NEWSLETTER_KEY, "true");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);

    // Simulate API request
    await new Promise(resolve => setTimeout(resolve, 800));

    // Here you would typically send the email to your backend or ESP (e.g., Mailchimp, Resend)
    console.log("Subscribed:", email);

    setIsSubmitting(false);
    toast.success("Thanks for subscribing! We'll be in touch.");
    handleClose();
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
      if (!isOpen) handleClose();
    }}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-center sm:text-center flex flex-col items-center gap-2 pt-4">
          <div className="bg-primary/10 p-3 rounded-full mb-2">
            <Mail className="h-6 w-6 text-primary" />
          </div>
          <DialogTitle className="text-2xl font-bold">Stay Updated!</DialogTitle>
          <DialogDescription className="text-base">
            Subscribe to our newsletter to get the latest SEO tools, tips, and updates delivered straight to your inbox.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 py-4">
          <div className="flex flex-col gap-2">
            <Input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="h-12"
            />
          </div>
          <Button 
            type="submit" 
            size="lg" 
            className="w-full font-semibold"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Subscribing..." : "Subscribe Now"}
          </Button>
          <p className="text-xs text-center text-muted-foreground mt-2">
            No spam, ever. You can unsubscribe at any time.
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
}
