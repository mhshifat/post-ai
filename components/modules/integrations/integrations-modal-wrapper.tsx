import LogoIcon from "@/components/shared/logo-icon";
import Divider from "@/components/ui/divider";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import { PropsWithChildren } from "react";

interface IntegrationsModalWrapperProps {
  logo: string;
  title: string;
  description: string;
}

export default function IntegrationsModalWrapper({ children, logo, title, description }: PropsWithChildren<IntegrationsModalWrapperProps>) {
  return (
    <div className="w-full">
      <div className="flex flex-col justify-center items-center">
        <div className="flex items-center gap-10">
          <LogoIcon size={50} />
          <span className="flex flex-col gap-1">
            <ArrowLeft className="size-4 text-foreground/50" />
            <ArrowRight className="size-4 text-foreground/50" />
          </span>
          <Image
            src={logo}
            alt="stripe logo"
            width={50}
            height={50}
            className="rounded-lg"
          />
        </div>
        <h3 className="text-lg font-medium text-center mt-5 text-foreground">{title}</h3>
        <p className="text-sm font-medium text-foreground/50 text-center max-w-[88%] mt-1">{description}</p>
      </div>
      <Divider className="my-3" />
      {children}
    </div>
  )
}