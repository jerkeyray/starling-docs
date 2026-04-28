import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { homeOptions } from '@/lib/layout.shared';

export default function Layout({ children }: LayoutProps<'/'>) {
  // Force the landing into dark mode regardless of the user's site-wide theme.
  // The .dark class scopes Fumadocs' CSS variables to this subtree;
  // colorScheme:'dark' tells the browser to use dark scrollbars/form controls;
  // min-h-screen ensures the dark background covers the full viewport even
  // when content is shorter, so light html bg can't bleed through.
  return (
    <div
      className="dark flex min-h-screen flex-col bg-fd-background text-fd-foreground"
      style={{ colorScheme: 'dark' }}
    >
      <HomeLayout {...homeOptions()}>{children}</HomeLayout>
    </div>
  );
}
