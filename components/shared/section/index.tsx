import { PropsWithChildren } from "react";
import SectionHeader from "./section-header";
import SectionContent from "./section-content";

export default function Section({ children }: PropsWithChildren) {
  return (
    <div className="bg-slate-100 w-full p-1 rounded-2xl">
      {children}
    </div>
  )
}

Section.Header = SectionHeader;
Section.Content = SectionContent;