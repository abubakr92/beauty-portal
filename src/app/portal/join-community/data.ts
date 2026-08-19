export const communityBenefits = [
  {
    icon: "/join-community/benefit-trusted.svg",
    title: "Trusted Community",
    description: "Join a verified, faith-aligned network of women.",
  },
  {
    icon: "/join-community/benefit-visibility.svg",
    title: "Increase Visibility",
    description: "Showcase your business to thousands of potential customers.",
  },
  {
    icon: "/join-community/benefit-growth.svg",
    title: "Grow & Flourish",
    description: "Access tools, promotions, and opportunities to grow.",
  },
] as const;

export const membershipPlans = [
  {
    id: "emerald",
    badge: "/join-community/membership-emerald.webp",
    name: "Emerald Membership",
    price: "$15",
    description: "Perfect for new & growing business owners\n(annual)",
    features: [
      "Business directory listing",
      "Up to 5 photos",
      "1 monthly promotion",
      "Standard analytics",
      "Forum access",
      "Community support",
      "Searchable badge",
    ],
  },
  {
    id: "gold",
    badge: "/join-community/membership-gold.webp",
    name: "Gold Membership",
    price: "$25",
    description: "For established businesses wanting\ngreater visibility",
    features: [
      "Everything in Emerald",
      "Up to 15 photos",
      "Priority promotion",
      "Advanced analytics",
      "Featured in spotlights",
      "Business directory listing",
      "Business story feature",
    ],
  },
] as const;

export const communityValues = [
  ["/join-community/value-faith.svg", "Faith-Centered Community", "Values-driven marketplace"],
  ["/join-community/value-woman.svg", "Woman-Led", "Supporting Muslim women"],
  ["/join-community/value-purpose.svg", "Purpose-Driven", "Impact with intention"],
  ["/join-community/value-global.svg", "Global Reach", "Connect worldwide"],
] as const;
