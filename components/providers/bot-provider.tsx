"use client";

import { createCustomer, upsertCustomer } from "@/actions/customers";
import { getDomainDetails } from "@/actions/domains";
import { getFaqs } from "@/actions/faqs";
import { createMessage, getThreadMessages } from "@/actions/messages";
import { getThreadDetails } from "@/actions/threads";
import { pusherClient } from "@/lib/pusher";
import { IDomain, IMessage, IFaq } from "@/utils/types";
import { createContext, PropsWithChildren, useCallback, useContext, useEffect, useState } from "react"
import { v4 } from "uuid";

interface BotProviderProps {
  domainId: string | null;
  threadId?: string | null;
  customerId?: string | null;
  type: "CHAT_BOT" | "CUSTOMER_MESSAGES_WINDOW";
}

interface BotCtxProps extends BotProviderProps {
  questions: IFaq[];
  filterQuestions: IFaq[];
  messages: Partial<IMessage>[];
  domainDetails: IDomain | null;
  isLive: boolean;
  addMessage: (content: string) => Promise<void>;
  generateBotResponse: (message: Partial<IMessage>) => Promise<{
    message: string;
    saveCustomer?: boolean;
    questionId?: string
  }>;
  addingRespondingAnimation: (callback: (animationMessageId: string) => void) => void;
  updateMessage: (id: string, message: Partial<IMessage>) => void;
  chatConfig: {
    domainId: string | null;
    threadId: string | null | undefined;
    customerId: string | null | undefined;
    senderId: string;
    recipientId: string;
  }
}

const BotCtx = createContext<BotCtxProps | null>(null);

