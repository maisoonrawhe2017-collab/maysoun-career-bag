/**
 * MAYSOUN — The Career Bag
 * Project data for the cinematic portfolio.
 * Each "shard" is a discipline / project in Maysoun's multidisciplinary career.
 */

import { asset } from "./asset";

export type ProjectShard = {
  id: string;
  index: string;          // 01, 02, ...
  title: string;
  titleAr?: string;
  tagline: string;
  category: string;
  year: string;
  accent: string;         // hex
  accentSoft: string;     // rgba
  glyph: string;          // single-char symbol
  description: string;
  details: string[];
  media: {
    type: "image" | "video";
    src: string;
    alt: string;
    poster?: string;
  }[];
  cta?: { label: string; href: string };
};

export const projects: ProjectShard[] = [
  {
    id: "animal-alphabet",
    index: "01",
    title: "Animal Alphabet",
    titleAr: "حروف الحيوانات",
    tagline: "A children's book where every letter becomes a creature.",
    category: "Children's Book · Author & Illustrator",
    year: "2024",
    accent: "#E8A04A",
    accentSoft: "rgba(232, 160, 74, 0.16)",
    glyph: "A",
    description:
      "A 26-letter journey through a playful 3D-rendered animal kingdom. Each letter transforms into a friendly creature — a crocodile A, a giraffe G, a zebra Z — designed to teach children the alphabet through character, color, and story.",
    details: [
      "Authored and illustrated by Maisoon Namrote",
      "26 hand-crafted 3D letter-creatures, one per alphabet letter",
      "Welcome, title and end pages with full art direction",
      "Anty's Big Alphabet Adventure — companion cover concept",
    ],
    media: [
      { type: "image", src: asset("/projects/book/cover.png"), alt: "Animal Alphabet book cover with friendly animal characters" },
      { type: "image", src: asset("/projects/book/letters/A.png"), alt: "Letter A shaped as a green crocodile" },
      { type: "image", src: asset("/projects/book/letters/B.png"), alt: "Letter B shaped as a bear" },
      { type: "image", src: asset("/projects/book/ant-cover.jpeg"), alt: "Anty's Big Alphabet Adventure cover" },
    ],
    cta: { label: "Open the book", href: "#book" },
  },
  {
    id: "beauty-graduate",
    index: "02",
    title: "Beauty Graduate",
    titleAr: "خريجة التجميل",
    tagline: "Celebratory beauty design for the modern Arab graduate.",
    category: "Beauty · Cosmetology & Visual Identity",
    year: "2024",
    accent: "#E8B4A0",
    accentSoft: "rgba(232, 180, 160, 0.16)",
    glyph: "B",
    description:
      "A 2024 beauty cosmetology graduate campaign blending portrait photography with elegant Arabic typography. The work pairs warm golden tones with celebratory styling to position beauty services for graduates — makeup, hairstyling, and skincare as a complete ritual.",
    details: [
      "Beauty school graduate, class of 2024",
      "Promotional design for celebratory makeup & hairstyling",
      "Brand identity: بسم الروحانيات — هدي السيدات",
      "Editorial photography with pearl, gold and graduation motifs",
    ],
    media: [
      { type: "image", src: asset("/projects/beauty/graduate-promo.jpg"), alt: "Graduate beauty promotional design" },
      { type: "image", src: asset("/projects/beauty/beauty-graduate.jpg"), alt: "Beauty graduate in graduation gown" },
    ],
  },
  {
    id: "smart-mirror",
    index: "03",
    title: "Smart Mirror",
    titleAr: "المرآة الذكية",
    tagline: "A reflective OS for personal health diagnostics.",
    category: "UX/UI · Smart Product Concept",
    year: "2024",
    accent: "#7FFF8B",
    accentSoft: "rgba(127, 255, 139, 0.14)",
    glyph: "M",
    description:
      "A futuristic bathroom mirror that doubles as a personal health diagnostician. The interface surfaces body temperature, blood sugar, and blood pressure in real time, then proposes a treatment plan — all in calm, clinical Arabic typography that respects the morning ritual.",
    details: [
      "Real-time vitals: temperature, blood sugar, blood pressure",
      "AI-suggested treatment plan with symptoms & recommendations",
      "Glowing neon-green UI designed for reflective surfaces",
      "Bilingual Arabic-first content design",
    ],
    media: [
      { type: "image", src: asset("/projects/mirror/smart-mirror-1.jpg"), alt: "Smart mirror showing health diagnostics" },
      { type: "image", src: asset("/projects/mirror/smart-mirror-2.jpeg"), alt: "Smart mirror daily health recommendations" },
    ],
  },
  {
    id: "food-advertising",
    index: "04",
    title: "Culinary Editorial",
    titleAr: "إعلان الملحمة",
    tagline: "Food photography for the premium butcher & steakhouse.",
    category: "Food · Advertising & Art Direction",
    year: "2024",
    accent: "#C8392E",
    accentSoft: "rgba(200, 57, 46, 0.16)",
    glyph: "F",
    description:
      "An editorial food advertisement designed for an upscale butcher shop. Marbled cuts of T-bone and ribeye are arranged on rustic wood with rosemary, thyme and crushed pepper — lit by warm pendant glow against exposed brick. Every texture is intentional.",
    details: [
      "Premium meat photography for butcher & steakhouse",
      "Art direction: warm wood, brass, exposed brick, neon bull sign",
      "Editorial Arabic copy with cut & weight callouts",
      "Cinematic chiaroscuro lighting design",
    ],
    media: [
      { type: "image", src: asset("/projects/food/meat-ad.jpeg"), alt: "Premium meat advertisement with rustic styling" },
    ],
  },
  {
    id: "jewelry-process",
    index: "05",
    title: "Gold Chain Studio",
    titleAr: "مصنوعات السلسلة الذهبية",
    tagline: "A seven-step infographic from design to delivery.",
    category: "Jewelry · Process Infographic",
    year: "2024",
    accent: "#D4AF37",
    accentSoft: "rgba(212, 175, 55, 0.16)",
    glyph: "G",
    description:
      "A methodical infographic walking viewers through the seven stages of manufacturing a gold chain — from digital design and 3D printing, through casting, gemstone setting and polishing, to final quality control and packaging. Warm metallic palette throughout.",
    details: [
      "Seven-step process visualization",
      "Stages: design, 3D print, casting, assembly, gemstone setting, polish, QC",
      "Metallic gold palette evoking high-end craftsmanship",
      "Designed for jewelry studio client presentation",
    ],
    media: [
      { type: "image", src: asset("/projects/jewelry/gold-chain-process.jpg"), alt: "Gold chain manufacturing seven-step process infographic" },
    ],
  },
  {
    id: "typography-lab",
    index: "06",
    title: "Edible Letters",
    titleAr: "أحرف النقانق",
    tagline: "Two alphabets — one made of sausages, one of animals.",
    category: "Typography · Experimental Letterforms",
    year: "2024",
    accent: "#B8742A",
    accentSoft: "rgba(184, 116, 42, 0.16)",
    glyph: "T",
    description:
      "An experimental typography series where the alphabet is reimagined through unexpected materials. The Sausage Alphabet renders every letter as a glossy, grill-marked sausage. The Animal Alphabet shapes each letter as a different creature. Both celebrate the playfulness of the letterform itself.",
    details: [
      "Sausage Alphabet — 26 letters as 3D-rendered grilled sausages",
      "Animal Alphabet — 26 letters as cartoon animal characters",
      "Hyperrealistic 3D rendering with photographic lighting",
      "Cross-disciplinary: typography meets food & character design",
    ],
    media: [
      { type: "image", src: asset("/projects/typography/sausage-alphabet.jpeg"), alt: "Alphabet made of 3D grilled sausages" },
      { type: "image", src: asset("/projects/typography/animal-alphabet.jpeg"), alt: "Alphabet shaped as cartoon animals" },
    ],
  },
  {
    id: "digital-academy",
    index: "07",
    title: "Digital Academy",
    titleAr: "دورة المهارات الرقمية",
    tagline: "Two flagship courses for the next generation of digital professionals.",
    category: "Education · Curriculum Design",
    year: "2025",
    accent: "#FFB866",
    accentSoft: "rgba(255, 184, 102, 0.16)",
    glyph: "D",
    description:
      "A pair of comprehensive vocational courses. The DATA-PRO Data Entry program runs eight weeks across typing, OCR, ethics and freelancing. The Integrated Digital Skills course covers the foundational workflow — Microsoft Office, printing, email and cloud — as a single connected journey.",
    details: [
      "DATA-PRO Academy — 8-week data entry curriculum (15 modules)",
      "Integrated Digital Skills — 10-module foundational course",
      "Modules: typing, Office, OCR, ethics, freelancing, cloud",
      "+5,000 students, internationally accredited certification",
    ],
    media: [
      { type: "image", src: asset("/projects/academy/slides/skill-1.jpeg"), alt: "Digital skills course module" },
      { type: "image", src: asset("/projects/academy/slides/skill-2.jpeg"), alt: "Office equipment workflow" },
      { type: "video", src: asset("/projects/academy/google-docs-tutorial.mp4"), alt: "Google Docs tutorial video" },
    ],
    cta: { label: "Enter the academy", href: "#academy" },
  },
  {
    id: "avatar-motion",
    index: "08",
    title: "Avatar Motion",
    titleAr: "أفتار ميسون",
    tagline: "A digital double that speaks with emotion.",
    category: "Animation · Avatar & Emotion",
    year: "2024",
    accent: "#B070E8",
    accentSoft: "rgba(176, 112, 232, 0.16)",
    glyph: "V",
    description:
      "A series of animated avatar videos exploring emotional performance through a digital double. Expressions, gaze and micro-movements are choreographed to convey presence — a study in how a virtual self can carry real feeling.",
    details: [
      "Two avatar films with expressive emotion performance",
      "Real-time choreography of facial micro-movements",
      "Companion tutorial content for digital creators",
      "Study in virtual presence and emotional authenticity",
    ],
    media: [
      { type: "video", src: asset("/projects/avatar/avatar-emotion.mp4"), alt: "Avatar with emotion animation" },
      { type: "video", src: asset("/projects/avatar/maysoun-avatar.mp4"), alt: "Maysoun avatar animation" },
    ],
  },
  {
    id: "game-world",
    index: "09",
    title: "Monster Hunter",
    titleAr: "صائد الوحوش",
    tagline: "صائد الوحوش — a browser-native monster-hunt, shipped live.",
    category: "Game Development · Interactive",
    year: "2024",
    accent: "#5FD9E8",
    accentSoft: "rgba(95, 217, 232, 0.16)",
    glyph: "X",
    description:
      "Monster Hunter (صائد الوحوش) is a top-down sci-fi action game that runs entirely in the browser — no engine, no external assets, audio synthesized live. Set on the dark mining station Kestrel-9, the player is the hunter sent to purge the nest of feral units. Designed, written and engineered end-to-end by Maisoon Namrote, the project bridges illustration, animation and UX into a single playable experience.",
    details: [
      "صائد الوحوش — Monster Hunter, browser-native, no engine",
      "Top-down arena combat across seven sector decks",
      "Live-synthesized audio, no external assets",
      "WASD + mouse aim, dash, skill, weapon-swap controls",
      "Live deployment on GitHub Pages — fully playable",
    ],
    media: [
      { type: "image", src: asset("/projects/game/start-screen.png"), alt: "Monster Hunter start screen with DEPLOY button" },
      { type: "image", src: asset("/projects/game/gameplay.png"), alt: "Monster Hunter top-down gameplay on Mining Deck A" },
    ],
    cta: { label: "Play the game", href: "https://maisoonrawhe2017-collab.github.io/maisoon--game/" },
  },
];

