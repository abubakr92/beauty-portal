export type EventItem = {
  id: string;
  title: string;
  category: string;
  image: string;
  dayName: string;
  day: string;
  month: string;
  time: string;
  location: string;
  description: string;
  audience: string;
  spotsLeft: number;
};

export type EventDetails = EventItem & {
  heroTitle: string;
  heroDate: string;
  heroLocation: string;
  about: string;
  heroImage: string;
  availability: string;
  registrationLabel: string;
  displayPrice: string;
  organizer: {
    name: string;
    role: string;
    avatar: string;
    phone: string;
    email: string;
  };
  formatTitle: string;
  formatDescription: string;
};

export const eventCategories = [
  "All Events",
  "Workshops",
  "Majalis & Programs",
  "Networking",
  "Retreats",
  "Youth & Family",
];

export const events: EventItem[] = [
  {
    id: "vision-purpose-workshop",
    title: "Vision & Purpose Workshop",
    category: "Workshop",
    image: "/events/vision-purpose.png",
    dayName: "MON",
    day: "24",
    month: "AUG",
    time: "11:00 AM – 1:00 PM",
    location: "Islamabad, PK",
    description: "A guided workshop to help you reconnect with your goals, clarify your vision and create a faith-centered plan.",
    audience: "Women Only",
    spotsLeft: 25,
  },
  {
    id: "quran-reflection-circle",
    title: "Qur'an Reflection Circle",
    category: "Workshop",
    image: "/events/quran-reflection.png",
    dayName: "MON",
    day: "25",
    month: "AUG",
    time: "11:00 AM – 1:00 PM",
    location: "Islamabad, PK",
    description: "A structured circle to reflect on the lessons of the Qur'an and how it guides our daily lives.",
    audience: "Women Only",
    spotsLeft: 25,
  },
  {
    id: "self-care-in-islam",
    title: "Self Care in Islam",
    category: "Workshop",
    image: "/events/self-care.png",
    dayName: "MON",
    day: "31",
    month: "AUG",
    time: "11:00 AM – 1:00 PM",
    location: "Islamabad, PK",
    description: "Learn practical Islamic self-care habits for your mind, body, and soul.",
    audience: "Women Only",
    spotsLeft: 25,
  },
  {
    id: "preparing-hearts-muharram",
    title: "Preparing Our Hearts for Muharram",
    category: "Workshop",
    image: "/shared/business-feast.png",
    dayName: "MON",
    day: "07",
    month: "AUG",
    time: "11:00 AM – 1:00 PM",
    location: "Islamabad, PK",
    description: "A spiritual workshop and progressive session to approach the month of Muharram with intention and gratitude.",
    audience: "Women Only",
    spotsLeft: 25,
  },
];

export const categoryCounts = [
  { label: "All Events", count: 102 },
  { label: "Workshops", count: 86 },
  { label: "Majalis & Programs", count: 72 },
  { label: "Networking", count: 41 },
  { label: "Retreats", count: 28 },
  { label: "Youth & Family", count: 15 },
];

export const eventDetails: Record<string, EventDetails> = Object.fromEntries(
  events.map((event, index) => [
    event.id,
    {
      ...event,
      heroTitle: index === 0 ? "Nour & Hamza Bakery" : event.title,
      heroDate: "Friday, May 24 · 2:00 PM – 4:00 PM EST",
      heroLocation: "Online",
      about:
        "A guided workshop to help you clarify your purpose, set intentional goals, and align your life with your values as a Muslim woman. Together we'll explore the spiritual dimensions of goal-setting.",
      heroImage: "/events/event-detail-hero.webp",
      availability: "12 spots remaining",
      registrationLabel: "Free",
      displayPrice: "$15",
      organizer: {
        name: "Sister Layla",
        role: "Host",
        avatar: "/shared/avatar-sister-amina.png",
        phone: "0000 0000000",
        email: "aminaj10@email.com",
      },
      formatTitle: "Online Event",
      formatDescription: "Zoom link sent to registered attendees 24h before the event.",
    },
  ]),
) as Record<string, EventDetails>;
