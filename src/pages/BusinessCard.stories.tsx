import type { Meta, StoryObj } from '@storybook/react';
import { businessCardSets } from '@/components/cards/CardLayouts';
import { DuplexPreview } from '@/components/cards/DuplexPreview';
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

function Face({ children }: { children: React.ReactNode }) {
  return <div style={{ width: formats.card.width, height: formats.card.height }}>{children}</div>;
}

function Duplex({ setId }: { setId: string }) {
  const set = businessCardSets.find((s) => s.id === setId)!;
  return (
    <div className="flex flex-col gap-6">
      <DuplexPreview
        front={<set.front.Component />}
        back={<set.back.Component />}
        frontLabel="Front"
        backLabel="Back"
      />
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-gray-500">
            {set.title} · Front · {set.concept}
          </div>
          <Face>
            <set.front.Component />
          </Face>
        </div>
        <div>
          <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-gray-500">
            {set.title} · Back
          </div>
          <Face>
            <set.back.Component />
          </Face>
        </div>
      </div>
    </div>
  );
}

export const Executive: Story = { render: () => <Duplex setId="executive" /> };
export const Manifesto: Story = { render: () => <Duplex setId="manifesto" /> };
export const Split: Story = { render: () => <Duplex setId="split" /> };
export const Editorial: Story = { render: () => <Duplex setId="editorial" /> };
export const Horizon: Story = { render: () => <Duplex setId="horizon" /> };
export const Quiet: Story = { render: () => <Duplex setId="quiet" /> };
export const Solid: Story = { render: () => <Duplex setId="solid" /> };
export const Ribbon: Story = { render: () => <Duplex setId="ribbon" /> };
export const Corner: Story = { render: () => <Duplex setId="corner" /> };
