"use client";

import NotFound from "@/components/shared/not-found";
import Accordion from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { IFaq } from "@/utils/types";

interface HelpDeskQuestionsProps {
  className?: string;
  questions: Partial<IFaq>[];
}

export default function HelpDeskQuestions({ className, questions }: HelpDeskQuestionsProps) {
  if (!questions.length) return <NotFound />;
  return (
    <Accordion className={cn("pt-10 empty:hidden", className)}>
      {questions.map(q => (
        <Accordion.Item key={q.id}>
          <Accordion.Trigger className="py-2">
            <h3 className="text-base text-foreground font-medium">{q.question}</h3>
          </Accordion.Trigger>
          <Accordion.Content>
            <p className="text-sm font-medium text-foreground/50">{q.answer}</p>
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion>
  )
}