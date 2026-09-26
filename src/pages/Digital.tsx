import { useMemo, useState, type ReactNode } from 'react';
import { PageHeader, GroupLabel } from '@/components/ui/PageHeader';
import { AssetFrame } from '@/components/ui/AssetFrame';
import { SectionTabs, TabPanel } from '@/components/ui/SectionTabs';
import { LazyMount } from '@/components/ui/LazyMount';
import { formats } from '@/lib/formats';
import { useBrandMeta } from '@/lib/brand-context';
import { masterCoverDefs } from '@/components/social/coverDirections';
import {
  facebookCoverDefs,
  xHeaderDefs,
  googleCoverDefs,
  linkedInCoverDefs
} from '@/components/social/platformCovers';
import { ProfilePrimary, ProfileSand, ProfileTransparent, photoProfileDefs } from '@/components/social/profileImages';
import { HighlightCover, highlightDefs } from '@/components/social/highlightCovers';
import {
  SafeAreaFacebook,
  SafeAreaX,
  SafeAreaGoogle,
  SafeAreaInstagramProfile,
  SafeAreaLinkedIn
} from '@/components/social/safeAreaGuides';
import { DigitalPostsSection } from '@/pages/DigitalSocial';
import { LinkedInPostAlive, FeedPostMarketplace } from '@/components/social/alivePosts';

function LazyFrame({ children, minHeight = 320 }: { children: ReactNode; minHeight?: number }) {
  return <LazyMount minHeight={minHeight}>{children}</LazyMount>;
}

const TAB_IDS = [
  'masters',
  'linkedin',
  'facebook',
  'x',
  'google',
  'profiles',
  'highlights',
  'posts',
  'safe'
] as const;

type TabId = (typeof TAB_IDS)[number];

