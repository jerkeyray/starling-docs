import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Starling · event-sourced agent runtime for Go';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OGImage() {
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
        {/* Diagonal cyan accent stripe */}
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
        {/* Top rule */}
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

        {/* Wordmark + pill */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            marginBottom: '40px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '64px',
              height: '64px',
              background: '#00ADD8',
              color: '#000',
              fontWeight: 900,
              fontSize: '40px',
              lineHeight: 1,
            }}
          >
            S
          </div>
          <div
            style={{
              fontSize: '28px',
              fontWeight: 800,
              letterSpacing: '0.04em',
            }}
          >
            STARLING
          </div>
        </div>

        {/* Headline */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            fontSize: '92px',
            fontWeight: 900,
            lineHeight: 1.02,
            letterSpacing: '-0.02em',
            marginBottom: '32px',
          }}
        >
          <div>Event-sourced</div>
          <div>
            agent runtime for{' '}
            <span
              style={{
                color: '#00ADD8',
                borderBottom: '8px solid #00ADD8',
                paddingBottom: '4px',
              }}
            >
              Go
            </span>
            .
          </div>
        </div>

        {/* Lede */}
        <div
          style={{
            fontSize: '28px',
            color: '#a1a1aa',
            lineHeight: 1.4,
            maxWidth: '900px',
          }}
        >
          Replay any run byte-for-byte. Audit every step. Enforce cost
          inside the runtime.
        </div>

        {/* Footer row */}
        <div
          style={{
            position: 'absolute',
            bottom: '48px',
            left: '72px',
            right: '72px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '20px',
            color: '#71717a',
            fontWeight: 700,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
          }}
        >
          <div style={{ display: 'flex', gap: '24px' }}>
            <span>Replay</span>
            <span style={{ color: '#52525b' }}>·</span>
            <span>Audit</span>
            <span style={{ color: '#52525b' }}>·</span>
            <span>Resume</span>
            <span style={{ color: '#52525b' }}>·</span>
            <span>MCP</span>
          </div>
          <div style={{ color: '#00ADD8' }}>jerkeyray.com</div>
        </div>
      </div>
    ),
    size,
  );
}
