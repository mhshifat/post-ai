"use client";

import Section from "@/components/shared/section";
import { Button } from "@/components/ui/button";
import { CopyIcon } from "lucide-react";
import { useMemo } from "react";
import { toast } from "sonner";

export default function CopySnippet() {
  const snippet = useMemo(() => {
    if (typeof window === 'undefined') return;
    return `
      <script defer>
        document.addEventListener("DOMContentLoaded", () => {
          const iframe = document.createElement("iframe");
          const style = document.createElement("style");
          style.textContent = "
            .chat-frame {
              position: fixed;
              bottom: 20px;
              right: 20px;
              border: none;
              z-index: 99;
            }
          ";
          iframe.classList.add("chat-frame");
          iframe.src = "${window.location.origin}/chatbot";
          document.head.appendChild(style);
          document.body.appendChild(iframe);

          window.addEventListener("message", (e) => {
            const ROOT_ORIGIN = "${window.location.origin}";
            if (e.origin !== ROOT_ORIGIN) return;
            const { width, height } = JSON.parse(e.data || "{}");
            iframe.style.maxWidth = width;
            iframe.style.width = "100%";
            iframe.style.maxHeight = height;
            iframe.style.height = "100%";
          });
        });
      </script>
    `;
  }, []);

  function handleClick() {
    if (!snippet) return;
    navigator.clipboard.writeText(snippet);
    toast.success("Successfully copied!");
  }
  return (
    <Section>
      <Section.Header className="flex items-start justify-between gap-5 px-5 py-2">
        <div>
          <h3 className="text-base capitalize font-medium text-balance">Code Snippet</h3>
          <p className="text-sm font-normal text-balance text-slate-500">Copy and paste this snippet into the header tag of your website</p>
        </div>

        <div>
          <Button onClick={handleClick} className="p-0 h-max" variant="ghost">
            <CopyIcon className="size-4 text-slate-500" />
          </Button>
        </div>
      </Section.Header>
      <Section.Content className="flex flex-col px-5 py-2">
        <pre>
          <code className="text-slate-500">{snippet}</code>
        </pre>
      </Section.Content>
    </Section>
  )
}