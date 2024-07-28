"use client";

import { getDomainDetails } from "@/actions/domains";
import { getFaqs } from "@/actions/faqs";
import { getThreadMessages } from "@/actions/messages";
import { getThreadDetails } from "@/actions/threads";
import { pusherClient } from "@/lib/pusher";
import { IDomain, IMessage, IFaq } from "@/utils/types";
import { createContext, PropsWithChildren, useCallback, useContext, useEffect, useState } from "react"

interface BotProviderProps {
  domainId: string | null;
  threadId: string | null;
}

interface BotCtxProps extends BotProviderProps {
  questions: IFaq[];
  filterQuestions: IFaq[];
  messages: Partial<IMessage>[];
  domainDetails: IDomain | null;
  isLive: boolean;
  addMessage: (message: Partial<IMessage>) => void;
  generateBotResponse: (message: Partial<IMessage>) => Promise<{
    message: string;
    saveCustomer?: boolean;
    questionId?: string
  }>;
  addingRespondingAnimation: (callback: (animationMessageId: string) => void) => void;
  updateMessage: (id: string, message: Partial<IMessage>) => void;
}

const BotCtx = createContext<BotCtxProps | null>(null);

let steps = -2;
export default function BotProvider({ children, domainId, threadId: threadIdProp }: PropsWithChildren<BotProviderProps>) {
  const [questions, setQuestions] = useState<IFaq[]>([]);
  const [filterQuestions, setFilterQuestions] = useState<IFaq[]>([]);
  const [messages, setMessages] = useState<Partial<IMessage>[]>([]);
  const [domainDetails, setDomainDetails] = useState<IDomain | null>(null);
  const [isLive, setIsLive] = useState(false);

  const addMessage = useCallback((message: Partial<IMessage>) => {
    const customerId = localStorage.removeItem("CUSTOMER_ID");
    // TODO: customerId is undefined
    setMessages(values => [
      {
        ...message,
        content: message?.content?.includes("[[[CUSTOMER_ID]]]") ? message.content.replace("[[[CUSTOMER_ID]]]", customerId!) : message.content,
        id: message.id  || String(values.length + 1)
      },
      ...values,
    ]);
  }, []);

  const updateMessage = useCallback((id: string, message: Partial<IMessage>) => {
    setMessages(values => values.map(item => item.id === id ? message : item));
  }, []);

  const generateBotResponse = useCallback(async (message: Partial<IMessage>) => {
    steps++;
    if (steps>=0) {
      const question = filterQuestions[steps];
      if (!question) return {
        message: "Please provide your email address and our agent will be with you in a moment",
        saveCustomer: true
      }
      return {
        message: question.question,
        questionId: question.id
      };
    }
    // TODO: Add ai
    return {
      message: "Please help us with some information to resolve the issue, I will need you to answer some of my question."
    }
  }, [filterQuestions]);

  const addingRespondingAnimation = useCallback((callback: (animationMessageId: string) => void) => {
    setMessages(values => {
      const newMessageId = String(values.length + 1);
      callback?.(newMessageId);
      return [
        {
          id: newMessageId,
          content: "...",
          recipientId: "customer",
          senderId: "bot"
        },
        ...values,
      ]
    });
  }, []);

  useEffect(() => {
    if (!domainId) return;
    const threadId = threadIdProp || localStorage.getItem("THREAD_ID");
    if (threadId) {
      getThreadDetails(threadId)
        .then((data) => {
          setIsLive(data?.isLive || false);
        })
      getThreadMessages(threadId)
        .then((data) => {
          if (!data?.length && !threadIdProp) {
            localStorage.removeItem("CUSTOMER_EMAIL");
            localStorage.removeItem("THREAD_ID");
            localStorage.removeItem("CUSTOMER_ID");
            return;
          }
          setMessages(data as IMessage[]);
        })
    }
    getDomainDetails(domainId)
      .then((data) => {
        setDomainDetails(data as unknown as IDomain);
        if (!threadId && !threadIdProp) setMessages([
          {
            id: "1",
            senderId: "bot",
            recipientId: domainId,
            content: data?.bot?.welcomeText || "Hello, How may I help you?",
            createdAt: new Date()
          }
        ]);
      });
    getFaqs(domainId)
      .then((data) => {
        setQuestions(data as unknown as IFaq[]);
      });
    // TODO: implement ai chat assistant 
    // getUnansweredFilterQuestions(domainId)
    //   .then((data) => {
    //     setFilterQuestions(data as unknown as IFaq[]);
    //   });
  }, [domainId, threadIdProp])

  useEffect(() => {
    const threadId = threadIdProp || localStorage.getItem("THREAD_ID");
    if (!threadId) return;
    const channel = pusherClient.subscribe(threadId!);
    channel.unbind("switch-live-mode");
    channel.bind("switch-live-mode", ({ checked }: { checked: boolean }) => {
      setIsLive(checked);
    })
    channel.unbind("new-message");
    channel.bind("new-message", ({ data }: { data: IMessage }) => {
      setMessages((values) => [data, ...values]);
    })
    return () => {
      channel.unsubscribe();
    }
  }, [threadIdProp]);

  return (
    <BotCtx.Provider value={{
      domainId,
      messages,
      domainDetails,
      isLive,
      questions,
      addMessage,
      generateBotResponse,
      addingRespondingAnimation,
      updateMessage,
      filterQuestions,
      threadId: threadIdProp || localStorage.getItem("THREAD_ID")
    }}>
      {children}
    </BotCtx.Provider>
  )
}

export function useBot() {
  const res = useContext(BotCtx);
  if (!res) throw new Error("Component needs to wrapped with BotProvider");
  return res;
}