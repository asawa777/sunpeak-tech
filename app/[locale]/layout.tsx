import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { getMessages, setRequestLocale } from 'next-intl/server';

const inter = Inter({ subsets: ["latin"] });

const baseUrl = process.env.NEXT_PUBLIC_APP_URL ? new URL(process.env.NEXT_PUBLIC_APP_URL) : new URL('https://www.sunpeak.tech');

export const metadata: Metadata = {
  metadataBase: baseUrl,
  title: {
    default: "Sunpeak Tech",
    template: "%s | Sunpeak Tech"
  },
  description: "Advanced IT Solutions & Services for the modern enterprise.",
  openGraph: {
    title: "Sunpeak Tech",
    description: "Advanced IT Solutions & Services. Digital Infrastructure for the Future.",
    url: '/',
    siteName: 'Sunpeak Tech',
    images: [
      {
        url: '/images/og/og-home.jpg',
        width: 1200,
        height: 630,
        alt: 'Sunpeak Tech Digital Infrastructure'
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sunpeak Tech',
    description: 'Advanced IT Solutions & Services',
    images: ['/images/og/og-home.jpg'],
  },
  manifest: '/manifest.json',
};

export function generateStaticParams() {
  return [
    {locale: 'en'},
    {locale: 'th'}
  ];
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  
  // Enable static rendering
  setRequestLocale(locale);

  let messages;
  try {
     messages = await getMessages();
  } catch (error) {
    console.error("Message loading error:", error);
    notFound();
  }

  return (
    <html lang={locale}>
      <body className={`${inter.className} antialiased`}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
