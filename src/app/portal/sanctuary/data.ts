export type SanctuaryCategory = {
  slug: string;
  label: string;
  icon: string;
};

export type SanctuaryPost = {
  id: string;
  author: string;
  avatar: string;
  age: string;
  category: string;
  title: string;
  excerpt: string;
  image: string;
  likes: number;
  comments: number;
  bookmarks: number;
};

export type PinnedPost = {
  id: string;
  title: string;
  description: string;
  author: string;
  role: string;
  age: string;
  comments: number;
  avatar: string;
};

export const sanctuaryCategories: SanctuaryCategory[] = [
  { slug: "all", label: "All Discussions", icon: "/shared/icon-category-grid.svg" },
  { slug: "faith-wellness", label: "Faith & Wellness", icon: "/sanctuary/category-faith.svg" },
  { slug: "personal-growth", label: "Personal Growth", icon: "/sanctuary/category-growth.svg" },
  { slug: "marriage-family", label: "Marriage & Family", icon: "/sanctuary/category-family.svg" },
  { slug: "motherhood", label: "Motherhood", icon: "/sanctuary/category-motherhood.svg" },
  { slug: "business-careers", label: "Business & Careers", icon: "/sanctuary/category-business.svg" },
  { slug: "wellness", label: "Wellness", icon: "/sanctuary/category-wellness.svg" },
];

export const pinnedPosts: PinnedPost[] = [
  {
    id: "welcome-to-the-sanctuary",
    title: "New Here? Welcome to the Sanctuary",
    description: "Introduce yourself, say salaam, and become part of our beautiful sisterhood.",
    author: "Sanctuary Admin",
    role: "Admin",
    age: "3 days ago",
    comments: 18,
    avatar: "/sanctuary/avatar-admin-welcome.png",
  },
  {
    id: "community-guidelines",
    title: "Community Guidelines",
    description: "Our principles for a respectful, supportive, and faith-centered space.",
    author: "Sanctuary Admin",
    role: "Admin",
    age: "3 days ago",
    comments: 18,
    avatar: "/sanctuary/avatar-admin-guidelines.png",
  },
];

export const sanctuaryPosts: SanctuaryPost[] = [
  {
    id: "connection-with-allah",
    author: "Sister Noor",
    avatar: "/sanctuary/avatar-sister-noor.png",
    age: "4 hours ago",
    category: "Faith & Reflections",
    title: "How do I strengthen my connection with Allah during busy days?",
    excerpt:
      "Some days feel so full of responsibilities that I struggle to find time for myself and my Deen. What are some ways you all stay connected?",
    image: "/sanctuary/post-quran.png",
    likes: 32,
    comments: 18,
    bookmarks: 18,
  },
  {
    id: "books-that-changed-you",
    author: "Sister Noor",
    avatar: "/sanctuary/avatar-sister-hana.png",
    age: "4 hours ago",
    category: "Faith & Reflections",
    title: "Books that changed your perspective",
    excerpt:
      "Share a book that helped you grow, heal, or see life differently. Always looking for meaningful reads!",
    image: "/sanctuary/post-books.png",
    likes: 32,
    comments: 18,
    bookmarks: 18,
  },
  {
    id: "peaceful-mornings",
    author: "Sister Noor",
    avatar: "/shared/avatar-sister-amina.png",
    age: "4 hours ago",
    category: "Faith & Reflections",
    title: "Tips for peaceful mornings with little ones?",
    excerpt: "Mornings in our house can get a bit chaotic. What are your favorite routines or tips?",
    image: "/sanctuary/post-morning.png",
    likes: 32,
    comments: 18,
    bookmarks: 18,
  },
];

export const aboutSanctuary = [
  { label: "Privacy first", icon: "/sanctuary/privacy.svg" },
  { label: "Kindness always", icon: "kindness" },
  { label: "Diversity welcome", icon: "/sanctuary/diversity.svg" },
];

export const trendingTopics = [
  { label: "Managing stress & anxiety", count: 102 },
  { label: "Marriage advice", count: 86 },
  { label: "Qur'an reflection", count: 72 },
  { label: "Productive routines", count: 41 },
];

export const activeSisters = [
  { name: "Sister Noor", avatar: "/sanctuary/avatar-sister-noor.png" },
  { name: "Sister Hana", avatar: "/sanctuary/avatar-sister-hana.png" },
  { name: "Sister Amina", avatar: "/shared/avatar-sister-amina.png" },
  { name: "Sanctuary Admin", avatar: "/sanctuary/avatar-admin-welcome.png" },
];

export const postTags = ["Faith", "Salah", "Motherhood", "Wellness", "Marriage"];
