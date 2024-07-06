import HelpDeskQuestions from "../domain/help-desk-questions";

interface ChatHelpDeskProps {}

export default function ChatHelpDesk({}: ChatHelpDeskProps) {
  return (
    <div className="w-full h-full">
      <HelpDeskQuestions className="py-2 px-3 h-full" />
    </div>
  )
}