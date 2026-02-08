export type LoveStyle =
  | "Soft & Sentimental"
  | "Thoughtful & Practical"
  | "Comfort & Care"
  | "Stylish & Aesthetic"
  | "Experiential & Immersive";

export type RelationshipType =
  | "Romantic partner"
  | "Friend"
  | "Family member"
  | "Myself";

export interface QuizOption {
  label: string;
  styles: LoveStyle[];
}

export interface QuizQuestion {
  id: number;
  section: "About Them" | "How They Experience Gifts" | "You";
  question: string;
  options: QuizOption[];
  maxSelect: number;
  type: "choice" | "freetext";
  isRequired?: boolean;
}

export const quizQuestions: QuizQuestion[] = [
  // SECTION 1: ABOUT THEM
  {
    id: 1,
    section: "About Them",
    question: "What would {name} appreciate most on a random Wednesday?",
    type: "choice",
    maxSelect: 1,
    options: [
      {
        label: "A heartfelt note or sweet message",
        styles: ["Soft & Sentimental"],
      },
      {
        label: "Something useful they actually need",
        styles: ["Thoughtful & Practical"],
      },
      {
        label: "Something to make them relax and rest",
        styles: ["Comfort & Care"],
      },
      {
        label: "Something stylish they can show off",
        styles: ["Stylish & Aesthetic"],
      },
      {
        label: "A surprise outing or adventure",
        styles: ["Experiential & Immersive"],
      },
    ],
  },
  {
    id: 2,
    section: "About Them",
    question:
      'When {name} opens a gift, what typically makes them go "Oh wow"?',
    type: "choice",
    maxSelect: 2,
    options: [
      { label: "The meaning behind it", styles: ["Soft & Sentimental"] },
      { label: "How useful it is", styles: ["Thoughtful & Practical"] },
      { label: "How comforting it feels", styles: ["Comfort & Care"] },
      { label: "How beautiful it looks", styles: ["Stylish & Aesthetic"] },
      {
        label: "The experience or memory it creates",
        styles: ["Experiential & Immersive"],
      },
    ],
  },
  {
    id: 3,
    section: "About Them",
    question: "When {name} is stressed, what would comfort them the most?",
    type: "choice",
    maxSelect: 2,
    options: [
      {
        label: "Words of reassurance and emotional support",
        styles: ["Soft & Sentimental"],
      },
      {
        label: "Someone handling things for them",
        styles: ["Thoughtful & Practical"],
      },
      { label: "Good food, rest, or pampering", styles: ["Comfort & Care"] },
      {
        label: "Retail therapy or a fresh look",
        styles: ["Stylish & Aesthetic"],
      },
      {
        label: "A fun distraction or spontaneous plan",
        styles: ["Experiential & Immersive"],
      },
    ],
  },
  // SECTION 2: HOW THEY EXPERIENCE GIFTS
  {
    id: 4,
    section: "How They Experience Gifts",
    question: "What gets {name} genuinely excited?",
    type: "choice",
    maxSelect: 3,
    options: [
      {
        label: "Beautiful packaging or visuals",
        styles: ["Stylish & Aesthetic"],
      },
      { label: "Physical touch and texture", styles: ["Comfort & Care"] },
      {
        label: "Food or sweet treats",
        styles: ["Comfort & Care", "Thoughtful & Practical"],
      },
      {
        label: "Scents, perfumes, candles",
        styles: ["Stylish & Aesthetic", "Comfort & Care"],
      },
      {
        label: "Music, voice notes, sound",
        styles: ["Soft & Sentimental", "Experiential & Immersive"],
      },
      { label: "Memories & meaning", styles: ["Soft & Sentimental"] },
    ],
  },
  {
    id: 5,
    section: "How They Experience Gifts",
    question:
      "If you could do or gift ONE THING to {name} that will remain unforgettable to them for a long time, what would that be?",
    type: "choice",
    maxSelect: 1,
    options: [
      {
        label: "Write them something from your heart",
        styles: ["Soft & Sentimental"],
      },
      {
        label: "Gift them something personalized",
        styles: ["Thoughtful & Practical"],
      },
      {
        label: "Take care of something stressing them out",
        styles: ["Comfort & Care"],
      },
      {
        label: "Surprise them with something they'll like to show off",
        styles: ["Stylish & Aesthetic"],
      },
      { label: "Plan a special outing", styles: ["Experiential & Immersive"] },
    ],
  },
  // SECTION 3: YOU
  {
    id: 6,
    section: "You",
    question:
      "How involved do you want to be in creating this gift for {name}?",
    type: "choice",
    maxSelect: 1,
    options: [
      {
        label: "I want to curate it myself (with guidance)",
        styles: ["Soft & Sentimental", "Thoughtful & Practical"],
      },
      {
        label: "I want help so I don't mess it up",
        styles: ["Comfort & Care", "Stylish & Aesthetic"],
      },
      {
        label: "I want everything handled for me",
        styles: ["Experiential & Immersive", "Stylish & Aesthetic"],
      },
    ],
  },
  {
    id: 7,
    section: "You",
    question: "What's your budget style for this gift for {name}?",
    type: "choice",
    maxSelect: 1,
    options: [
      {
        label: "I want to go all out",
        styles: ["Experiential & Immersive", "Stylish & Aesthetic"],
      },
      {
        label: "I want something balanced \u2014 quality but reasonable",
        styles: ["Thoughtful & Practical", "Comfort & Care"],
      },
      {
        label: "I want something simple but deeply meaningful",
        styles: ["Soft & Sentimental", "Comfort & Care"],
      },
    ],
  },
  {
    id: 8,
    section: "You",
    question: "When do you need this gift ready?",
    type: "choice",
    maxSelect: 1,
    options: [
      {
        label: "ASAP \u2014 I need it now!",
        styles: ["Experiential & Immersive"],
      },
      { label: "Before Valentine's Day", styles: ["Thoughtful & Practical"] },
      { label: "On Valentine's Day itself", styles: ["Soft & Sentimental"] },
      { label: "After Valentine's \u2014 no rush", styles: ["Comfort & Care"] },
    ],
  },
  {
    id: 9,
    section: "You",
    question: "Anything else we should know about {name}?",
    type: "freetext",
    maxSelect: 0,
    options: [],
  },
];

