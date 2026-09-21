/** Local hero photography for social covers — Unsplash + studio set. */

const base = `${import.meta.env.BASE_URL}social/heroes`;

export const HERO = {
  corporate: `${base}/nubiago-hero-corporate.png`,
  marketplace: `${base}/nubiago-hero-marketplace.png`,
  connect: `${base}/nubiago-hero-connect.png`,
  discover: `${base}/nubiago-hero-discover.png`,
  minimal: `${base}/nubiago-hero-minimal.png`,
  teamMeeting: `${base}/unsplash/team-meeting.jpg`,
  handshake: `${base}/unsplash/handshake.jpg`,
  warehouse: `${base}/unsplash/warehouse.jpg`,
  marketStall: `${base}/unsplash/market-stall.jpg`,
  womanCeo: `${base}/unsplash/woman-ceo.jpg`,
  portCrane: `${base}/unsplash/port-crane.jpg`,
  atelier: `${base}/unsplash/atelier.jpg`,
  collab: `${base}/unsplash/collab.jpg`,
  spices: `${base}/unsplash/spices-market.jpg`,
  architect: `${base}/unsplash/architect.jpg`,
  portraitMan: `${base}/unsplash/portrait-man.jpg`,
  fabric: `${base}/unsplash/fabric.jpg`,
  africanMarket: `${base}/unsplash/african-market.jpg`,
  businesswoman: `${base}/unsplash/businesswoman.jpg`,
  shipping: `${base}/unsplash/shipping.jpg`,
  cargoBay: `${base}/unsplash/cargo-bay.jpg`
} as const;

export type HeroKey = keyof typeof HERO;
