"use client";

import Accordion from "@/components/ui/accordion";

export default function HelpDeskQuestions() {
  return (
    <Accordion className="pt-10">
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