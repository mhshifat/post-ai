"use client";

import { createCustomer, updateCustomer } from "@/actions/customers";
import { bulkCreateMessages, createMessage } from "@/actions/messages";
import { createSurvey } from "@/actions/surveys";
import { createThread } from "@/actions/threads";
import { useBot } from "@/components/providers/bot-provider";
import Spinner from "@/components/shared/spinner";
import { cn } from "@/lib/utils";
import sleep from "@/utils/sleep";
import { FormEvent, useRef, useState } from "react";
import { v4 } from "uuid";

interface ChatInputProps {
  className?: string;
}

export default function ChatInput({ className }: ChatInputProps) {
  const { isLive, addMessage, domainId, threadId, generateBotResponse, addingRespondingAnimation, updateMessage, messages } = useBot();
  const inputRef = useRef<HTMLInputElement| null>(null);
  const [loading, setLoading] = useState(false);
  const [questionId, setQuestionId] = useState<string | null>(null);
  const [askingForEmail, setAskingForEmail] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const content = (e.target as unknown as { content: { value: string } }).content.value;
    if (inputRef.current) {
      inputRef.current.value = "";
      inputRef.current.focus();
    }
    if (content?.includes("product") || content?.includes("buy")) {
      addMessage({
        content: `${window.location.origin}/portal/${domainId}/payment/[[[CUSTOMER_ID]]]`,
        createdAt: new Date(),
        recipientId: "user",
        senderId: domainId!,
        threadId: threadId!
      });
    }
    if (content?.includes("appointment") || content?.includes("booking")) {
      addMessage({
        content: `${window.location.origin}/portal/${domainId}/appointment/[[[CUSTOMER_ID]]]`,
        createdAt: new Date(),
        recipientId: "user",
        senderId: domainId!,
        threadId: threadId!
      });
    }
    if (!isLive) {
      let customerId = localStorage.getItem("CUSTOMER_ID");
      let customerEmail = localStorage.getItem("CUSTOMER_EMAIL");
      if (!customerId) {
        const customer = await createCustomer({
          domainId: domainId!,
          email: `anonymous-${v4()}`
        });
        if (customer?.id) {
          localStorage.setItem("CUSTOMER_ID", customer?.id);
          localStorage.setItem("CUSTOMER_EMAIL", customer?.email);
          customerId = customer.id;
          customerEmail = customer.email;
        }
      }
      
      let threadId = localStorage.getItem("THREAD_ID");
      if (!threadId) {
        const newThread = await createThread({
          domainId: domainId!,
          title: customerEmail!
        });
        if (newThread) {
          threadId = newThread.id;
          localStorage.setItem("THREAD_ID", newThread.id);
        }
      }
      const payload = {
        id: "",
        content,
        recipientId: domainId!,
        senderId: customerId!,
        createdAt: new Date()
      }
      addMessage(payload);
      const animationId = await new Promise((res) => addingRespondingAnimation((animationId) => res(animationId))) as string;
      await sleep(5000);
      if (askingForEmail) {
        await updateCustomer({
          id: customerId!,
          email: content
        })
        // TODO: Send email to logged in user email
        const thankYouMessagePayload = {
          id: animationId,
          content: "Thank you for sharing your email with us, please wait a moment, our agent will be with you in a moment",
          recipientId: customerId!,
          senderId: domainId!,
          createdAt: new Date()
        }
        updateMessage(animationId, thankYouMessagePayload);
        if (threadId) {
          await bulkCreateMessages([
            ...messages.map(message => ({
              threadId: threadId!,
              recipientId: (message.recipientId === 'bot' ? domainId : message.recipientId === 'customer' ? customerId : message.recipientId)!,
              senderId: (message.senderId === 'bot' ? domainId : message.senderId === 'customer' ? customerId : message.senderId)!,
              content: message.content!,
              createdAt: message.createdAt!,
            })),
            {
              threadId: threadId!,
              recipientId: payload.recipientId,
              senderId: payload.senderId,
              content: payload.content!,
              createdAt: payload.createdAt!,
            },
            {
              threadId: threadId!,
              recipientId: thankYouMessagePayload.recipientId,
              senderId: thankYouMessagePayload.senderId,
              content: thankYouMessagePayload.content!,
              createdAt: thankYouMessagePayload.createdAt!,
            },
          ])
        }
        return;
      }
      if (questionId) await createSurvey({
        surveyQuestionId: questionId!,
        domainId: domainId!,
        customerId: customerId!,
        answer: content
      });
      const { message, saveCustomer, questionId: questionIdRes } = await generateBotResponse(payload);
      if (saveCustomer) setAskingForEmail(true);
      if (questionIdRes) setQuestionId(questionIdRes);
      else setQuestionId(null);
      updateMessage(animationId, {
        id: animationId,
        content: message,
        recipientId: domainId!,
        senderId: "bot",
        createdAt: new Date()
      });
    } else {
      // TODO: fix messaging system
      const message = await createMessage({
        content,
        createdAt: new Date(),
        recipientId: "user",
        senderId: domainId!,
        threadId: threadId!
      });
      if (message) {
        addMessage(message);
      }
    }
  }
  return (
    <div className={cn("mt-auto py-8 px-8 bg-background", className)}>
      <form onSubmit={handleSubmit} className="border border-border bg-foreground/10 min-h-[52px] rounded-full overflow-hidden relative flex">
        <input ref={inputRef} placeholder="Type you message..." type="text" name="content" className="w-full h-auto border-none outline-none bg-transparent px-8 pr-16 text-foreground" />
        <button disabled={loading} className="w-9 h-9 rounded-full absolute right-2 flex items-center justify-center top-1/2 -translate-y-1/2 bg-foreground/10" type="submit">
          {loading ? (
            <Spinner />
          ) : <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            fill="none"
            viewBox="0 0 32 32"
            className="icon-2xl"
          >
            <path
              fill="currentColor"
              className="text-foreground/50"
              fillRule="evenodd"
              d="M15.192 8.906a1.143 1.143 0 0 1 1.616 0l5.143 5.143a1.143 1.143 0 0 1-1.616 1.616l-3.192-3.192v9.813a1.143 1.143 0 0 1-2.286 0v-9.813l-3.192 3.192a1.143 1.143 0 1 1-1.616-1.616z"
              clipRule="evenodd"
            />
          </svg>}
        </button>
      </form>
    </div>
  )
}