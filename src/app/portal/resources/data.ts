export const resourceTabs = [
  "Lectures",
  "PDFs",
  "Slideshows",
  "Audio Recordings",
  "Scholar Collections",
  "Articles",
] as const;

export type LibraryResource = {
  id: number;
  image: string;
  title: string;
  scholar: string;
  description: string;
  format: string;
  topic: string;
  date: string;
  language: string;
  collection: string;
  sourceUrl: string;
};

export const libraryResources: LibraryResource[] = [
  { id: 1, image: "/resources/resource-quran.webp", title: "Tafsir Surah Al-Baqarah (1-10)", scholar: "Dr. Aisha Waheed", description: "A detailed study of the first ten verses with depth and clarity.", format: "Lectures", topic: "Tafsir", date: "2025-05-18", language: "English", collection: "Qur'an Studies", sourceUrl: "https://drive.google.com/" },
  { id: 2, image: "/resources/resource-dates.webp", title: "Du'a for Every Occasion", scholar: "Ustadha Fatima", description: "A practical collection of duas for everyday moments and milestones.", format: "PDFs", topic: "Fiqh", date: "2025-06-04", language: "English", collection: "Daily Worship", sourceUrl: "https://drive.google.com/" },
  { id: 3, image: "/resources/resource-journal.webp", title: "A Guided Tazkiyah Journal", scholar: "Ustadha Maryam", description: "Reflection prompts designed to support intentional spiritual growth.", format: "Slideshows", topic: "Tazkiyah", date: "2025-06-21", language: "English", collection: "Spiritual Wellness", sourceUrl: "https://drive.google.com/" },
  { id: 4, image: "/resources/resource-lantern.webp", title: "Lessons from the Seerah", scholar: "Ustadha Hana Malik", description: "An audio series connecting Prophetic lessons to modern community life.", format: "Audio Recordings", topic: "Seerah", date: "2025-07-09", language: "Urdu", collection: "Seerah Series", sourceUrl: "https://drive.google.com/" },
  { id: 5, image: "/resources/resource-open-book.webp", title: "Raising Righteous Children", scholar: "Dr. Aisha Waheed", description: "Faith-centered guidance for nurturing resilient and compassionate children.", format: "Articles", topic: "Community", date: "2025-08-28", language: "English", collection: "Family Life", sourceUrl: "https://drive.google.com/" },
];

export const formatCounts = [
  ["Workshops", 102],
  ["PDFs", 86],
  ["Slideshows", 72],
  ["Audio Recordings", 72],
  ["Lectures", 72],
  ["Scholar Collections", 72],
  ["Articles", 41],
] as const;

export const popularTopics = [
  "Tafsir",
  "Fiqh",
  "Tazkiyah",
  "Seerah",
  "Community",
  "Spiritual Wellness",
  "Muharram",
] as const;

export const recentlyAdded = [
  ["Salam Made Simple (1-10)", "Dr. Aisha Waheed · Aug 28, 2025"],
  ["Du'a for Every Occasion (1-10)", "Ustadha Fatima · Aug 28, 2025"],
  ["Navigating Life as a Muslim...", "Ustadha Maryam · Aug 28, 2025"],
  ["Raising Righteous Children", "Ustadha Hana Malik · Aug 28, 2025"],
] as const;

export const scholarCollections = [
  "/resources/collection-book-lantern.webp",
  "/resources/collection-quran.webp",
  "/resources/collection-lantern.webp",
  "/resources/collection-moon.webp",
] as const;
