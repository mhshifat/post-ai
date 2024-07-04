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
        {children}
      </Providers>
    </ClerkProvider>
  );
}