export const disciplines = [
  { label: "Children's Book Illustration", level: 92 },
  { label: "Beauty & Cosmetology", level: 88 },
  { label: "UX / UI Design", level: 90 },
  { label: "Food Art Direction", level: 85 },
  { label: "Infographic Design", level: 89 },
  { label: "Experimental Typography", level: 87 },
  { label: "Curriculum Design", level: 91 },
  { label: "Avatar Animation", level: 80 },
  { label: "Game Development", level: 76 },
];

export const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export const bookLetters = alphabet.map((letter, i) => ({
  letter,
  src: asset(`/projects/book/letters/${letter}.png`),
  creature: creatureName(letter, i),
  fact: creatureFact(letter),
}));

function creatureFact(letter: string): string {
  const facts: Record<string, string> = {
    A: "Alligators have sixty teeth — but this friendly one just wants a hug!",
    B: "Bears love honey so much that they dream about it all winter long.",
    C: "Cats purr when they feel happy, and this tabby is very, very happy.",
    D: "Dogs wag their tails to say, \u2018You are my favorite person in the world!\u2019",
    E: "Elephants drink through their noses — how silly is that?",
    F: "A fox\u2019s fluffy tail works like a warm, cozy blanket on chilly nights.",
    G: "Giraffes are so tall, they could peek into your upstairs window!",
    H: "Hippos can\u2019t swim — they bounce and dance along the river bottom.",
    I: "Iguanas love to sunbathe to warm up, just like you on a sunny day.",
    J: "Jellyfish have no bones at all — they dance like living jelly.",
    K: "Koalas sleep for up to twenty hours every day. Sweet dreams!",
    L: "A lion\u2019s mighty roar can be heard from five miles away!",
    M: "Monkeys use their tails like an extra hand to hold on tight.",
    N: "Narwhals are called the unicorns of the snowy sea.",
    O: "Octopuses have eight wiggly arms and three whole hearts!",
    P: "Penguins give pebbles as presents to friends they really like.",
    Q: "Quails wear a tiny feather crown that bobs when they run.",
    R: "Rabbits can turn their long ears almost all the way around.",
    S: "Snakes smell with their tongues — flick, flick, what\u2019s cooking?",
    T: "Every tiger\u2019s stripes are one of a kind, just like your fingerprints.",
    U: "The umbrellabird carries its very own umbrella on top of its head!",
    V: "Vultures are nature\u2019s helpful cleanup crew with big feathery wings.",
    W: "Whales sing lovely songs that can travel across whole oceans.",
    X: "X-ray fish are so see-through, you can peek at their tiny bones.",
    Y: "Yaks are walking fluff-balls that love cold, snowy mountains.",
    Z: "No two zebras share the same stripes — and no two kids are alike!",
  };
  return facts[letter] ?? "";
}

function creatureName(letter: string, i: number): string {
  const names: Record<string, string> = {
    A: "Alligator",
    B: "Bear",
    C: "Cat",
    D: "Dog",
    E: "Elephant",
    F: "Fox",
    G: "Giraffe",
    H: "Hippo",
    I: "Iguana",
    J: "Jellyfish",
    K: "Koala",
    L: "Lion",
    M: "Monkey",
    N: "Narwhal",
    O: "Octopus",
    P: "Penguin",
    Q: "Quail",
    R: "Rabbit",
    S: "Snake",
    T: "Tiger",
    U: "Umbrellabird",
    V: "Vulture",
    W: "Whale",
    X: "X-ray Fish",
    Y: "Yak",
    Z: "Zebra",
  };
  return names[letter] ?? "Creature";
}
