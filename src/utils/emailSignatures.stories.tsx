import type { Meta, StoryObj } from '@storybook/react';
import {
  standardSignatureHtml,
  compactSignatureHtml,
  executiveSignatureHtml
} from '@/utils/emailSignatures';
import { enterpriseSignatureCatalog } from '@/utils/emailSignaturesExtra';
import { defaultCompany } from '@/data/brand';

const meta: Meta = {
  title: 'Templates/EmailSignatures',
  parameters: { layout: 'padded' }
};
export default meta;
type Story = StoryObj;

function Preview({ html }: { html: string }) {
  return (
    <div className="max-w-[640px] border border-gray-200 bg-white p-8">
      <div className="mb-6 border-b border-gray-200 pb-3 text-[11px] text-gray-500">
        Re: Corridor settlement terms
      </div>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}

export const Standard: Story = {
  render: () => <Preview html={standardSignatureHtml(defaultCompany)} />
};
export const Compact: Story = {
  render: () => <Preview html={compactSignatureHtml(defaultCompany)} />
};
export const Executive: Story = {
  render: () => <Preview html={executiveSignatureHtml(defaultCompany)} />
};

export const Corridor: Story = {
  render: () => {
    const entry = enterpriseSignatureCatalog.find((e) => e.id === 'corridor')!;
    return <Preview html={entry.html(defaultCompany)} />;
  }
};
export const Legal: Story = {
  render: () => {
    const entry = enterpriseSignatureCatalog.find((e) => e.id === 'legal')!;
    return <Preview html={entry.html(defaultCompany)} />;
  }
};
export const Support: Story = {
  render: () => {
    const entry = enterpriseSignatureCatalog.find((e) => e.id === 'support')!;
    return <Preview html={entry.html(defaultCompany)} />;
  }
};
