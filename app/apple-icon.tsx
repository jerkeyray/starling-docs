import { ImageResponse } from 'next/og';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
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
          gap: 14,
          padding: 30,
          borderRadius: 36,
          background:
            'linear-gradient(135deg, #06b6d4 0%, #14b8a6 55%, #10b981 100%)',
        }}
      >
        <div
          style={{
            height: 14,
            borderRadius: 7,
            background: 'rgba(255,255,255,0.95)',
          }}
        />
        <div
          style={{
            height: 14,
            borderRadius: 7,
            background: 'rgba(255,255,255,0.75)',
            marginLeft: 22,
          }}
        />
        <div
          style={{
            height: 14,
            borderRadius: 7,
            background: 'rgba(255,255,255,0.55)',
            marginLeft: 44,
          }}
        />
      </div>
    ),
    size,
  );
}
