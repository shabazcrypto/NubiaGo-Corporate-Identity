import type { ReactNode } from 'react';
import { formats } from '@/lib/formats';

function GuideBox({
  left,
  top,
  width,
  height,
  label,
  color = 'rgba(201, 162, 39, 0.85)'
}: {
  left: number;
  top: number;
  width: number;
  height: number;
  label: string;
  color?: string;
}) {
  return (
    <div
      className="pointer-events-none absolute"
      style={{
        left,
        top,
        width,
        height,
        border: `2px dashed ${color}`,
        backgroundColor: color.replace('0.85', '0.12').replace('1)', '0.12)')
      }}
    >
      <span
        className="absolute left-2 top-2 rounded px-1.5 py-0.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-ink"
        style={{ backgroundColor: 'rgba(250,250,250,0.92)' }}
      >
        {label}
      </span>
    </div>
  );
}

function GuideCanvas({
  width,
  height,
  children,
  caption
}: {
  width: number;
  height: number;
  children: ReactNode;
  caption: string;
}) {
  return (
    <div className="relative bg-gray-50" style={{ width, height }}>
      <div className="absolute inset-0 opacity-[0.35]" aria-hidden>
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              'linear-gradient(to right, #E5E5E5 1px, transparent 1px), linear-gradient(to bottom, #E5E5E5 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }}
        />
      </div>
      {children}
      <div className="absolute bottom-3 right-3 rounded bg-white/90 px-2 py-1 text-[11px] font-medium text-gray-700">
        {caption}
      </div>
    </div>
  );
}

/** Facebook cover safe regions — full 1640×624 with desktop + mobile crops. */
export function SafeAreaFacebook() {
  const { width, height } = formats.fbCover;
  const desktopW = 820;
  const desktopH = 312;
  const mobileW = 640;
  const mobileH = 360;

  return (
    <GuideCanvas width={width} height={height} caption="Facebook Page Cover · 1640 × 624">
      <GuideBox
        left={(width - desktopW) / 2}
        top={(height - desktopH) / 2}
        width={desktopW}
        height={desktopH}
        label="Desktop crop"
        color="rgba(30, 58, 95, 0.9)"
      />
      <GuideBox
        left={(width - mobileW) / 2}
        top={(height - Math.min(mobileH, height)) / 2}
        width={mobileW}
        height={Math.min(mobileH, height)}
        label="Mobile crop"
        color="rgba(201, 162, 39, 0.9)"
      />
    </GuideCanvas>
  );
}

/** X header — profile overlap circle bottom-left. */
export function SafeAreaX() {
  const { width, height } = formats.xHeader;
  const profileD = 168;
  const profileLeft = 28;
  const profileBottom = -42;

  return (
    <GuideCanvas width={width} height={height} caption="X Header · 1500 × 500">
      <GuideBox left={220} top={40} width={width - 280} height={height - 100} label="Safe content" color="rgba(30, 58, 95, 0.85)" />
      <div
        className="pointer-events-none absolute rounded-full border-2 border-dashed"
        style={{
          left: profileLeft,
          bottom: profileBottom,
          width: profileD,
          height: profileD,
          borderColor: 'rgba(201, 162, 39, 0.95)',
          backgroundColor: 'rgba(201, 162, 39, 0.15)'
        }}
      >
        <span
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-ink"
          style={{ backgroundColor: 'rgba(250,250,250,0.92)' }}
        >
          Profile overlap
        </span>
      </div>
    </GuideCanvas>
  );
}

/** Google Business Profile cover safe region. */
export function SafeAreaGoogle() {
  const { width, height } = formats.googleCover;
  const insetX = 48;
  const insetY = 40;

  return (
    <GuideCanvas width={width} height={height} caption="Google Cover · 1080 × 608">
      <GuideBox
        left={insetX}
        top={insetY}
        width={width - insetX * 2}
        height={height - insetY * 2}
        label="Safe content"
        color="rgba(30, 58, 95, 0.9)"
      />
    </GuideCanvas>
  );
}

/** Instagram / unified profile — center circle-safe zone. */
export function SafeAreaInstagramProfile() {
  const { width, height } = formats.profileLg;
  const circle = Math.round(width * 0.72);
  const left = (width - circle) / 2;
  const top = (height - circle) / 2;

  return (
    <GuideCanvas width={width} height={height} caption="Profile · 1080 × 1080">
      <div
        className="pointer-events-none absolute rounded-full border-2 border-dashed"
        style={{
          left,
          top,
          width: circle,
          height: circle,
          borderColor: 'rgba(30, 58, 95, 0.9)',
          backgroundColor: 'rgba(30, 58, 95, 0.1)'
        }}
      >
        <span
          className="absolute left-1/2 top-4 -translate-x-1/2 rounded px-1.5 py-0.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-ink"
          style={{ backgroundColor: 'rgba(250,250,250,0.92)' }}
        >
          Circle-safe
        </span>
      </div>
      <GuideBox
        left={Math.round(width * 0.15)}
        top={Math.round(height * 0.15)}
        width={Math.round(width * 0.7)}
        height={Math.round(height * 0.7)}
        label="Square crop"
        color="rgba(201, 162, 39, 0.75)"
      />
    </GuideCanvas>
  );
}
