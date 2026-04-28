import { RootProvider } from 'fumadocs-ui/provider/next';
import './global.css';
import { Inter } from 'next/font/google';
import type { Metadata } from 'next';

const inter = Inter({
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://jerkeyray.com'),
  title: {
    default: 'Starling · event-sourced agent runtime for Go',
    template: '%s · Starling',
  },
  description:
    'A Go runtime for LLM agents where every run is recorded as a hash-chained event log. Replayable, auditable, cost-enforceable.',
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
