import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Agri-Smart | Farm-to-Fork Intelligence Platform",
  description:
    "Empowering farmers with direct market access, AI-driven crop health analysis, smart advisory, and transparent traceability — eliminating middlemen and maximizing yields.",
  keywords: [
    "agriculture",
    "farming",
    "marketplace",
    "crop health",
    "AI farming",
    "farm to table",
    "agritech",
    "smart farming",
  ],
  openGraph: {
    title: "Agri-Smart | Farm-to-Fork Intelligence Platform",
    description:
      "Direct marketplace, AI crop doctor, smart advisory & traceability for modern agriculture.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${plusJakarta.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
