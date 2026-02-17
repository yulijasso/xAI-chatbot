import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Grok AI Chatbot",
  description: "Chat with Grok, powered by xAI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
