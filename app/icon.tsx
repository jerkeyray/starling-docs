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
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'stretch',
          gap: 3,
          padding: 6,
          borderRadius: 7,
          background:
            'linear-gradient(135deg, #06b6d4 0%, #14b8a6 55%, #10b981 100%)',
        }}
      >
        <div
          style={{
            height: 3,
            borderRadius: 2,
            background: 'rgba(255,255,255,0.95)',
          }}
        />
        <div
          style={{
            height: 3,
            borderRadius: 2,
            background: 'rgba(255,255,255,0.75)',
            marginLeft: 4,
          }}
        />
        <div
          style={{
            height: 3,
            borderRadius: 2,
            background: 'rgba(255,255,255,0.55)',
            marginLeft: 8,
          }}
        />
      </div>
    ),
    size,
  );
}
