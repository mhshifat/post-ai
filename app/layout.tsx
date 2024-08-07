import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { upsertStripeSubscriptionProducts } from "@/actions/stripe";
import { plans } from "@/utils/constants";
import ThemeProvider from "@/components/providers/theme-provider";
import LoaderProvider from "@/components/providers/loader-provider";
import { Toaster } from "@/components/ui/sonner";
import ConfigProvider from "@/components/providers/config-provider";

const inter = Inter({ subsets: ["latin"], fallback: ["sans-serif"] });

export const metadata: Metadata = {
  title: "Post AI",
  description: "An AI powered chat bot",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await upsertStripeSubscriptionProducts(plans.map(plan => ({
    name: plan.title,
    price: plan.price,
  })));

  const envs = {
    TEST_MODE: process.env.TEST_MODE === "true"
  }

  return (
    <html lang="en">
      <body className={`${inter.className} h-screen bg-transparent`}>
        <Toaster />
        <ConfigProvider
          envs={envs}
        >
          <LoaderProvider>
            <ThemeProvider>
              {children}
            </ThemeProvider>
          </LoaderProvider>
        </ConfigProvider>
      </body>
    </html>
  );
}
