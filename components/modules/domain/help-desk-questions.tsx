"use client";

import NotFound from "@/components/shared/not-found";
import Accordion from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { IQuestion } from "@/utils/types";

interface HelpDeskQuestionsProps {
  className?: string;
  questions: Partial<IQuestion>[];
}

export default function HelpDeskQuestions({ className, questions }: HelpDeskQuestionsProps) {
  if (!questions.length) return <NotFound />;
  return (
    <Accordion className={cn("pt-10 empty:hidden", className)}>
      {questions.map(q => (
        <Accordion.Item key={q.id}>
          <Accordion.Trigger className="py-2">
            <h3 className="text-lg text-foreground font-medium">{q.question}</h3>
          </Accordion.Trigger>
          <Accordion.Content>
            <p className="text-xs font-medium text-foreground/50">{q.answer}</p>
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion>
  )
}