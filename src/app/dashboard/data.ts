export type MembershipTier = "gold" | "emerald";

export type BusinessProfile = {
  ownerName: string;
  businessName: string;
  initials: string;
  membershipTier: MembershipTier;
  memberSince: string;
  location: string;
  category: string;
  profileCompletion: number;
};

export const currentBusiness: BusinessProfile = {
  ownerName: "Aisha",
  businessName: "Hijab Beautique",
  initials: "HB",
  membershipTier: "emerald",
  memberSince: "May 2025",
  location: "Mississauga, ON",
  category: "Modest Fashion",
  profileCompletion: 78,
};

export const membershipThemes = {
  emerald: {
    label: "Emerald Membership",
    shortLabel: "Emerald Member",
    accent: "#d6ab68",
  },
  gold: {
    label: "Gold Membership",
    shortLabel: "Gold Member",
    accent: "#b68949",
  },
} satisfies Record<MembershipTier, { label: string; shortLabel: string; accent: string }>;

export const dashboardMetrics = [
  { value: "152", label: "Profile Views" },
  { value: "152", label: "Contact Clicks" },
  { value: "152", label: "Saves" },
  { value: "12", label: "Reviews" },
];

export const quickActions = [
  { label: "Edit Profile", href: "/dashboard/profile/edit", icon: "/dashboard/shared/edit-profile.svg" },
  { label: "My Listings / Services", href: "/dashboard/services/new", icon: "/dashboard/shared/manage-services.svg" },
  { label: "Photos and Gallery", href: "/dashboard/profile/gallery", icon: "/dashboard/shared/gallery.svg" },
  { label: "Insights", href: "/dashboard/analytics", icon: "/dashboard/shared/analytics.svg" },
  { label: "Reviews", href: "/dashboard#reviews", icon: "/dashboard/shared/reviews.svg" },
  { label: "Messages", href: "/dashboard/messages", icon: "/dashboard/shared/messages.svg" },
  { label: "Saved Items", href: "/dashboard/saved", icon: "/dashboard/shared/saved-items.svg" },
];

export const recentActivity = [
  { title: "Your profile was viewed", time: "2 hours ago", icon: "/dashboard/shared/activity-eye.svg" },
  { title: "New message from Sara K,", time: "3 hours ago", icon: "/dashboard/shared/activity-message.svg" },
  { title: "New review received", time: "1 day ago", icon: "/dashboard/shared/activity-review.svg" },
  { title: "New offer created", time: "2 days ago", icon: "/dashboard/shared/activity-tag.svg" },
];
