import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Why Starling';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function WhyStarlingOG() {
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
            background: '#10b981',
            opacity: 0.2,
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
            marginBottom: '40px',
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
              background: '#10b981',
              color: '#000',
              fontSize: '16px',
              fontWeight: 800,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
            }}
          >
            Why Starling
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            fontSize: '88px',
            fontWeight: 900,
            lineHeight: 1.02,
            letterSpacing: '-0.02em',
            marginBottom: '32px',
          }}
        >
          <div>Built around the</div>
          <div>
            <span
              style={{
                color: '#00ADD8',
                borderBottom: '8px solid #00ADD8',
                paddingBottom: '4px',
              }}
            >
              event log
            </span>
            .
          </div>
        </div>

        <div
          style={{
            fontSize: '26px',
            color: '#a1a1aa',
            lineHeight: 1.4,
            maxWidth: '950px',
          }}
        >
          Eight categories, forty-odd features. All wired around the event
          log as source of truth.
        </div>

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
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
            <span>Audit</span>
            <span style={{ color: '#52525b' }}>·</span>
            <span>Replay</span>
            <span style={{ color: '#52525b' }}>·</span>
            <span>Recovery</span>
            <span style={{ color: '#52525b' }}>·</span>
            <span>Budgets</span>
            <span style={{ color: '#52525b' }}>·</span>
            <span>Providers</span>
            <span style={{ color: '#52525b' }}>·</span>
            <span>MCP</span>
          </div>
          <div style={{ color: '#10b981' }}>github.com/jerkeyray/starling</div>
        </div>
      </div>
    ),
    size,
  );
}
