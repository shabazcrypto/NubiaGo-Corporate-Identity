import { PageHeader, GroupLabel } from '@/components/ui/PageHeader';
import { AssetFrame } from '@/components/ui/AssetFrame';
import { formats } from '@/lib/formats';
import { masterCoverDefs } from '@/components/social/coverDirections';
import {
  facebookCoverDefs,
  xHeaderDefs,
  googleCoverDefs
} from '@/components/social/platformCovers';
import { ProfilePrimary, ProfileSand, ProfileTransparent, photoProfileDefs } from '@/components/social/profileImages';
import { HighlightCover, highlightDefs } from '@/components/social/highlightCovers';
import {
  SafeAreaFacebook,
  SafeAreaX,
  SafeAreaGoogle,
  SafeAreaInstagramProfile
} from '@/components/social/safeAreaGuides';

export function SocialCoversPage() {
  return (
    <>
      <PageHeader
        code="12"
        title="Social Media Cover Kit"
        folder="12_SOCIAL_COVERS"
        description="Campaign covers with studio and Unsplash photography — navy / sand / gold type rails, editorial bands, and platform-safe crops. Profiles and Instagram highlights included."
      />

      <div className="mb-12 grid gap-px bg-gray-200 sm:grid-cols-4">
        {[
          ['Facebook covers', '7 · 1640 × 624'],
          ['X headers', '7 · 1500 × 500'],
          ['Google covers', '6 · 1080 × 608'],
          ['Master covers', '9 · 1920 × 640']
        ].map(([label, value]) => (
          <div key={label} className="bg-gray-50 px-5 py-4">
            <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-gray-500">{label}</div>
            <div className="mt-1 text-[14px] font-medium text-ink">{value}</div>
          </div>
        ))}
      </div>

      {/* 01 Instagram */}
      <GroupLabel note="1080 × 1080">01 Instagram — Profile</GroupLabel>
      <AssetFrame
        title="Instagram — Profile Primary"
        fileName="NubiaGo_Instagram_Profile_Primary"
        description="Wordmark on Primary. Sized to remain legible when the platform crops to a circle."
        artboard={formats.profileLg}
      >
        <ProfilePrimary size={formats.profileLg.width} />
      </AssetFrame>

      <AssetFrame
        title="Instagram — Profile Sand"
        fileName="NubiaGo_Instagram_Profile_Sand"
        description="Wordmark on Warm Sand for softer profile contexts."
        artboard={formats.profileLg}
      >
        <ProfileSand size={formats.profileLg.width} />
      </AssetFrame>

      <AssetFrame
        title="Instagram — Profile Transparent"
        fileName="NubiaGo_Instagram_Profile_Transparent"
        description="Wordmark only on a transparent artboard for compositing."
        artboard={formats.profileLg}
        transparent
        formats={['png']}
      >
        <ProfileTransparent size={formats.profileLg.width} />
      </AssetFrame>

      {photoProfileDefs.map(({ id, Component }) => (
        <AssetFrame
          key={id}
          title={`Instagram — Profile ${id}`}
          fileName={`NubiaGo_Instagram_Profile_${id}`}
          description="Unsplash photography with navy veil and centred wordmark — circle-crop safe."
          artboard={formats.profileLg}
        >
          <Component size={formats.profileLg.width} />
        </AssetFrame>
      ))}

      <GroupLabel note="1080 × 1080 · circle-safe">01 Instagram — Highlights</GroupLabel>
      {highlightDefs.map((h) => (
        <AssetFrame
          key={h.id}
          title={`Instagram Highlight — ${h.label}`}
          fileName={`NubiaGo_Instagram_Highlight_${h.id}`}
          description="Icon and label inside the centre circle (~60% of canvas) so the cover survives Instagram’s circular crop."
          artboard={formats.highlight}
        >
          <HighlightCover label={h.label} Icon={h.Icon} field={h.field} />
        </AssetFrame>
      ))}

      {/* 02 Facebook */}
      <GroupLabel note="1080 × 1080">02 Facebook — Profile</GroupLabel>
      <AssetFrame
        title="Facebook — Profile Primary"
        fileName="NubiaGo_Facebook_Profile_Primary"
        description="Unified Primary profile for Facebook Page / personal use."
        artboard={formats.profileLg}
      >
        <ProfilePrimary size={formats.profileLg.width} />
      </AssetFrame>

      <GroupLabel note="1640 × 624 · 7 directions · desktop + mobile safe">02 Facebook — Covers</GroupLabel>
      {facebookCoverDefs.map(({ id, Component }) => (
        <AssetFrame
          key={id}
          title={`Facebook Cover — ${id}`}
          fileName={`NubiaGo_Facebook_Cover_${id}`}
          description={`${id} direction — type locked to desktop centre safe; photography full-bleed.`}
          artboard={formats.fbCover}
        >
          <Component />
        </AssetFrame>
      ))}

      {/* 03 X / Twitter */}
      <GroupLabel note="800 × 800">03 X / Twitter — Profile</GroupLabel>
      <AssetFrame
        title="X — Profile Primary"
        fileName="NubiaGo_X_Profile_Primary"
        description="Primary profile at X quality (800 × 800)."
        artboard={formats.profileMd}
      >
        <ProfilePrimary size={formats.profileMd.width} />
      </AssetFrame>

      <AssetFrame
        title="X — Profile Sand"
        fileName="NubiaGo_X_Profile_Sand"
        description="Warm Sand profile for X."
        artboard={formats.profileMd}
      >
        <ProfileSand size={formats.profileMd.width} />
      </AssetFrame>

      <GroupLabel note="1500 × 500 · 7 directions · clear bottom-left for avatar">
        03 X / Twitter — Headers
      </GroupLabel>
      {xHeaderDefs.map(({ id, Component }) => (
        <AssetFrame
          key={id}
          title={`X Header — ${id}`}
          fileName={`NubiaGo_X_Header_${id}`}
          description={`${id} direction — content clear of circular profile overlap.`}
          artboard={formats.xHeader}
        >
          <Component />
        </AssetFrame>
      ))}

      {/* 04 Google */}
      <GroupLabel note="720 × 720">04 Google — Profile</GroupLabel>
      <AssetFrame
        title="Google — Profile Primary"
        fileName="NubiaGo_Google_Profile_Primary"
        description="Business Profile avatar at 720 × 720."
        artboard={formats.profileGoogle}
      >
        <ProfilePrimary size={formats.profileGoogle.width} />
      </AssetFrame>

      <GroupLabel note="1080 × 608 · 6 directions">04 Google — Covers</GroupLabel>
      {googleCoverDefs.map(({ id, Component }) => (
        <AssetFrame
          key={id}
          title={`Google Cover — ${id}`}
          fileName={`NubiaGo_Google_Cover_${id}`}
          description={`${id} direction for Google Business Profile.`}
          artboard={formats.googleCover}
        >
          <Component />
        </AssetFrame>
      ))}

      {/* 05 Master Covers */}
      <GroupLabel note="1920 × 640 · 9 directions · studio + Unsplash">05 Master Covers</GroupLabel>
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

      {/* 06 Safe Areas */}
      <GroupLabel note="Guides · downloadable overlays">06 Safe Areas</GroupLabel>
      <AssetFrame
        title="Safe Area — Facebook"
        fileName="NubiaGo_SafeArea_Facebook"
        description="Desktop and mobile crop regions on the full Facebook cover canvas."
        artboard={formats.fbCover}
      >
        <SafeAreaFacebook />
      </AssetFrame>

      <AssetFrame
        title="Safe Area — X Header"
        fileName="NubiaGo_SafeArea_X"
        description="Content safe region and circular profile overlap for X headers."
        artboard={formats.xHeader}
      >
        <SafeAreaX />
      </AssetFrame>

      <AssetFrame
        title="Safe Area — Google"
        fileName="NubiaGo_SafeArea_Google"
        description="Inset safe content region for Google Business Profile covers."
        artboard={formats.googleCover}
      >
        <SafeAreaGoogle />
      </AssetFrame>

      <AssetFrame
        title="Safe Area — Instagram Profile"
        fileName="NubiaGo_SafeArea_Instagram"
        description="Circle-safe and square crop guides for profile images."
        artboard={formats.profileLg}
      >
        <SafeAreaInstagramProfile />
      </AssetFrame>
    </>
  );
}
