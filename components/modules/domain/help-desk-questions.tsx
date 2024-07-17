"use client";

import Accordion from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

interface HelpDeskQuestionsProps {
  className?: string;
}

export default function HelpDeskQuestions({ className }: HelpDeskQuestionsProps) {
  return (
    <Accordion className={cn("pt-10", className)}>
      <Accordion.Item>
        <Accordion.Trigger className="py-2">
          <h3 className="text-base text-foreground font-semibold">Question?</h3>
        </Accordion.Trigger>
        <Accordion.Content>
          <p className="text-sm font-semibold text-foreground/50">Answer....</p>
        </Accordion.Content>
      </Accordion.Item>
      <Accordion.Item>
        <Accordion.Trigger className="py-2">
          <h3 className="text-base text-foreground font-semibold">Question 1?</h3>
        </Accordion.Trigger>
        <Accordion.Content>
          <p className="text-sm font-semibold text-foreground/50">Answer 1....</p>
        </Accordion.Content>
      </Accordion.Item>
    </Accordion>
  )
}