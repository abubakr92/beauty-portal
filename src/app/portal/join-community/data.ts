export const communityBenefits = [
  {
    icon: "/join-community/benefit-trusted.svg",
    title: "Trusted Business Presence",
    description: "Build credibility through a professional profile in a values-aligned directory.",
  },
  {
    icon: "/join-community/benefit-visibility.svg",
    title: "Greater Visibility",
    description: "Help women discover your products, services, and expertise more easily.",
  },
  {
    icon: "/join-community/benefit-growth.svg",
    title: "More Opportunities to Grow",
    description: "Connect with customers, collaborations, promotions, and community opportunities.",
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
    description: "A strong foundation for building your business presence in the community.",
    bestFor: "Best for new and growing businesses",
    features: [
      "Business directory listing",
      "Up to 5 business photos",
      "Essential profile and contact links",
      "Standard visibility and analytics",
      "Community access and support",
    ],
  },
  {
    id: "gold",
    badge: "/join-community/membership-gold.webp",
    name: "Gold Membership",
    monthlyPrice: 25,
    annualPrice: 250,
    annualSavings: 50,
    description: "Expanded visibility tools for businesses ready to grow their reach.",
    bestFor: "Best for businesses focused on visibility and growth",
    features: [
      "Everything included in Emerald",
      "Up to 15 business photos",
      "Priority placement opportunities",
      "Advanced visibility and analytics",
      "Priority consideration for business spotlights",
    ],
  },
] as const;

export const communityValues = [
  ["/join-community/value-faith.svg", "Values-Aligned", "A business community grounded in trust, integrity, and shared values."],
  ["/join-community/value-woman.svg", "Women-Focused", "Built to help women-owned businesses be seen, supported, and celebrated."],
  ["/join-community/value-purpose.svg", "Community-Driven", "Grow through meaningful customer relationships and collaboration."],
  ["/join-community/value-global.svg", "Designed for Growth", "Practical visibility and profile tools that support every stage of business."],
] as const;

export type MembershipPlan = (typeof membershipPlans)[number];
