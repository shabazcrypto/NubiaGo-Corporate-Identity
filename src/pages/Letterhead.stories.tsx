import type { Meta, StoryObj } from '@storybook/react';
import {
  LetterheadFullColour,
  LetterheadMinimal,
  LetterheadContinuation,
  FooterFullCorporate,
  FooterCompact,
  FooterBrandedBand
} from '@/pages/Letterhead';
import { formats } from '@/lib/formats';

const meta: Meta = {
  title: 'Templates/Letterhead',
  parameters: { layout: 'fullscreen' }
};

export default meta;
type Story = StoryObj;

function Frame({
  width,
  height,
  children
}: {
  width: number;
  height: number;
  children: React.ReactNode;
}) {
  return <div style={{ width, height }}>{children}</div>;
}

export const FullColour: Story = {
  parameters: { viewport: { defaultViewport: 'a4' } },
  render: () => (
    <Frame width={formats.a4.width} height={formats.a4.height}>
      <LetterheadFullColour />
    </Frame>
  )
};

export const Minimal: Story = {
  parameters: { viewport: { defaultViewport: 'a4' } },
  render: () => (
    <Frame width={formats.a4.width} height={formats.a4.height}>
      <LetterheadMinimal />
    </Frame>
  )
};

export const Continuation: Story = {
  parameters: { viewport: { defaultViewport: 'a4' } },
  render: () => (
    <Frame width={formats.a4.width} height={formats.a4.height}>
      <LetterheadContinuation />
    </Frame>
  )
};

export const FooterFull: Story = {
  render: () => (
    <Frame width={formats.footerFull.width} height={formats.footerFull.height}>
      <FooterFullCorporate />
    </Frame>
  )
};

export const FooterCompactVariant: Story = {
  render: () => (
    <Frame width={formats.footerCompact.width} height={formats.footerCompact.height}>
      <FooterCompact />
    </Frame>
  )
};

export const FooterBand: Story = {
  render: () => (
    <Frame width={formats.footerBand.width} height={formats.footerBand.height}>
      <FooterBrandedBand />
    </Frame>
  )
};
