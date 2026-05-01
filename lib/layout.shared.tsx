import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { appName, gitConfig } from './shared';

const repoURL = `https://github.com/${gitConfig.user}/${gitConfig.repo}`;

function GithubMark({ className = 'size-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.9.58.11.79-.25.79-.56v-2c-3.2.7-3.87-1.36-3.87-1.36-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.68 1.25 3.34.96.1-.74.4-1.25.73-1.54-2.55-.29-5.24-1.27-5.24-5.66 0-1.25.45-2.27 1.18-3.07-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.15 1.18a10.95 10.95 0 0 1 5.74 0c2.18-1.49 3.14-1.18 3.14-1.18.62 1.58.23 2.75.11 3.04.74.8 1.18 1.82 1.18 3.07 0 4.4-2.69 5.36-5.25 5.65.41.36.78 1.07.78 2.16v3.21c0 .31.21.68.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  );
}

function StarlingLogo({ className = 'size-5' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="#22d3ee"
      strokeWidth="3"
      strokeLinecap="square"
      strokeLinejoin="miter"
      aria-hidden="true"
      className={className}
    >
      <path d="M3 12a9 9 0 1 0 3-6.7" />
      <polyline points="3 3 3 8 8 8" />
    </svg>
  );
}

const navTitle = (
  <span className="inline-flex items-center gap-2 font-semibold">
    <StarlingLogo className="size-5" />
    starling
  </span>
);

export function baseOptions(): BaseLayoutProps {
  return {
    nav: { title: navTitle, url: '/' },
    githubUrl: repoURL,
  };
}

export function homeOptions(): BaseLayoutProps {
  return {
    nav: { title: navTitle, url: '/' },
    searchToggle: { enabled: false },
    themeSwitch: { enabled: false },
    links: [
      { type: 'main', text: 'why starling', url: '/why-starling' },
      { type: 'main', text: 'docs', url: '/docs', active: 'nested-url' },
      {
        type: 'custom',
        secondary: true,
        children: (
          <a
            href={repoURL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-fd-muted-foreground"
          >
            <GithubMark className="size-4" />
            github
          </a>
        ),
      },
    ],
  };
}
