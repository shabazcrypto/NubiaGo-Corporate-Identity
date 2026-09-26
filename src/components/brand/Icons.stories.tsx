import type { Meta, StoryObj } from '@storybook/react';
import { brandIcons, AB_STROKE, QrPlaceholder } from '@/components/brand/iconSystem';
import { Logo, BrandRule } from '@/components/brand/Logo';
import { formats } from '@/lib/formats';

const meta: Meta = {
  title: 'Brand/Icons',
  parameters: { layout: 'centered' }
};

export default meta;
type Story = StoryObj;

export const IconSheet: Story = {
  render: () => (
    <div
      className="flex flex-col bg-white p-12"
      style={{ width: formats.iconSheet.width, height: formats.iconSheet.height }}
    >
      <Logo size={18} />
      <div className="mt-4">
        <BrandRule width="100%" thickness={1} />
      </div>
      <div className="mt-10 grid flex-1 grid-cols-7 gap-y-10">
        {brandIcons.map(({ key, label, usage, Icon }) => (
          <div key={key} className="flex flex-col items-center px-2 text-center">
            <Icon className="h-7 w-7 text-brand" strokeWidth={AB_STROKE} />
            <div className="mt-3 text-[11px] font-semibold text-ink">{label}</div>
            <div className="mt-0.5 text-[8.5px] leading-tight text-gray-500">{usage}</div>
          </div>
        ))}
      </div>
    </div>
  )
};

export const QrPlaceholders: Story = {
  render: () => (
    <div
      className="flex flex-wrap items-center justify-center gap-10 bg-white px-8"
      style={{ width: formats.qrRow.width, height: formats.qrRow.height }}
    >
      {['Website', 'Product catalogue', 'Company profile', 'Contact card', 'LinkedIn'].map((label) => (
        <QrPlaceholder key={label} size={96} label={label} />
      ))}
    </div>
  )
};

export const RuleStack: Story = {
  render: () => (
    <div
      className="flex flex-col justify-center gap-4 bg-white px-16"
      style={{ width: formats.pattern.width, height: formats.pattern.height }}
    >
      {[100, 72, 44].map((width) => (
        <div key={width} className="h-[2px] bg-brand" style={{ width: `${width}%` }} />
      ))}
      <div className="h-[2px] w-[22%] bg-brand-ink" />
    </div>
  )
};

export const GridField: Story = {
  render: () => (
    <div
      className="bg-brand-sand"
      style={{
        width: formats.pattern.width,
        height: formats.pattern.height,
        backgroundImage:
          'linear-gradient(to right, rgba(30,58,95,0.10) 1px, transparent 1px), linear-gradient(to bottom, rgba(30,58,95,0.10) 1px, transparent 1px)',
        backgroundSize: '32px 32px'
      }}
    />
  )
};
