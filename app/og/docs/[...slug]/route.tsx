import { getPageImage, source } from '@/lib/source';
import { notFound } from 'next/navigation';
import { ImageResponse } from 'next/og';

export const revalidate = false;

export async function GET(
  _req: Request,
  { params }: RouteContext<'/og/docs/[...slug]'>,
) {
  const { slug } = await params;
  const page = source.getPage(slug.slice(0, -1));
  if (!page) notFound();

  const title = page.data.title;
  const description = page.data.description ?? '';

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          background: '#000',
          color: '#fff',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          position: 'relative',
          padding: '72px',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '-120px',
            right: '-120px',
            width: '900px',
            height: '320px',
            background: '#00ADD8',
            opacity: 0.18,
            transform: 'rotate(-8deg)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: '#fff',
          }}
        />

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            marginBottom: '48px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '52px',
              height: '52px',
              background: '#00ADD8',
              color: '#000',
              fontWeight: 900,
              fontSize: '32px',
              lineHeight: 1,
            }}
          >
            S
          </div>
          <div
            style={{
              fontSize: '24px',
              fontWeight: 800,
              letterSpacing: '0.04em',
            }}
          >
            STARLING
          </div>
          <div
            style={{
              marginLeft: '12px',
              padding: '6px 12px',
              border: '2px solid #fff',
              fontSize: '16px',
              fontWeight: 700,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
            }}
          >
            Docs
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            fontSize: title.length > 30 ? '72px' : '92px',
            fontWeight: 900,
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            marginBottom: '28px',
            maxWidth: '1000px',
          }}
        >
          {title}
        </div>

        {description ? (
          <div
            style={{
              display: 'flex',
              fontSize: '26px',
              color: '#a1a1aa',
              lineHeight: 1.4,
              maxWidth: '950px',
            }}
          >
            {description.length > 200
              ? description.slice(0, 197) + '…'
              : description}
          </div>
        ) : null}

        <div
          style={{
            position: 'absolute',
            bottom: '48px',
            left: '72px',
            right: '72px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '18px',
            color: '#71717a',
            fontWeight: 700,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
          }}
        >
          <span>Event-sourced agent runtime for Go</span>
          <span style={{ color: '#00ADD8' }}>github.com/jerkeyray/starling</span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}

export function generateStaticParams() {
  return source.getPages().map((page) => ({
    lang: page.locale,
    slug: getPageImage(page).segments,
  }));
}
