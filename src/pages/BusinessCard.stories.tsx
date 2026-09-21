import type { Meta, StoryObj } from '@storybook/react';
import {
  CorporateCardFront,
  CorporateCardBack,
  MinimalCardFront,
  MinimalCardBack
} from '@/pages/BusinessCard';
import { formats } from '@/lib/formats';

const meta: Meta = {
  title: 'Templates/BusinessCard',
  parameters: {
    layout: 'centered',
    viewport: { defaultViewport: 'card' }
  }
};

export default meta;
type Story = StoryObj;

function Card({ children }: { children: React.ReactNode }) {
  return <div style={{ width: formats.card.width, height: formats.card.height }}>{children}</div>;
}

export const CorporateFront: Story = {
  render: () => (
    <Card>
      <CorporateCardFront />
    </Card>
  )
};

export const CorporateBack: Story = {
  render: () => (
    <Card>
      <CorporateCardBack />
    </Card>
  )
};

export const MinimalFront: Story = {
  render: () => (
    <Card>
      <MinimalCardFront />
    </Card>
  )
};

export const MinimalBack: Story = {
  render: () => (
    <Card>
      <MinimalCardBack />
    </Card>
  )
};

export const CorporateFrontBleed: Story = {
  parameters: { viewport: { defaultViewport: 'card' } },
  render: () => (
    <div
      className="flex items-center justify-center bg-brand"
      style={{ width: formats.cardBleed.width, height: formats.cardBleed.height }}
    >
      <div style={{ width: formats.card.width, height: formats.card.height }}>
        <CorporateCardFront />
      </div>
    </div>
  )
};
