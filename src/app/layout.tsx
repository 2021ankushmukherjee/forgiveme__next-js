import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "I Am Sorry, My Love",
  description: "A tiny apology website made with a very big heart.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
