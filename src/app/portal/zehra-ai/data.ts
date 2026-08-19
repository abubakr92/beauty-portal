export const zehraTopics = [
  { label: "Islamic Guidance", icon: "/zehra-ai/topic-guidance.svg" },
  { label: "Dua & Supplications", icon: "/zehra-ai/topic-dua.svg" },
  { label: "Quran & Tafsir", icon: "/zehra-ai/topic-quran.svg" },
  { label: "Women's Wellbeing", icon: "/zehra-ai/topic-wellbeing.svg" },
  { label: "Events & Programs", icon: "/zehra-ai/topic-events.svg" },
] as const;

export const suggestedQuestions = [
  "What is the story behind the Day of Ashura?",
  "How can I build a stronger connection with Allah?",
  "Duas for stress and overthinking",
  "What are some ways to grow spiritually every day?",
] as const;

export const conversation = [
  {
    id: 1,
    role: "user",
    message: "I've been feeling overwhelmed lately. What dua can I read?",
    time: "1:28 PM",
  },
  {
    id: 2,
    role: "assistant",
    message:
      "You can begin with heartfelt dua in your own words, and also recite: 'Hasbunallahu wa ni'mal wakeel'. Remember that Allah is near and hears every whisper of the heart.",
    time: "1:20 PM",
  },
  {
    id: 3,
    role: "user",
    message: "How can I feel closer to Allah every day?",
    time: "1:28 PM",
  },
  {
    id: 4,
    role: "assistant",
    message:
      "Start small and stay consistent: pray on time, recite a few verses of Qur'an daily, make dhikr in quiet moments, and speak to Allah sincerely. Consistency brings to the heart.",
    time: "1:20 PM",
  },
] as const;

export const zehraReplies = [
  "You can begin with heartfelt dua in your own words, and also recite: 'Hasbunallahu wa ni'mal wakeel'. Remember that Allah is near and hears every whisper of the heart.",
  "Start small and stay consistent: pray on time, recite a few verses of Qur'an daily, make dhikr in quiet moments, and speak to Allah sincerely. Consistency brings peace to the heart.",
  "Take a slow breath, make wudu if you can, and speak to Allah exactly as you are. A sincere heart does not need perfect words.",
  "Try setting aside five quiet minutes after salah for dhikr and reflection. Small, regular moments of worship often become the strongest anchors.",
  "When your heart feels heavy, remember that difficulty is not a sign that Allah has left you. Turn to Him gently, one prayer and one day at a time.",
  "You may find comfort in reciting Surah Ash-Sharh and reflecting on its reminder that ease accompanies hardship.",
  "Write down one blessing, one worry, and one dua today. Gratitude and honest dua together can help bring clarity to the heart.",
] as const;
