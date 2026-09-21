import type { Meta, StoryObj } from '@storybook/react';
import { formats } from '@/lib/formats';
import {
  CoverCorporate,
  CoverTrade,
  CoverTrust
} from '@/components/social/coverDirections';
import { LinkedInCoverCorporate, FacebookCoverTrade } from '@/components/social/platformCovers';
import { ProfilePrimary } from '@/components/social/profileImages';
import { DigitalPage } from '@/pages/Digital';

const meta: Meta = {
  title: 'Templates/Digital',
  parameters: { layout: 'fullscreen' }
};

export default meta;
type Story = StoryObj;

export const Page: Story = { render: () => <DigitalPage /> };
export const MasterCorporate: Story = { render: () => <CoverCorporate /> };
export const MasterTrade: Story = { render: () => <CoverTrade /> };
export const MasterTrust: Story = { render: () => <CoverTrust /> };
export const LinkedInCorporate: Story = { render: () => <LinkedInCoverCorporate /> };
export const FacebookTrade: Story = { render: () => <FacebookCoverTrade /> };
export const Profile: Story = {
  render: () => (
    <div style={{ width: formats.profileLg.width, height: formats.profileLg.height }}>
      <ProfilePrimary />
    </div>
  )
};
