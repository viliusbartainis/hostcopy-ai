import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HostCopy AI — AI Airbnb & Booking.com Listing Descriptions",
  description: "Generate professional, SEO-friendly short-term rental listing descriptions in 30 seconds with AI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
