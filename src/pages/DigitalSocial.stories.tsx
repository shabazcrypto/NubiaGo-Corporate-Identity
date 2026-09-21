import type { Meta, StoryObj } from '@storybook/react';
import { Logo, BrandRule } from '@/components/brand/Logo';
import { formats } from '@/lib/formats';

const meta: Meta = {
  title: 'Templates/DigitalSocial',
  parameters: { layout: 'fullscreen' }
};

export default meta;
type Story = StoryObj;

export const LinkedInAnnouncement: Story = {
  parameters: { viewport: { defaultViewport: 'linkedIn' } },
  render: () => (
    <div
      className="flex flex-col justify-between bg-brand p-16 text-white"
      style={{ width: formats.linkedIn.width, height: formats.linkedIn.height }}
    >
      <Logo size={28} tone="light" />
      <div>
        <BrandRule width={96} tone="gold" />
        <h1 className="mt-6 max-w-3xl text-[48px] font-bold leading-tight tracking-[-0.03em]">
          Infrastructure for African commerce
        </h1>
        <p className="mt-4 text-[18px] text-white/70">nubiago.com</p>
      </div>
    </div>
  )
};

export const SquareFeed: Story = {
  parameters: { viewport: { defaultViewport: 'square' } },
  render: () => (
    <div
      className="flex flex-col justify-between bg-brand-sand p-14"
      style={{ width: formats.square.width, height: formats.square.height }}
    >
      <Logo size={28} />
      <div>
        <BrandRule width={72} />
        <h1 className="mt-6 text-[42px] font-bold leading-tight tracking-[-0.03em] text-ink">
          Built for continental trade
        </h1>
      </div>
    </div>
  )
};
