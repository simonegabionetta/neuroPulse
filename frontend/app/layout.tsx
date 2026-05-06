import type { Metadata } from "next";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://neuropulse.com.br";
const siteName = "NeuroPulse";
const title = "NeuroPulse | Saude mental corporativa preventiva";
const description =
  "Plataforma de saude mental corporativa para identificar sinais de burnout antes que virem afastamentos.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: siteName,
  title,
  description,
  keywords: [
    "saude mental corporativa",
    "burnout",
    "bem-estar no trabalho",
    "bem-estar corporativo",
    "prevencao de burnout",
    "absenteismo",
    "people analytics",
    "RH",
    "NeuroPulse",
  ],
  authors: [{ name: siteName }],
  creator: siteName,
  publisher: siteName,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title,
    description:
      "Acompanhe sinais de bem-estar e risco emocional com dados agregados, anonimos e acionaveis.",
    url: "/",
    siteName,
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "/hero-image.png",
        width: 1200,
        height: 630,
        alt: "NeuroPulse",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: "Dados agregados para apoiar RH e liderancas antes do burnout.",
    images: ["/hero-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <body className="bg-background text-foreground antialiased">
        {children}
        <GoogleAnalytics measurementId={process.env.NEXT_PUBLIC_GA_ID} />
      </body>
    </html>
  );
}
