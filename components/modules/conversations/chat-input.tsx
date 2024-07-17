"use client";

import Spinner from "@/components/shared/spinner";
import { cn } from "@/lib/utils";
import { useRef, useState } from "react";

interface ChatInputProps {
  className?: string;
}

export default function ChatInput({ className }: ChatInputProps) {
  const inputRef = useRef<HTMLInputElement| null>(null);
  const [loading, setLoading] = useState(false);

  function handleSubmit() {}
  return (
    <div className={cn("mt-auto py-8 px-8 bg-background", className)}>
      <form onSubmit={handleSubmit} className="border border-border bg-foreground/10 min-h-[52px] rounded-full overflow-hidden relative flex">
        <input ref={inputRef} placeholder="Type you message..." type="text" name="content" className="w-full h-auto border-none outline-none bg-transparent px-8 pr-16" />
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