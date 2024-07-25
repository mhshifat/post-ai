import Providers from "@/components/providers";
import { Toaster } from "@/components/ui/sonner";
import { ClerkProvider } from "@clerk/nextjs";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <Toaster />
      <Providers>
        <div className="bg-background text-foreground w-full h-full flex-1">
          {children}
        </div>
      </Providers>
    </ClerkProvider>
  );
}
