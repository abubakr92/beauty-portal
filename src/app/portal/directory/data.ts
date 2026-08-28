export type FeaturedBusiness = {
  id: string;
  name: string;
  category: string;
  rating: number;
  reviews: number;
  image: string;
  avatar: string;
};

export type BusinessListing = {
  id: string;
  name: string;
  description: string;
  category: string;
  location: string;
  rating: number;
  reviews: number;
  image: string;
  website: string;
};

export type BusinessProfile = {
  id: string;
  name: string;
  category: string;
  rating: number;
  reviews: number;
  avatar: string;
  description: string;
  gallery: Array<{ src: string; alt: string }>;
  contact: {
    phone: string;
    email: string;
    instagram: string;
    website: string;
    location: string;
  };
  serviceArea: string;
  hours: Array<{ day: string; time: string }>;
};

export const featuredBusinesses: FeaturedBusiness[] = [
  {
    id: "nour-hamza-bakery",
    name: "Nour & Hamza Bakery",
    category: "Food & Cuisine",
    rating: 5,
    reviews: 20,
    image: "/shared/business-dome.png",
    avatar: "/directory/business-nour-hamza.png",
  },
  {
    id: "lily-birds-modest-boutique",
    name: "Lily & Bird's Modest Boutique",
    category: "Modest Fashion",
    rating: 5,
    reviews: 20,
    image: "/shared/business-lantern-sky.png",
    avatar: "/directory/business-lily-bird.png",
  },
  {
    id: "sweet-sunnah-catering",
    name: "Sweet Sunnah Catering",
    category: "Food & Cuisine",
    rating: 5,
    reviews: 20,
    image: "/shared/business-mosque-night.png",
    avatar: "/directory/business-nour-hamza.png",
  },
];

export const businessListings: BusinessListing[] = [
  {
    id: "plants-bookish-decals",
    name: "Plants & Bookish Decals",
    description: "Handmade botanical prints and Islamic wall art for your sacred home space.",
    category: "Home & Decor",
    location: "Islamabad, PK",
    rating: 5,
    reviews: 20,
    image: "/directory/listing-plants-books.png",
    website: "#",
  },
  {
    id: "saha-serene-tutoring",
    name: "Saha & Serene Tutoring",
    description: "Faith-aligned tutoring for children and teens — Quran, academics, skills.",
    category: "Education",
    location: "Islamabad, PK",
    rating: 5,
    reviews: 20,
    image: "/directory/listing-tutoring.png",
    website: "#",
  },
  {
    id: "haze-beauty-studio",
    name: "Haze Beauty Studio",
    description: "Halal certified skincare, modest makeup, and self-care rituals rooted in sunnah.",
    category: "Beauty & Skincare",
    location: "Islamabad, PK",
    rating: 5,
    reviews: 20,
    image: "/shared/mosque-hill.png",
    website: "#",
  },
  {
    id: "blaze-home-shopping",
    name: "Blaze Home Shopping",
    description: "Thoughtfully designed home essentials and Islamic decor for every room.",
    category: "Home & Decor",
    location: "Islamabad, PK",
    rating: 5,
    reviews: 20,
    image: "/directory/listing-blaze-home.png",
    website: "#",
  },
  {
    id: "spice-sunnah-kitchen",
    name: "Spice & Sunnah Kitchen",
    description: "Halal spice blends, recipe guides, and meal kits inspired by Muslim cuisines.",
    category: "Food & Cuisine",
    location: "Islamabad, PK",
    rating: 5,
    reviews: 20,
    image: "/shared/mosque-hill.png",
    website: "#",
  },
  {
    id: "light-legacy-photography",
    name: "Light & Legacy Photography",
    description: "Capturing your story with modesty and meaning — portraits, events, shoots.",
    category: "Photography",
    location: "Islamabad, PK",
    rating: 5,
    reviews: 20,
    image: "/directory/listing-light-legacy.png",
    website: "#",
  },
];

export const categoryFilters = [
  "All Categories",
  "Wellness",
  "Prayer",
  "Fashion/Clothing",
  "Education",
  "Shops",
  "Prayer",
];

export const trendingCategories = [
  { name: "Modest Fashion", count: 102 },
  { name: "Food & Cuisine", count: 86 },
  { name: "Cooking & Cleaning", count: 72 },
  { name: "Beauty & Skincare", count: 41 },
];

export const topRatedBusinesses = [
  { name: "Nour & Hamza Bakery", avatar: "/directory/business-nour-hamza.png" },
  { name: "Lily & Bird's Modest Boutique", avatar: "/directory/business-lily-bird.png" },
  { name: "Light & Legacy Photography", avatar: "/directory/business-light-legacy.png" },
  { name: "Sweet Sunnah Catering", avatar: "/directory/business-nour-hamza.png" },
];

export const cities = ["Toronto", "Ottawa", "Miami", "New York", "London", "Dubai"];

export const businessProfiles: Record<string, BusinessProfile> = {
  "nour-hamza-bakery": {
    id: "nour-hamza-bakery",
    name: "Nour & Hamza Bakery",
    category: "Food & Dining",
    rating: 4.9,
    reviews: 234,
    avatar: "/directory/profile-nour-hamza.png",
    description:
      "Nour & Sunnah Kitchen is Dearborn's most-loved halal catering service, specializing in authentic Middle Eastern cuisine for weddings, corporate events, and family gatherings.",
    gallery: [
      { src: "/shared/business-dome.png", alt: "Ornate mosque dome illuminated at night" },
      { src: "/shared/business-lantern-sky.png", alt: "Decorative lantern among clouds and flowers" },
      { src: "/shared/business-mosque-night.png", alt: "Mosque surrounded by palm trees under a starry sky" },
      { src: "/shared/business-feast.png", alt: "Middle Eastern feast arranged beneath warm lanterns" },
      { src: "/directory/gallery-quran.png", alt: "Open Quran beneath a hanging lantern" },
      { src: "/directory/gallery-mosque-sunset.png", alt: "Mosque on a hill at sunset" },
    ],
    contact: {
      phone: "(313) 555-0192",
      email: "hello@noursunnah.com",
      instagram: "@noursunnah",
      website: "noursunnah.com",
      location: "Dearborn, MI",
    },
    serviceArea: "Dearborn, MI · Serves Metro Detroit",
    hours: [
      { day: "Mon – Fri", time: "9:00 AM – 8:00 PM" },
      { day: "Saturday", time: "10:00 AM – 6:00 PM" },
      { day: "Sunday", time: "Closed" },
    ],
  },
};

for (const business of [...featuredBusinesses.slice(1), ...businessListings]) {
  if (businessProfiles[business.id]) continue;
  businessProfiles[business.id] = {
    ...businessProfiles["nour-hamza-bakery"],
    id: business.id,
    name: business.name,
    category: business.category,
    avatar: "avatar" in business ? business.avatar : business.image,
    description: "description" in business ? business.description : `Discover ${business.name}, a women-owned business serving the Nothing But Beauty community.`,
  };
}

businessProfiles["hijab-beautique"] = {
  ...businessProfiles["nour-hamza-bakery"],
  id: "hijab-beautique",
  name: "Hijab Beautique",
  category: "Modest Fashion",
  avatar: "/dashboard/messages/fatima-khan.png",
  description: "A women-led modest fashion boutique offering thoughtfully selected styles for everyday confidence.",
};
