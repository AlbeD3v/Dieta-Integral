import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Dieta Integral — Alimentación consciente, nutrición ancestral y salud holística'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #0D1F14 0%, #1B4332 50%, #0D1F14 100%)',
          fontFamily: 'sans-serif',
          padding: '60px',
        }}
      >
        {/* Decorative circles */}
        <div
          style={{
            position: 'absolute',
            top: '-80px',
            right: '-80px',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            background: 'rgba(176, 141, 87, 0.08)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-120px',
            left: '-60px',
            width: '350px',
            height: '350px',
            borderRadius: '50%',
            background: 'rgba(64, 145, 108, 0.1)',
          }}
        />

        {/* Brand label */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '24px',
          }}
        >
          <div
            style={{
              width: '40px',
              height: '2px',
              background: 'rgba(176, 141, 87, 0.6)',
            }}
          />
          <span
            style={{
              fontSize: '16px',
              fontWeight: 700,
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: 'rgba(176, 141, 87, 0.9)',
            }}
          >
            Dieta Integral
          </span>
          <div
            style={{
              width: '40px',
              height: '2px',
              background: 'rgba(176, 141, 87, 0.6)',
            }}
          />
        </div>

        {/* Main title */}
        <h1
          style={{
            fontSize: '52px',
            fontWeight: 800,
            color: '#FFFFFF',
            textAlign: 'center',
            lineHeight: 1.15,
            margin: '0 0 20px 0',
            maxWidth: '900px',
          }}
        >
          Alimentación consciente y salud holística
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontSize: '22px',
            color: 'rgba(255, 255, 255, 0.55)',
            textAlign: 'center',
            lineHeight: 1.5,
            margin: 0,
            maxWidth: '700px',
          }}
        >
          Nutrición ancestral · Ritmos circadianos · Sueño · Hábitos saludables
        </p>

        {/* Footer */}
        <div
          style={{
            position: 'absolute',
            bottom: '40px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <span
            style={{
              fontSize: '15px',
              color: 'rgba(255, 255, 255, 0.3)',
            }}
          >
            dietaintegral.fit
          </span>
        </div>
      </div>
    ),
    { ...size }
  )
}
