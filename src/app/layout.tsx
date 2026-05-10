import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ground Pros Inc. | Commercial Landscape Management | Chicagoland",
  description:
    "Ground Pros Inc. provides premier commercial landscape management services in the Chicagoland area. 25+ years of landscaping excellence, creative solutions, and quality craftsmanship.",
  keywords: [
    "commercial landscaping",
    "landscape management",
    "Chicagoland",
    "Itasca IL",
    "snow removal",
    "lawn care",
    "Ground Pros",
  ],
  openGraph: {
    title: "Ground Pros Inc. | Commercial Landscape Management",
    description:
      "Chicagoland's premier commercial landscape partner. 25+ years of excellence.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased scroll-smooth">
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
