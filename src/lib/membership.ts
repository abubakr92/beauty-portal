export type MembershipTier = "emerald" | "gold";

const MEMBERSHIP_STATUS_KEY = "nbb-membership-status";
const MEMBERSHIP_TIER_KEY = "nbb-membership-tier";

export function hasActiveMembership() {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(MEMBERSHIP_STATUS_KEY) === "active";
}

export function activateMembership(tier: MembershipTier) {
  window.localStorage.setItem(MEMBERSHIP_STATUS_KEY, "active");
  window.localStorage.setItem(MEMBERSHIP_TIER_KEY, tier);
  window.dispatchEvent(new Event("nbb:membership-change"));
}

export function clearMockSession() {
  window.localStorage.removeItem(MEMBERSHIP_STATUS_KEY);
  window.localStorage.removeItem(MEMBERSHIP_TIER_KEY);
  window.dispatchEvent(new Event("nbb:membership-change"));
}
