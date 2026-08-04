"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQ {
  question: string;
  answer: string;
}

interface ToolFAQProps {
  faqs: FAQ[];
  className?: string;
}

export function ToolFAQ({ faqs, className = "" }: ToolFAQProps) {
  return (
    <div className={className}>
      <h2 className="mb-6 text-2xl font-bold">Frequently Asked Questions</h2>
      <Accordion defaultValue={[]} className="w-full">
        {faqs.map((faq, i) => (
          <AccordionItem key={i} value={`faq-${i}`}>
            <AccordionTrigger className="text-left text-base">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground leading-relaxed">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
