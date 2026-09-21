import type { Meta, StoryObj } from '@storybook/react';
import { Logo, LogoLockup, BrandRule, Endorsement } from '@/components/brand/Logo';
import { formats } from '@/lib/formats';

const meta: Meta = {
  title: 'Brand/Logo',
  parameters: { layout: 'centered' }
};

export default meta;

type Story = StoryObj;

export const Primary: Story = {
  render: () => (
    <div
      style={{ width: formats.logoMark.width, height: formats.logoMark.height }}
      className="flex flex-col items-center justify-center bg-white"
    >
      <Logo size={72} />
      <div className="mt-6">
        <BrandRule width={96} tone="gold" />
      </div>
      <div className="mt-4">
        <Endorsement />
      </div>
    </div>
  )
};

export const Reversed: Story = {
  render: () => (
    <div
      style={{ width: formats.logoMarkDark.width, height: formats.logoMarkDark.height }}
      className="flex flex-col items-center justify-center bg-brand"
    >
      <Logo size={72} tone="light" />
      <div className="mt-6">
        <BrandRule width={96} tone="gold" />
      </div>
      <div className="mt-4">
        <Endorsement tone="dark" />
      </div>
    </div>
  )
};

export const Lockup: Story = {
  render: () => (
    <div className="bg-white p-16">
      <LogoLockup size={48} />
    </div>
  )
};