export interface LoveStyleInfo {
  name: LoveStyle;
  tagline: string;
  description: string;
  giftMessage: string;
  giftIdeas: string[];
  color: string;
}

export const loveStyleDetails: Record<LoveStyle, LoveStyleInfo> = {
  "Soft & Sentimental": {
    name: "Soft & Sentimental",
    tagline: "Emotional Connection & Thoughtful Gestures",
    description:
      "They feel most loved through emotional connection and thoughtful gestures. A simple, heartfelt gift that shows you know them deeply will make them smile like no other this Valentine.",
    giftMessage: '"I see you. You matter to me. I am here for you."',
    giftIdeas: [
      "A personalized love letter or handwritten poem",
      "A custom scrapbook or photo album of your memories together",
      "A video montage of your favourite moments with a heartfelt voiceover",
      "An engraved keepsake with a message only they would understand",
    ],
    color: "hsl(350, 50%, 38%)",
  },
  "Thoughtful & Practical": {
    name: "Thoughtful & Practical",
    tagline: "Support & Convenience",
    description:
      "They feel loved most through support and convenience. They appreciate gifts that solve a problem or make their life easier. A gift that meets a need or adds convenience will win them over.",
    giftMessage: '"I pay attention to your daily life and convenience."',
    giftIdeas: [
      "A subscription or tool that solves a recurring problem for them",
      "A curated 'stress-free day' package: errands handled, meals prepped",
      "An upgrade to something they use daily (headphones, bag, planner)",
      "A wellness or productivity gadget they've been eyeing",
    ],
    color: "hsl(38, 65%, 50%)",
  },
  "Comfort & Care": {
    name: "Comfort & Care",
    tagline: "Relaxation, Attention & Well-being",
    description:
      "They feel most loved through care, relaxation, attention, and comfort. Thoughtful touches like cozy items, pampering treats, or restful experiences will make Valentine unforgettable.",
    giftMessage: '"You are safe with me. Your well-being matters to me."',
    giftIdeas: [
      "A spa day or at-home pampering kit with candles, bath salts, and a robe",
      "A luxury comfort set: premium blanket, slippers, and their favourite treats",
      "A couples' massage experience or wellness retreat",
      "A curated self-care subscription box tailored to their preferences",
    ],
    color: "hsl(170, 40%, 40%)",
  },
  "Stylish & Aesthetic": {
    name: "Stylish & Aesthetic",
    tagline: "Elegance, Beauty & Sophistication",
    description:
      "They are inspired by style, elegance, and beauty. They notice visual appeal, presentation, and sophistication. Gifts that are stylish, well-presented, or feel luxurious will truly impress them.",
    giftMessage: '"This fits you. You deserve nice things."',
    giftIdeas: [
      "A beautifully packaged luxury fragrance or designer accessory",
      "A curated fashion or jewellery piece matching their personal style",
      "An artfully arranged flower arrangement or premium chocolate box",
      "A stylish home decor piece or limited-edition art print",
    ],
    color: "hsl(260, 35%, 45%)",
  },
  "Experiential & Immersive": {
    name: "Experiential & Immersive",
    tagline: "Moments, Memories & Adventures",
    description:
      "They value moments, memories, and experiences over objects. Surprises, outings, or shared experiences make them feel loved more than a material gift. A unique, memorable gesture will be unforgettable.",
    giftMessage: '"I wanted this to be unique and memorable."',
    giftIdeas: [
      "A surprise weekend getaway or overnight staycation",
      "Tickets to a concert, show, or unique experience they've never tried",
      "A private dinner cruise, rooftop experience, or scenic adventure",
      "A customised date itinerary with multiple surprise activities",
    ],
    color: "hsl(20, 60%, 50%)",
  },
};

export interface QuizAnswer {
  questionId: number;
  selectedStyles: LoveStyle[];
  freeText?: string;
}

export interface StyleScore {
  style: LoveStyle;
  percentage: number;
}

export function calculateResults(answers: QuizAnswer[]): StyleScore[] {
  const counts: Record<LoveStyle, number> = {
    "Soft & Sentimental": 0,
    "Thoughtful & Practical": 0,
    "Comfort & Care": 0,
    "Stylish & Aesthetic": 0,
    "Experiential & Immersive": 0,
  };

  for (const answer of answers) {
    for (const style of answer.selectedStyles) {
      counts[style]++;
    }
  }

  const total = Object.values(counts).reduce((sum, c) => sum + c, 0) || 1;

  const sorted = Object.entries(counts)
    .sort(([, a], [, b]) => b - a)
    .map(([style, count]) => ({
      style: style as LoveStyle,
      percentage: Math.round((count / total) * 100),
    }));

  return sorted;
}
