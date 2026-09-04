export const communityBenefits = [
  {
    icon: "/join-community/benefit-trusted.svg",
    title: "Build Trust",
    description: "Create a professional presence within a values-aligned community where women can discover businesses with confidence.",
  },
  {
    icon: "/join-community/benefit-visibility.svg",
    title: "Get Discovered",
    description: "Make it easier for women to find your products, services, and professional offerings when they are looking for businesses like yours.",
  },
  {
    icon: "/join-community/benefit-growth.svg",
    title: "Grow Your Visibility",
    description: "Unlock business-member opportunities, promotions, featured placements, events, and tools designed to help your business grow.",
  },
] as const;

export const membershipPlans = [
  {
    id: "emerald",
    badge: "/join-community/membership-emerald.webp",
    name: "Emerald Membership",
    monthlyPrice: 15,
    annualPrice: 150,
    annualSavings: 30,
    description: "Build your presence and make it easier for your community to discover you.",
    bestFor: "Best for new and growing businesses",
    features: [
      "Professional business directory profile",
      "Business category and location",
      "Website and social media links",
      "Booking and contact links",
      "Up to 5 business photos",
      "Emerald Member badge",
      "1 promotional offer per month",
      "Standard business insights",
      "Access to eligible business-member opportunities",
    ],
  },
  {
    id: "gold",
    badge: "/join-community/membership-gold.webp",
    name: "Gold Membership",
    monthlyPrice: 25,
    annualPrice: 250,
    annualSavings: 50,
    description: "For businesses ready for greater visibility, promotion, and opportunities to stand out.",
    bestFor: "Best for businesses focused on visibility and growth",
    features: [
      "Everything included in Emerald",
      "Priority directory placement",
      "Up to 15 business photos",
      "Enhanced business insights",
      "Additional monthly promotional opportunities",
      "Priority consideration for Business Spotlights",
      "Business story feature eligibility",
      "Priority consideration for featured campaigns",
      "Priority access to selected events and vendor opportunities",
    ],
  },
] as const;

export const communityValues = [
  ["/join-community/value-faith.svg", "Values-Aligned", "A community built with shared values in mind."],
  ["/join-community/value-woman.svg", "Women-Focused", "Created to support women-led businesses and the women who discover them."],
  ["/join-community/value-purpose.svg", "Community-Driven", "Built around meaningful connection, discovery, and support."],
  ["/join-community/value-global.svg", "Designed for Growth", "Business tools and opportunities created to help strengthen your visibility."],
] as const;

export type MembershipPlan = (typeof membershipPlans)[number];
