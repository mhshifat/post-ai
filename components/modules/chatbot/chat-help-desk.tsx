import { useBot } from "@/components/providers/bot-provider";
import HelpDeskQuestions from "../domain/help-desk-questions";

interface ChatHelpDeskProps {}

export default function ChatHelpDesk({}: ChatHelpDeskProps) {
  const { questions } = useBot();

  return (
    <div className="w-full h-full">
      <HelpDeskQuestions questions={questions} className="py-2 px-3 h-full" />
    </div>
  )
}