import { BrandMarkApp } from '@/components/brand/BrandMark';
import { formats } from '@/lib/formats';

/**
 * Official app icon / favicon set — filenames get the active brand prefix at render.
 */

export function Favicon16() {
  return <BrandMarkApp size={formats.favicon16.width} uid="f16" glow={false} />;
}

export function Favicon32() {
  return <BrandMarkApp size={formats.favicon32.width} uid="f32" glow={false} />;
}

export function AppleTouchIcon() {
  return <BrandMarkApp size={formats.appleTouch.width} uid="f180" />;
}

export function AppIcon192() {
  return <BrandMarkApp size={formats.appIcon192.width} uid="f192" />;
}

export function AppIcon512() {
  return <BrandMarkApp size={formats.appIcon512.width} uid="f512" />;
}

export const faviconDefs = [
  { id: '16', title: 'Favicon 16×16', file: 'Favicon_16', artboard: formats.favicon16, Component: Favicon16 },
  { id: '32', title: 'Favicon 32×32', file: 'Favicon_32', artboard: formats.favicon32, Component: Favicon32 },
  {
    id: '180',
    title: 'Apple Touch 180×180',
    file: 'AppleTouch_180',
    artboard: formats.appleTouch,
    Component: AppleTouchIcon
  },
  {
    id: '192',
    title: 'PWA 192×192',
    file: 'AppIcon_192',
    artboard: formats.appIcon192,
    Component: AppIcon192
  },
  {
    id: '512',
    title: 'App Icon 512×512',
    file: 'AppIcon_512',
    artboard: formats.appIcon512,
    Component: AppIcon512
  }
] as const;