let steps = -2;
export default function BotProvider({ children, type, domainId: domainIdProp, threadId: threadIdProp, customerId: customerIdProp }: PropsWithChildren<BotProviderProps>) {
  const [questions, setQuestions] = useState<IFaq[]>([]);
  const [filterQuestions, setFilterQuestions] = useState<IFaq[]>([]);
  const [messages, setMessages] = useState<Partial<IMessage>[]>([]);
  const [domainDetails, setDomainDetails] = useState<IDomain | null>(null);
  const [isLive, setIsLive] = useState(false);
  const [chatConfig, setChatConfig] = useState({
    domainId: domainIdProp,
    threadId: threadIdProp,
    customerId: customerIdProp,
    senderId: "",
    recipientId: "",
  });

  const addMessage = useCallback(async (content: string) => {
    if (!chatConfig.senderId || !chatConfig.recipientId) return setMessages(values => [
      {
        id: v4(),
        content: "Something went wrong, please try again later",
        recipientId: "bot",
        senderId: "customer"
      },
      ...values
    ]);
    const createMessagePayload = {
      content,
      threadId: chatConfig.threadId as string,
      senderId: chatConfig.senderId,
      recipientId: chatConfig.recipientId,
      domainId: chatConfig.domainId as string,
    }
    setMessages((values) => [
      {
        ...createMessagePayload,
        id: v4()
      },
      ...values,
    ]);
    if (type === "CHAT_BOT") {
      const createdCustomer = await upsertCustomer({
        email: "",
        id: chatConfig.customerId as string,
        domainId: chatConfig.domainId as string
      });
      localStorage.setItem("CUSTOMER", JSON.stringify({
        email: createdCustomer?.email,
        id: createdCustomer?.id,
      }));
    }
    const createdMessage = await createMessage({
      ...createMessagePayload,
    });
    localStorage.setItem("THREAD_ID", createdMessage.threadId);
    // TODO: send typing message to owner if isLive is true
    // Test the message and show the messages and confirm messages shows up on both side
    console.log({ chatConfig, content, isLive });
  }, [
    chatConfig,
    isLive,
    type,
    messages.length
  ]);

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

  // useEffect(() => {
  //   if (!domainIdProp) return;
  //   const threadId = threadIdProp || localStorage.getItem("THREAD_ID");
  //   if (threadId) {
  //     getThreadDetails(threadId)
  //       .then((data) => {
  //         setIsLive(data?.isLive || false);
  //       })
  //     getThreadMessages(threadId)
  //       .then((data) => {
  //         if (!data?.length && !threadIdProp) {
  //           localStorage.removeItem("CUSTOMER_EMAIL");
  //           localStorage.removeItem("THREAD_ID");
  //           localStorage.removeItem("CUSTOMER_ID");
  //           return;
  //         }
  //         setMessages(data as IMessage[]);
  //       })
  //   }
  //   getDomainDetails(domainIdProp)
  //     .then((data) => {
  //       setDomainDetails(data as unknown as IDomain);
  //       if (!threadId && !threadIdProp) setMessages([
  //         {
  //           id: "1",
  //           senderId: "bot",
  //           recipientId: domainIdProp,
  //           content: data?.bot?.welcomeText || "Hello, How may I help you?",
  //           createdAt: new Date()
  //         }
  //       ]);
  //     });
  //   getFaqs(domainIdProp)
  //     .then((data) => {
  //       setQuestions(data as unknown as IFaq[]);
  //     });
  //   // TODO: implement ai chat assistant 
  //   // getUnansweredFilterQuestions(domainId)
  //   //   .then((data) => {
  //   //     setFilterQuestions(data as unknown as IFaq[]);
  //   //   });
  // }, [domainIdProp, threadIdProp])

  // useEffect(() => {
  //   const threadId = threadIdProp || localStorage.getItem("THREAD_ID");
  //   if (!threadId) return;
  //   const channel = pusherClient.subscribe(threadId!);
  //   channel.unbind("switch-live-mode");
  //   channel.bind("switch-live-mode", ({ checked }: { checked: boolean }) => {
  //     setIsLive(checked);
  //   })
  //   channel.unbind("new-message");
  //   channel.bind("new-message", ({ data }: { data: IMessage }) => {
  //     setMessages((values) => [data, ...values]);
  //   })
  //   return () => {
  //     channel.unsubscribe();
  //   }
  // }, [threadIdProp]);

  // Initiate new thread
  useEffect(() => {
    const domainId = domainIdProp;
    if (!domainId) return;
    let threadId = threadIdProp;
    getDomainDetails(domainIdProp)
      .then((data) => {
        setDomainDetails(data as unknown as IDomain);
        setMessages([
          {
            id: "1",
            senderId: "bot",
            recipientId: domainIdProp,
            content: data?.bot?.welcomeText || "Hello, How may I help you?",
            createdAt: new Date()
          }
        ]);
      });
    let customerId = customerIdProp;
    if (!customerId) customerId = v4();
    const storageCustomerData = localStorage.getItem("CUSTOMER");
    if ((threadIdProp && customerIdProp) || storageCustomerData) {
      const { id } = customerIdProp ? { id: customerIdProp } : JSON.parse(storageCustomerData || "{}");
      if (id) customerId = id as string;
      const storageThreadId = threadIdProp ? threadIdProp : localStorage.getItem("THREAD_ID");
      threadId = storageThreadId as string;
      getThreadMessages(storageThreadId as string)
        .then((data) => {
          setMessages(values => [
            ...data as IMessage[],
            ...values,
          ]);
        })
    }
    
    setChatConfig(() => ({
      domainId,
      customerId: customerId,
      threadId: threadId || v4(),
      senderId: type === "CHAT_BOT" ? customerId : domainId,
      recipientId: type === "CHAT_BOT" ? domainId : customerId,
    }));
  }, [
    threadIdProp,
    customerIdProp,
    domainIdProp,
    type
  ]);

  useEffect(() => {
    if (!domainIdProp) return;
    const channel = pusherClient.subscribe(domainIdProp);
    channel.unbind(`new-message-initiated:::::${chatConfig.threadId}`);
    channel.unbind(`new-message-typing-ended:::::${chatConfig.threadId}`);
    channel.unbind(`new-message-sent:::::${chatConfig.threadId}`);
    channel.unbind(`live-mode-status:::::${chatConfig.threadId}`);

    channel.bind(`live-mode-status:::::${chatConfig.threadId}`, (data: { checked: boolean }) => {
      setIsLive(data.checked);
    });
    channel.bind(`new-message-typing-ended:::::${chatConfig.threadId}`, (data: IMessage) => {
      if (chatConfig.senderId === data.recipientId) {
        setMessages(values => values.filter(m => m.content !== "..."));
      }
    });
    channel.bind(`new-message-initiated:::::${chatConfig.threadId}`, (data: IMessage) => {
      if (chatConfig.senderId === data.recipientId) {
        setMessages((values) => values.find(v => v.content === "...") ? values : [
          data,
          ...values
        ]);
      }
    });
    channel.bind(`new-message-sent:::::${chatConfig.threadId}`, (data: IMessage) => {
      if ((chatConfig.senderId === data.recipientId)) {
        setMessages((values) => values.map(v => v.content === "..." ? data : v));
      }
    });

    return () => {
      channel.unsubscribe();
    }
  }, [
    domainIdProp,
    type,
    chatConfig,
    isLive
  ]);

  return (
    <BotCtx.Provider value={{
      type,
      domainId: domainIdProp,
      customerId: customerIdProp,
      messages,
      domainDetails,
      isLive,
      questions,
      addMessage,
      generateBotResponse,
      addingRespondingAnimation,
      updateMessage,
      filterQuestions,
      threadId: threadIdProp || localStorage.getItem("THREAD_ID"),
      chatConfig
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