/** Unified Digital & Social — platform tabs + lazy artboards. */
export function DigitalPage() {
  const { company, prefix } = useBrandMeta();
  const [tab, setTab] = useState<TabId>('masters');

  const tabs = useMemo(
    () => [
      { id: 'masters' as const, label: 'Masters', count: masterCoverDefs.length },
      { id: 'linkedin' as const, label: 'LinkedIn', count: linkedInCoverDefs.length },
      { id: 'facebook' as const, label: 'Facebook', count: facebookCoverDefs.length },
      { id: 'x' as const, label: 'X', count: xHeaderDefs.length },
      { id: 'google' as const, label: 'Google', count: googleCoverDefs.length },
      {
        id: 'profiles' as const,
        label: 'Profiles',
        count: 5 + photoProfileDefs.length
      },
      { id: 'highlights' as const, label: 'Highlights', count: highlightDefs.length },
      { id: 'posts' as const, label: 'Posts', count: 9 },
      { id: 'safe' as const, label: 'Safe areas', count: 5 }
    ],
    []
  );

  return (
    <>
      <PageHeader
        code="10"
        title="Digital & Social"
        folder="10_DIGITAL_SOCIAL"
        description={`Complete digital face of ${company.name}: master directions, LinkedIn / Facebook / X / Google covers, profiles, highlights, alive + announcement posts, and platform safe areas.`}
        specs={['Platform tabs', 'Lazy artboards', 'Safe-area overlays']}
      />

      <div className="mb-8 grid gap-px bg-gray-200 sm:grid-cols-5">
        {[
          ['Masters', String(masterCoverDefs.length)],
          ['LinkedIn covers', String(linkedInCoverDefs.length)],
          ['FB · X · Google', String(facebookCoverDefs.length + xHeaderDefs.length + googleCoverDefs.length)],
          ['Profiles / highlights', String(5 + photoProfileDefs.length + highlightDefs.length)],
          ['Posts + safe', '14+']
        ].map(([label, value]) => (
          <div key={label} className="bg-gray-50 px-5 py-4">
            <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-gray-500">{label}</div>
            <div className="mt-1 text-[14px] font-medium text-ink">{value}</div>
          </div>
        ))}
      </div>

      <SectionTabs tabs={tabs} active={tab} onChange={(id) => setTab(id as TabId)} />

      <TabPanel id="masters" active={tab} note="1920 × 640 · brand directions">
        <GroupLabel note="1920 × 640">01 Master covers</GroupLabel>
        {masterCoverDefs.map(({ id, Component, desc }) => (
          <LazyFrame key={id}>
            <AssetFrame
              title={`Master Cover — ${id}`}
              fileName={`${prefix}_Master_Cover_${id}`}
              description={desc}
              artboard={formats.masterCover}
            >
              <Component />
            </AssetFrame>
          </LazyFrame>
        ))}
      </TabPanel>

      <TabPanel id="linkedin" active={tab} note="1584 × 396 · company page covers">
        <GroupLabel note="1584 × 396">02 LinkedIn — Covers</GroupLabel>
        {linkedInCoverDefs.map(({ id, Component }) => (
          <LazyFrame key={id}>
            <AssetFrame
              title={`LinkedIn Cover — ${id}`}
              fileName={`${prefix}_LinkedIn_Cover_${id}`}
              description={`${id} — photography left, type rail right; matches master language.`}
              artboard={formats.linkedInCover}
            >
              <Component />
            </AssetFrame>
          </LazyFrame>
        ))}
      </TabPanel>

      <TabPanel id="facebook" active={tab} note="1640 × 624 · desktop + mobile safe">
        <GroupLabel note="1640 × 624">03 Facebook — Covers</GroupLabel>
        {facebookCoverDefs.map(({ id, Component }) => (
          <LazyFrame key={id}>
            <AssetFrame
              title={`Facebook Cover — ${id}`}
              fileName={`${prefix}_Facebook_Cover_${id}`}
              description={`${id} — type in desktop centre safe (~820 × 312).`}
              artboard={formats.fbCover}
            >
              <Component />
            </AssetFrame>
          </LazyFrame>
        ))}
      </TabPanel>

      <TabPanel id="x" active={tab} note="1500 × 500 · clear avatar zone">
        <GroupLabel note="1500 × 500">04 X / Twitter — Headers</GroupLabel>
        {xHeaderDefs.map(({ id, Component }) => (
          <LazyFrame key={id}>
            <AssetFrame
              title={`X Header — ${id}`}
              fileName={`${prefix}_X_Header_${id}`}
              description={`${id} — content clear of profile overlap.`}
              artboard={formats.xHeader}
            >
              <Component />
            </AssetFrame>
          </LazyFrame>
        ))}
      </TabPanel>

      <TabPanel id="google" active={tab} note="1080 × 608 · Business Profile">
        <GroupLabel note="1080 × 608">05 Google — Covers</GroupLabel>
        {googleCoverDefs.map(({ id, Component }) => (
          <LazyFrame key={id}>
            <AssetFrame
              title={`Google Cover — ${id}`}
              fileName={`${prefix}_Google_Cover_${id}`}
              description={`${id} for Google Business Profile.`}
              artboard={formats.googleCover}
            >
              <Component />
            </AssetFrame>
          </LazyFrame>
        ))}
      </TabPanel>

      <TabPanel id="profiles" active={tab} note="1080 / 800 / 720 · circle-crop safe">
        <GroupLabel note="1080 / 800 / 720">06 Profiles</GroupLabel>
        <LazyFrame>
          <AssetFrame
            title="Profile — Primary"
            fileName={`${prefix}_Profile_Primary`}
            description="Wordmark on Primary — circle-crop safe."
            artboard={formats.profileLg}
          >
            <ProfilePrimary size={formats.profileLg.width} />
          </AssetFrame>
        </LazyFrame>
        <LazyFrame>
          <AssetFrame
            title="Profile — Sand"
            fileName={`${prefix}_Profile_Sand`}
            description="Wordmark on Warm Sand."
            artboard={formats.profileLg}
          >
            <ProfileSand size={formats.profileLg.width} />
          </AssetFrame>
        </LazyFrame>
        <LazyFrame>
          <AssetFrame
            title="Profile — Transparent"
            fileName={`${prefix}_Profile_Transparent`}
            description="Wordmark only for compositing."
            artboard={formats.profileLg}
            transparent
            formats={['png']}
          >
            <ProfileTransparent size={formats.profileLg.width} />
          </AssetFrame>
        </LazyFrame>
        {photoProfileDefs.map(({ id, Component }) => (
          <LazyFrame key={id}>
            <AssetFrame
              title={`Profile — ${id}`}
              fileName={`${prefix}_Profile_${id}`}
              description="Unsplash photography + navy veil + centred wordmark."
              artboard={formats.profileLg}
            >
              <Component size={formats.profileLg.width} />
            </AssetFrame>
          </LazyFrame>
        ))}
        <LazyFrame>
          <AssetFrame
            title="X — Profile Primary"
            fileName={`${prefix}_X_Profile_Primary`}
            description="800 × 800 for X."
            artboard={formats.profileMd}
          >
            <ProfilePrimary size={formats.profileMd.width} />
          </AssetFrame>
        </LazyFrame>
        <LazyFrame>
          <AssetFrame
            title="Google — Profile Primary"
            fileName={`${prefix}_Google_Profile_Primary`}
            description="720 × 720 for Google Business Profile."
            artboard={formats.profileGoogle}
          >
            <ProfilePrimary size={formats.profileGoogle.width} />
          </AssetFrame>
        </LazyFrame>
      </TabPanel>

      <TabPanel id="highlights" active={tab} note="1080 × 1080 · Instagram circle-safe">
        <GroupLabel note="1080 × 1080">07 Instagram Highlights</GroupLabel>
        {highlightDefs.map((h) => (
          <LazyFrame key={h.id} minHeight={360}>
            <AssetFrame
              title={`Highlight — ${h.label}`}
              fileName={`${prefix}_Instagram_Highlight_${h.id}`}
              description="Icon + label inside centre ~60% circle."
              artboard={formats.highlight}
            >
              <HighlightCover label={h.label} Icon={h.Icon} field={h.field} />
            </AssetFrame>
          </LazyFrame>
        ))}
      </TabPanel>

      <TabPanel id="posts" active={tab} note="Campaign + announcement posts">
        <GroupLabel note="Campaign posts · photo-led">08 Alive posts</GroupLabel>
        <LazyFrame>
          <AssetFrame
            title="LinkedIn — Alive Partnership"
            fileName={`${prefix}_LinkedIn_Post_Alive`}
            description="Handshake photography with type rail — same language as covers."
            artboard={formats.linkedIn}
          >
            <LinkedInPostAlive />
          </AssetFrame>
        </LazyFrame>
        <LazyFrame>
          <AssetFrame
            title="Feed — Marketplace Still Life"
            fileName={`${prefix}_Feed_Marketplace`}
            description="Studio still-life with sand band and marketplace line."
            artboard={formats.square}
          >
            <FeedPostMarketplace />
          </AssetFrame>
        </LazyFrame>
        <GroupLabel note="Announcement system">09 Classic posts</GroupLabel>
        <DigitalPostsSection />
      </TabPanel>

      <TabPanel id="safe" active={tab} note="Downloadable overlay guides">
        <GroupLabel note="Downloadable overlays">10 Safe areas</GroupLabel>
        <LazyFrame>
          <AssetFrame
            title="Safe Area — LinkedIn"
            fileName={`${prefix}_SafeArea_LinkedIn`}
            description="Photography vs type-rail regions for LinkedIn company covers."
            artboard={formats.linkedInCover}
          >
            <SafeAreaLinkedIn />
          </AssetFrame>
        </LazyFrame>
        <LazyFrame>
          <AssetFrame
            title="Safe Area — Facebook"
            fileName={`${prefix}_SafeArea_Facebook`}
            description="Desktop and mobile crop regions."
            artboard={formats.fbCover}
          >
            <SafeAreaFacebook />
          </AssetFrame>
        </LazyFrame>
        <LazyFrame>
          <AssetFrame
            title="Safe Area — X Header"
            fileName={`${prefix}_SafeArea_X`}
            description="Content safe + profile overlap."
            artboard={formats.xHeader}
          >
            <SafeAreaX />
          </AssetFrame>
        </LazyFrame>
        <LazyFrame>
          <AssetFrame
            title="Safe Area — Google"
            fileName={`${prefix}_SafeArea_Google`}
            description="Inset safe content region."
            artboard={formats.googleCover}
          >
            <SafeAreaGoogle />
          </AssetFrame>
        </LazyFrame>
        <LazyFrame>
          <AssetFrame
            title="Safe Area — Instagram Profile"
            fileName={`${prefix}_SafeArea_Instagram`}
            description="Circle-safe and square crop guides."
            artboard={formats.profileLg}
          >
            <SafeAreaInstagramProfile />
          </AssetFrame>
        </LazyFrame>
      </TabPanel>
    </>
  );
}

export const SocialCoversPage = DigitalPage;
