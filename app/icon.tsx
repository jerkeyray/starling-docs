import { ImageResponse } from 'next/og';

export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#000000',
          color: '#00ADD8', // Go brand cyan
          fontSize: 24,
          fontWeight: 900,
          letterSpacing: '-0.04em',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        S
      </div>
    ),
    size,
  );
}
