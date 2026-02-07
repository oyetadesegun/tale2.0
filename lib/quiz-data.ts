export type LoveStyle =
  | "Soft & Sentimental"
  | "Thoughtful & Practical"
  | "Comfort & Care"
  | "Stylish & Aesthetic"
  | "Experiential & Immersive";

export type RelationshipType = "Romantic partner" | "Friend" | "Family member" | "Myself";

export interface QuizOption {
  label: string;
  styles: LoveStyle[];
}

export interface QuizQuestion {
  id: number;
  section: "About Them" | "How They Experience Gifts" | "You";
  question: string;
  /** Scene-setting narrative to help the quiz-taker imagine their person. Uses {name} and {they}/{them}/{their} placeholders. */
  contextHint: Record<RelationshipType, string>;
  options: QuizOption[];
  maxSelect: number;
  type: "choice" | "freetext";
}

export const quizQuestions: QuizQuestion[] = [
  // SECTION 1: ABOUT THEM
  {
    id: 1,
    section: "About Them",
    question: "What kind of gestures make {name} happiest?",
    contextHint: {
      "Romantic partner":
        "Picture {name} at their happiest with you. Maybe you just did something unexpected for them — a surprise note, a random gift, a quiet moment together. What was it about that gesture that lit up their face?",
      "Friend":
        "Think of a time {name} was really touched by something you or someone else did for them. What kind of gesture was it — something heartfelt, useful, fun, or comforting?",
      "Family member":
        "Think about what makes {name} feel most appreciated in your family. Is it when someone remembers the little things, takes care of something practical, or plans something special?",
      "Myself":
        "Think about what truly makes you happy when someone does something for you. What kind of gesture leaves you feeling genuinely seen and valued?",
    },
    type: "choice",
    maxSelect: 1,
    options: [
      { label: "Something emotional or personal", styles: ["Soft & Sentimental"] },
      { label: "Something useful or thoughtful", styles: ["Thoughtful & Practical"] },
      { label: "Something that helps them relax", styles: ["Comfort & Care"] },
      { label: "Something stylish or classy", styles: ["Stylish & Aesthetic"] },
      { label: "A special experience or surprise", styles: ["Experiential & Immersive"] },
    ],
  },
  {
    id: 2,
    section: "About Them",
    question: "When {name} receives a gift, what matters most to {them}?",
    contextHint: {
      "Romantic partner":
        "Think back to the last gift {name} truly loved from you. Was it the thought behind it that moved them? The fact that it was useful? How it made them feel? Hold that memory — what stood out?",
      "Friend":
        "Remember a time {name} received a gift and genuinely loved it — maybe from you, maybe someone else. What was it about that gift that made it land so perfectly?",
      "Family member":
        "Recall a holiday or birthday when {name} opened something and their whole face changed. What made that gift hit different — the thought, the beauty, or the usefulness?",
      "Myself":
        "Think about the best gift you've ever received. What was it about that gift that made it stand out — the meaning, the beauty, or how much you used it?",
    },
    type: "choice",
    maxSelect: 2,
    options: [
      { label: "The meaning behind it", styles: ["Soft & Sentimental"] },
      { label: "How useful it is", styles: ["Thoughtful & Practical"] },
      { label: "How comforting it feels", styles: ["Comfort & Care"] },
      { label: "How beautiful it looks", styles: ["Stylish & Aesthetic"] },
      { label: "The experience or memory it creates", styles: ["Experiential & Immersive"] },
    ],
  },
  {
    id: 3,
    section: "About Them",
    question: "Which words describe {name} best?",
    contextHint: {
      "Romantic partner":
        "Close your eyes for a second and picture {name} in their element — being fully themselves around you. How would you describe the energy they bring into your relationship?",
      "Friend":
        "If you had to describe {name} to someone who's never met them, what would you say? Think about their vibe, how they show up, and what makes them uniquely them.",
      "Family member":
        "Think about what makes {name} who they are in your family. Are they the emotional one, the practical one, the stylish one, or the adventurous soul?",
      "Myself":
        "If your closest person had to describe you in a few words, what would they say? Think about how you move through the world and what drives you.",
    },
    type: "choice",
    maxSelect: 2,
    options: [
      { label: "Emotional & sentimental", styles: ["Soft & Sentimental"] },
      { label: "Practical & intentional", styles: ["Thoughtful & Practical"] },
      { label: "Gentle & nurturing", styles: ["Comfort & Care"] },
      { label: "Stylish & sophisticated", styles: ["Stylish & Aesthetic"] },
      { label: "Adventurous & expressive", styles: ["Experiential & Immersive"] },
    ],
  },
  {
    id: 4,
    section: "About Them",
    question: "What's your biggest fear when gifting {name}?",
    contextHint: {
      "Romantic partner":
        "Be honest with yourself — when you think about getting a gift for {name}, what's that little voice in your head worried about? What would hurt the most if you got it wrong?",
      "Friend":
        "Gifting a friend can feel tricky. What's the thing you'd hate most — getting something they won't use, or something that doesn't feel personal enough?",
      "Family member":
        "Sometimes gifting family is the hardest. What's the one thing you'd hate to hear after {name} opens your gift?",
      "Myself":
        "When you treat yourself, what usually goes wrong? Do you pick something boring, something impractical, or do you never quite feel like you deserve the nice thing?",
    },
    type: "choice",
    maxSelect: 1,
    options: [
      { label: "It won't feel meaningful enough", styles: ["Soft & Sentimental"] },
      { label: "It won't be useful to them", styles: ["Thoughtful & Practical"] },
      { label: "It won't feel caring or warm", styles: ["Comfort & Care"] },
      { label: "It won't match their taste or style", styles: ["Stylish & Aesthetic"] },
      { label: "It won't feel special or memorable", styles: ["Experiential & Immersive"] },
    ],
  },
  // SECTION 2: HOW THEY EXPERIENCE GIFTS
  {
    id: 5,
    section: "How They Experience Gifts",
    question: "What excites {name} the most?",
    contextHint: {
      "Romantic partner":
        "Imagine surprising {name} — you walk in with something just for them. What would make their eyes light up first? Think about what senses they respond to most when they're excited.",
      "Friend":
        "Picture handing {name} a surprise gift bag. What would they reach for first? What kinds of things make them go 'Oh my God, I love this!'?",
      "Family member":
        "Think about what gets {name} genuinely excited. Is it unwrapping something beautiful, smelling something amazing, tasting something special, or the story behind the gift?",
      "Myself":
        "What makes your heart race when you open a gift? Is it the visual beauty, the texture, the scent, or the fact that someone remembered something meaningful about you?",
    },
    type: "choice",
    maxSelect: 2,
    options: [
      { label: "Beautiful packaging or visuals", styles: ["Stylish & Aesthetic"] },
      { label: "Physical comfort or texture", styles: ["Comfort & Care"] },
      { label: "Food or sweet treats", styles: ["Comfort & Care", "Thoughtful & Practical"] },
      { label: "Scents, perfumes, candles", styles: ["Stylish & Aesthetic", "Comfort & Care"] },
      { label: "Music, voice notes, sound", styles: ["Soft & Sentimental", "Experiential & Immersive"] },
      { label: "Memories & meaning", styles: ["Soft & Sentimental"] },
    ],
  },
  {
    id: 6,
    section: "How They Experience Gifts",
    question: "What would make this Valentine truly special for {name}?",
    contextHint: {
      "Romantic partner":
        "Imagine it's Valentine's evening. You've just given {name} the perfect gift. They look at you and say 'This is the best Valentine I've ever had.' What did you give them that made them say that?",
      "Friend":
        "Imagine {name} posting about your gift on social media saying 'My friend really outdid themselves this time.' What kind of gift would make them feel that way?",
      "Family member":
        "Think about the kind of gift that would make {name} tear up or call the whole family to tell them about it. What would that gift be like?",
      "Myself":
        "If you could give yourself the perfect Valentine's treat with no guilt — something that says 'I deserve this' — what would that look like?",
    },
    type: "choice",
    maxSelect: 1,
    options: [
      { label: "A heartfelt, personal message", styles: ["Soft & Sentimental"] },
      { label: "Something personalized just for them", styles: ["Soft & Sentimental", "Thoughtful & Practical"] },
      { label: "Something they'll use often", styles: ["Thoughtful & Practical"] },
      { label: "Something that helps them rest and recharge", styles: ["Comfort & Care"] },
      { label: "Something stylish & luxurious", styles: ["Stylish & Aesthetic"] },
      { label: "A memorable, one-of-a-kind experience", styles: ["Experiential & Immersive"] },
    ],
  },
  // SECTION 3: YOU
  {
    id: 7,
    section: "You",
    question: "How involved do you want to be in creating this gift?",
    contextHint: {
      "Romantic partner":
        "Some people love curating every detail of a gift — picking the wrapping, writing the note, putting it all together. Others just want it done right without the stress. Which one sounds more like you?",
      "Friend":
        "When it comes to gift-giving, are you the DIY type who loves the creative process, or would you rather someone just tell you exactly what to get?",
      "Family member":
        "Be honest — do you enjoy the process of finding the perfect gift, or does it usually feel like a stressful chore you'd love help with?",
      "Myself":
        "When treating yourself, do you enjoy the hunt and the choosing, or would you prefer someone to just hand you the perfect thing?",
    },
    type: "choice",
    maxSelect: 1,
    options: [
      { label: "I want to curate it myself (with guidance)", styles: ["Soft & Sentimental", "Thoughtful & Practical"] },
      { label: "I want help so I don't mess it up", styles: ["Comfort & Care", "Stylish & Aesthetic"] },
      { label: "I want everything handled for me", styles: ["Experiential & Immersive", "Stylish & Aesthetic"] },
    ],
  },
  {
    id: 8,
    section: "You",
    question: "What's your budget style for this gift?",
    contextHint: {
      "Romantic partner":
        "There's no wrong answer here — a meaningful gift doesn't have to be expensive. But knowing your budget style helps us suggest things that feel right for you and {name}.",
      "Friend":
        "Gifts between friends come in all sizes. Are you going all out for {name} this Valentine, or keeping it thoughtful and budget-friendly?",
      "Family member":
        "Whether it's a small token of love or a grand gesture, what feels right for what you want to give {name} this Valentine?",
      "Myself":
        "How much are you willing to invest in yourself this Valentine? Remember, you deserve to be spoiled too.",
    },
    type: "choice",
    maxSelect: 1,
    options: [
      { label: "I want to go all out", styles: ["Experiential & Immersive", "Stylish & Aesthetic"] },
      { label: "I want something balanced — quality but reasonable", styles: ["Thoughtful & Practical", "Comfort & Care"] },
      { label: "I want something simple but meaningful", styles: ["Soft & Sentimental", "Comfort & Care"] },
    ],
  },
  {
    id: 9,
    section: "You",
    question: "When do you need this gift ready?",
    contextHint: {
      "Romantic partner":
        "Timing matters! Are you planning ahead or is this a last-minute rescue mission? No judgment either way — we've got you covered.",
      "Friend":
        "When are you seeing {name} next? Let us know so we can suggest gifts that are actually doable in your timeline.",
      "Family member":
        "Are you planning ahead for {name} or do you need something sorted quickly? Knowing this helps us match realistic options to your timeline.",
      "Myself":
        "When do you want to treat yourself? Right now, on the day, or as a post-Valentine reward?",
    },
    type: "choice",
    maxSelect: 1,
    options: [
      { label: "ASAP — I need it now!", styles: ["Experiential & Immersive"] },
      { label: "Before Valentine's Day", styles: ["Thoughtful & Practical"] },
      { label: "On Valentine's Day itself", styles: ["Soft & Sentimental"] },
      { label: "After Valentine's — no rush", styles: ["Comfort & Care"] },
    ],
  },
  {
    id: 10,
    section: "You",
    question: "Anything else we should know about {name}?",
    contextHint: {
      "Romantic partner":
        "This is your space to tell us the little things — their favourite colour, an inside joke, something they mentioned wanting, a hobby they love. The more we know, the more personal the gift can be.",
      "Friend":
        "Drop any extra details about {name} here — their interests, something they've been talking about, a quirky habit. Anything that could help us nail the perfect gift.",
      "Family member":
        "Share anything extra about {name} — their hobbies, something they've been eyeing, a favourite treat. These little details make all the difference.",
      "Myself":
        "Tell us about yourself — your interests, something you've been wanting, what makes you feel special. The more we know, the better the recommendation.",
    },
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
    giftMessage: "\"I see you. You matter to me. I am here for you.\"",
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
    giftMessage: "\"I pay attention to your daily life and convenience.\"",
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
    giftMessage: "\"You are safe with me. Your well-being matters to me.\"",
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
    giftMessage: "\"This fits you. You deserve nice things.\"",
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
    giftMessage: "\"I wanted this to be unique and memorable.\"",
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

export function calculateResults(answers: QuizAnswer[]): LoveStyle[] {
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

  const sorted = Object.entries(counts)
    .sort(([, a], [, b]) => b - a)
    .map(([style]) => style as LoveStyle);

  return sorted.slice(0, 2);
}
