import type { Meta, StoryObj } from '@storybook/react';
import { slides } from '@/pages/Presentation';
import { formats } from '@/lib/formats';

const meta: Meta = {
  title: 'Templates/Presentation',
  parameters: {
    layout: 'fullscreen',
    viewport: { defaultViewport: 'slide' }
  }
};

export default meta;
type Story = StoryObj;

function SlideFrame({ children }: { children: React.ReactNode }) {
  return <div style={{ width: formats.slide.width, height: formats.slide.height }}>{children}</div>;
}

export const Cover: Story = {
  render: () => <SlideFrame>{slides[0].render()}</SlideFrame>
};

export const SectionDivider: Story = {
  render: () => <SlideFrame>{slides[1].render()}</SlideFrame>
};

export const CompanyIntroduction: Story = {
  render: () => <SlideFrame>{slides[2].render()}</SlideFrame>
};

export const About: Story = {
  render: () => <SlideFrame>{slides[3].render()}</SlideFrame>
};

export const KeyNumbers: Story = {
  render: () => <SlideFrame>{slides[4].render()}</SlideFrame>
};

export const ProductCategories: Story = {
  render: () => <SlideFrame>{slides[5].render()}</SlideFrame>
};

export const Comparison: Story = {
  render: () => <SlideFrame>{slides[6].render()}</SlideFrame>
};

export const Specification: Story = {
  render: () => <SlideFrame>{slides[7].render()}</SlideFrame>
};

export const ImageText: Story = {
  render: () => <SlideFrame>{slides[8].render()}</SlideFrame>
};

export const TwoColumn: Story = {
  render: () => <SlideFrame>{slides[9].render()}</SlideFrame>
};

export const ThreeColumn: Story = {
  render: () => <SlideFrame>{slides[10].render()}</SlideFrame>
};

export const Process: Story = {
  render: () => <SlideFrame>{slides[11].render()}</SlideFrame>
};

export const Timeline: Story = {
  render: () => <SlideFrame>{slides[12].render()}</SlideFrame>
};

export const Chart: Story = {
  render: () => <SlideFrame>{slides[13].render()}</SlideFrame>
};

export const PartnerLogos: Story = {
  render: () => <SlideFrame>{slides[14].render()}</SlideFrame>
};

export const Quote: Story = {
  render: () => <SlideFrame>{slides[15].render()}</SlideFrame>
};

export const Contact: Story = {
  render: () => <SlideFrame>{slides[16].render()}</SlideFrame>
};
