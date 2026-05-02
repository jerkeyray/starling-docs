import { RootProvider } from 'fumadocs-ui/provider/next';
import './global.css';
import { Inter } from 'next/font/google';
import type { Metadata, Viewport } from 'next';

const inter = Inter({
  subsets: ['latin'],
});

const siteName = 'Starling';
const siteTitle = 'Starling · event-sourced agent runtime for Go';
const siteDescription =
  'A Go runtime for LLM agents where every run is recorded as a hash-chained event log. Replayable, auditable, cost-enforceable.';

export const metadata: Metadata = {
  metadataBase: new URL('https://starling.jerkeyray.com'),
  title: {
    default: siteTitle,
    template: '%s · Starling',
  },
  description: siteDescription,
  applicationName: siteName,
  keywords: [
    'starling',
    'go agent runtime',
    'llm agent',
    'event sourcing',
    'replay',
    'audit log',
    'agent framework',
    'temporal-style determinism',
    'mcp tools',
    'observable agents',
  ],
  authors: [{ name: 'aditya srivastava', url: 'https://jerkeyray.com' }],
  creator: 'aditya srivastava',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    siteName,
    title: siteTitle,
    description: siteDescription,
    url: '/',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteTitle,
    description: siteDescription,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
};

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
