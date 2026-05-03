import { docs } from 'collections/server';
import { loader } from 'fumadocs-core/source';
import { lucideIconsPlugin } from 'fumadocs-core/source/lucide-icons';
import { docsContentRoute, docsImageRoute, docsRoute } from './shared';

// See https://fumadocs.dev/docs/headless/source-api for more info
export const source = loader({
  baseUrl: docsRoute,
  source: docs.toFumadocsSource(),
  plugins: [lucideIconsPlugin()],
});

export function getPageImage(page: (typeof source)['$inferPage']) {
  const segments = [...page.slugs, 'image.png'];

  return {
    segments,
    url: `${docsImageRoute}/${segments.join('/')}`,
  };
}

export function getPageMarkdownUrl(page: (typeof source)['$inferPage']) {
  const segments = [...page.slugs, 'content.md'];

  return {
    segments,
    url: `${docsContentRoute}/${segments.join('/')}`,
  };
}

export async function getLLMText(page: (typeof source)['$inferPage']) {
  const processed = await page.data.getText('processed');

  return `# ${page.data.title} (${page.url})

${stripMDXComponents(processed)}`;
}

// MDX components leak into /llms-full.txt as raw JSX (Mermaid charts,
// Card grids, Callout boxes). LLMs can mostly cope, but they add noise.
// Flatten them to plain markdown so the served file is closer to the
// source-of-truth prose than to the rendered React tree.
function stripMDXComponents(md: string): string {
  let out = md;

  // <Mermaid chart="..." /> — drop entirely (text-mode LLMs can't render
  // a diagram; the surrounding prose carries the meaning).
  out = out.replace(/<Mermaid[\s\S]*?\/>/g, '');

  // <Cards>...<Card icon="..." title="X" href="/y" description="Z" />...</Cards>
  // → "- [X](/y): Z" bullet list.
  out = out.replace(/<Cards>([\s\S]*?)<\/Cards>/g, (_, inner: string) => {
    const lines: string[] = [];
    const cardRe = /<Card[^>]*?title="([^"]+)"[^>]*?href="([^"]+)"[^>]*?description="([^"]+)"[^>]*?\/>/g;
    let m: RegExpExecArray | null;
    while ((m = cardRe.exec(inner)) !== null) {
      lines.push(`- [${m[1]}](${m[2]}): ${m[3]}`);
    }
    return lines.length > 0 ? lines.join('\n') : '';
  });

  // <Callout type="..."> ... </Callout> → unwrap to the inner content.
  out = out.replace(/<Callout[^>]*>([\s\S]*?)<\/Callout>/g, '$1');

  // Collapse runs of blank lines created by the deletions.
  out = out.replace(/\n{3,}/g, '\n\n');

  return out.trim();
}
