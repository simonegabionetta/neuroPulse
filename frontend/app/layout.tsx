import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NeuroPulse | Saúde mental corporativa preventiva",
  description:
    "Plataforma de saúde mental corporativa para identificar sinais de risco antes que virem afastamentos.",
  keywords: [
    "saúde mental corporativa",
    "burnout",
    "bem-estar no trabalho",
    "RH",
    "NeuroPulse",
  ],
  authors: [{ name: "NeuroPulse" }],
  openGraph: {
    title: "NeuroPulse | Saúde mental corporativa preventiva",
    description:
      "Acompanhe sinais de bem-estar e risco emocional com dados agregados, anônimos e acionáveis.",
    url: "https://neuropulse.local",
    siteName: "NeuroPulse",
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
    title: "NeuroPulse | Saúde mental corporativa preventiva",
    description: "Dados agregados para apoiar RH e lideranças antes do burnout.",
    images: ["/hero-image.png"],
  },
  robots: {
    index: true,
    follow: true,
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
      </body>
    </html>
  );
}
