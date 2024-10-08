import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});
export const metadata: Metadata = {
  title: "Document Editor",
  description:
    "Made with Clerk, Next.js, and Supabase, using TipTap for the editor",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang='en'>
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased flex flex-col items-center",
            fontSans.variable
          )}
        >
          {children}
          <Toaster position='bottom-right' />
        </body>
      </html>
    </ClerkProvider>
  );
}
