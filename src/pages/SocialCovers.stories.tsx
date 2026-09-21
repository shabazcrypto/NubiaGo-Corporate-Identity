import type { Meta, StoryObj } from '@storybook/react';
import { formats } from '@/lib/formats';
import {
  CoverCorporate,
  CoverTrade,
  CoverTrust,
  CoverLogistics,
  CoverExchange
} from '@/components/social/coverDirections';
import {
  FacebookCoverTrade,
  XHeaderLogistics,
  GoogleCoverExchange
} from '@/components/social/platformCovers';
import { ProfilePrimary, ProfilePortrait } from '@/components/social/profileImages';
import { HighlightCover } from '@/components/social/highlightCovers';
import { PackageIcon } from 'lucide-react';

const meta: Meta = {
  title: 'Templates/SocialCovers',
  parameters: { layout: 'fullscreen' }
};

export default meta;
type Story = StoryObj;

export const MasterCorporate: Story = { render: () => <CoverCorporate /> };
export const MasterTrade: Story = { render: () => <CoverTrade /> };
export const MasterTrust: Story = { render: () => <CoverTrust /> };
export const MasterLogistics: Story = { render: () => <CoverLogistics /> };
export const MasterExchange: Story = { render: () => <CoverExchange /> };
export const FacebookTrade: Story = { render: () => <FacebookCoverTrade /> };
export const XLogistics: Story = { render: () => <XHeaderLogistics /> };
export const GoogleExchange: Story = { render: () => <GoogleCoverExchange /> };
export const Profile: Story = {
  render: () => (
    <div style={{ width: formats.profileLg.width, height: formats.profileLg.height }}>
      <ProfilePrimary />
    </div>
  )
};
export const ProfilePhoto: Story = {
  render: () => (
    <div style={{ width: formats.profileLg.width, height: formats.profileLg.height }}>
      <ProfilePortrait />
    </div>
  )
};
export const HighlightProducts: Story = {
  render: () => <HighlightCover label="Products" Icon={PackageIcon} field="primary" />
};
