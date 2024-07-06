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
          <h3>Question?</h3>
        </Accordion.Trigger>
        <Accordion.Content>
          <p>Answer....</p>
        </Accordion.Content>
      </Accordion.Item>
      <Accordion.Item>
        <Accordion.Trigger className="py-2">
          <h3>Question 1?</h3>
        </Accordion.Trigger>
        <Accordion.Content>
          <p>Answer 1....</p>
        </Accordion.Content>
      </Accordion.Item>
    </Accordion>
  )
}