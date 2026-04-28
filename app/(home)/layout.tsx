import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { homeOptions } from '@/lib/layout.shared';

export default function Layout({ children }: LayoutProps<'/'>) {
  // Force the landing into dark mode regardless of user theme.
  // The .dark class scopes Fumadocs' CSS variables to this subtree.
  return (
    <div className="dark bg-fd-background">
      <HomeLayout {...homeOptions()}>{children}</HomeLayout>
    </div>
  );
}
