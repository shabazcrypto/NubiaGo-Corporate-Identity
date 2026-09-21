import { PageHeader, GroupLabel } from '@/components/ui/PageHeader';
import { AssetFrame } from '@/components/ui/AssetFrame';
import { formats } from '@/lib/formats';
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

/** Unified Digital & Social — covers first, then posts, then safe guides. */
export function DigitalPage() {
  return (
    <>
      <PageHeader
        code="10"
        title="Digital & Social"
        folder="10_DIGITAL_SOCIAL"
        description="Complete digital face of NubiaGo: master directions, LinkedIn / Facebook / X / Google covers, profiles, highlights, alive + announcement posts, and platform safe areas."
      />

      <div className="mb-12 grid gap-px bg-gray-200 sm:grid-cols-5">
        {[
          ['Masters', '9'],
          ['LinkedIn covers', '3'],
          ['FB · X · Google', '20'],
          ['Profiles / highlights', '21'],
          ['Posts + banners', '9+']
        ].map(([label, value]) => (
          <div key={label} className="bg-gray-50 px-5 py-4">
            <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-gray-500">{label}</div>
            <div className="mt-1 text-[14px] font-medium text-ink">{value}</div>
          </div>
        ))}
      </div>

      {/* 01 Master directions */}
      <GroupLabel note="1920 × 640 · brand directions">01 Master covers</GroupLabel>
      {masterCoverDefs.map(({ id, Component, desc }) => (
        <AssetFrame
          key={id}
          title={`Master Cover — ${id}`}
          fileName={`NubiaGo_Master_Cover_${id}`}
          description={desc}
          artboard={formats.masterCover}
        >
          <Component />
        </AssetFrame>
      ))}

      {/* 02 LinkedIn */}
      <GroupLabel note="1584 × 396 · company page">02 LinkedIn — Covers</GroupLabel>
      {linkedInCoverDefs.map(({ id, Component }) => (
        <AssetFrame
          key={id}
          title={`LinkedIn Cover — ${id}`}
          fileName={`NubiaGo_LinkedIn_Cover_${id}`}
          description={`${id} — photography left, type rail right; matches master language.`}
          artboard={formats.linkedInCover}
        >
          <Component />
        </AssetFrame>
      ))}

      {/* 03 Facebook */}
      <GroupLabel note="1640 × 624">03 Facebook — Covers</GroupLabel>
      {facebookCoverDefs.map(({ id, Component }) => (
        <AssetFrame
          key={id}
          title={`Facebook Cover — ${id}`}
          fileName={`NubiaGo_Facebook_Cover_${id}`}
          description={`${id} — type in desktop centre safe (~820 × 312).`}
          artboard={formats.fbCover}
        >
          <Component />
        </AssetFrame>
      ))}

      {/* 04 X */}
      <GroupLabel note="1500 × 500 · clear avatar zone">04 X / Twitter — Headers</GroupLabel>
      {xHeaderDefs.map(({ id, Component }) => (
        <AssetFrame
          key={id}
          title={`X Header — ${id}`}
          fileName={`NubiaGo_X_Header_${id}`}
          description={`${id} — content clear of profile overlap.`}
          artboard={formats.xHeader}
        >
          <Component />
        </AssetFrame>
      ))}

      {/* 05 Google */}
      <GroupLabel note="1080 × 608">05 Google — Covers</GroupLabel>
      {googleCoverDefs.map(({ id, Component }) => (
        <AssetFrame
          key={id}
          title={`Google Cover — ${id}`}
          fileName={`NubiaGo_Google_Cover_${id}`}
          description={`${id} for Google Business Profile.`}
          artboard={formats.googleCover}
        >
          <Component />
        </AssetFrame>
      ))}

      {/* 06 Profiles */}
      <GroupLabel note="1080 / 800 / 720">06 Profiles</GroupLabel>
      <AssetFrame
        title="Profile — Primary"
        fileName="NubiaGo_Profile_Primary"
        description="Wordmark on Primary — circle-crop safe."
        artboard={formats.profileLg}
      >
        <ProfilePrimary size={formats.profileLg.width} />
      </AssetFrame>
      <AssetFrame
        title="Profile — Sand"
        fileName="NubiaGo_Profile_Sand"
        description="Wordmark on Warm Sand."
        artboard={formats.profileLg}
      >
        <ProfileSand size={formats.profileLg.width} />
      </AssetFrame>
      <AssetFrame
        title="Profile — Transparent"
        fileName="NubiaGo_Profile_Transparent"
        description="Wordmark only for compositing."
        artboard={formats.profileLg}
        transparent
        formats={['png']}
      >
        <ProfileTransparent size={formats.profileLg.width} />
      </AssetFrame>
      {photoProfileDefs.map(({ id, Component }) => (
        <AssetFrame
          key={id}
          title={`Profile — ${id}`}
          fileName={`NubiaGo_Profile_${id}`}
          description="Unsplash photography + navy veil + centred wordmark."
          artboard={formats.profileLg}
        >
          <Component size={formats.profileLg.width} />
        </AssetFrame>
      ))}
      <AssetFrame
        title="X — Profile Primary"
        fileName="NubiaGo_X_Profile_Primary"
        description="800 × 800 for X."
        artboard={formats.profileMd}
      >
        <ProfilePrimary size={formats.profileMd.width} />
      </AssetFrame>
      <AssetFrame
        title="Google — Profile Primary"
        fileName="NubiaGo_Google_Profile_Primary"
        description="720 × 720 for Google Business Profile."
        artboard={formats.profileGoogle}
      >
        <ProfilePrimary size={formats.profileGoogle.width} />
      </AssetFrame>

      {/* 07 Highlights */}
      <GroupLabel note="1080 × 1080 · circle-safe">07 Instagram Highlights</GroupLabel>
      {highlightDefs.map((h) => (
        <AssetFrame
          key={h.id}
          title={`Highlight — ${h.label}`}
          fileName={`NubiaGo_Instagram_Highlight_${h.id}`}
          description="Icon + label inside centre ~60% circle."
          artboard={formats.highlight}
        >
          <HighlightCover label={h.label} Icon={h.Icon} field={h.field} />
        </AssetFrame>
      ))}

      {/* 08 Alive posts */}
      <GroupLabel note="Campaign posts · photo-led">08 Alive posts</GroupLabel>
      <AssetFrame
        title="LinkedIn — Alive Partnership"
        fileName="NubiaGo_LinkedIn_Post_Alive"
        description="Handshake photography with type rail — same language as covers."
        artboard={formats.linkedIn}
      >
        <LinkedInPostAlive />
      </AssetFrame>
      <AssetFrame
        title="Feed — Marketplace Still Life"
        fileName="NubiaGo_Feed_Marketplace"
        description="Studio still-life with sand band and marketplace line."
        artboard={formats.square}
      >
        <FeedPostMarketplace />
      </AssetFrame>

      {/* 09 Classic posts */}
      <DigitalPostsSection />

      {/* 10 Safe areas */}
      <GroupLabel note="Downloadable overlays">10 Safe areas</GroupLabel>
      <AssetFrame
        title="Safe Area — LinkedIn"
        fileName="NubiaGo_SafeArea_LinkedIn"
        description="Photography vs type-rail regions for LinkedIn company covers."
        artboard={formats.linkedInCover}
      >
        <SafeAreaLinkedIn />
      </AssetFrame>
      <AssetFrame
        title="Safe Area — Facebook"
        fileName="NubiaGo_SafeArea_Facebook"
        description="Desktop and mobile crop regions."
        artboard={formats.fbCover}
      >
        <SafeAreaFacebook />
      </AssetFrame>
      <AssetFrame
        title="Safe Area — X Header"
        fileName="NubiaGo_SafeArea_X"
        description="Content safe + profile overlap."
        artboard={formats.xHeader}
      >
        <SafeAreaX />
      </AssetFrame>
      <AssetFrame
        title="Safe Area — Google"
        fileName="NubiaGo_SafeArea_Google"
        description="Inset safe content region."
        artboard={formats.googleCover}
      >
        <SafeAreaGoogle />
      </AssetFrame>
      <AssetFrame
        title="Safe Area — Instagram Profile"
        fileName="NubiaGo_SafeArea_Instagram"
        description="Circle-safe and square crop guides."
        artboard={formats.profileLg}
      >
        <SafeAreaInstagramProfile />
      </AssetFrame>
    </>
  );
}

export const SocialCoversPage = DigitalPage;
