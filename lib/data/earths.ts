export type Hero = {
  name: string;
  location: string;
};

export type Earth = {
  id: string;
  name: string;
  label: string;
  shape: "sphere" | "brutalist";
  colors: {
    base: string;
    accent: string;
    glow: string;
    rim: string;
  };
  signaturePin: string;
  description: string;
  heroes: Hero[];
  faded?: boolean;
};

export const EARTHS: Earth[] = [
  {
    id: "earth-616",
    name: "Earth-616",
    label: "The Main Timeline",
    shape: "sphere",
    colors: { base: "#1c3d2e", accent: "#c98a3e", glow: "#3fae6a", rim: "#e8c07a" },
    signaturePin: "Avengers Tower",
    description:
      "Ocean blue, forest green, warm amber city-lights. The timeline Doom watches closest.",
    heroes: [
      { name: "Captain America", location: "Brooklyn" },
      { name: "Thor", location: "New Asgard" },
      { name: "Winter Soldier", location: "Wakanda" },
      { name: "Black Panther", location: "Wakanda" },
      { name: "Ant-Man", location: "San Francisco" },
      { name: "Loki", location: "Manhattan" },
      { name: "Shang-Chi", location: "San Francisco" },
      { name: "Yelena", location: "Undisclosed" },
      { name: "Sentry", location: "New York" },
      { name: "Ghost", location: "Undisclosed" },
      { name: "U.S. Agent", location: "Washington D.C." },
      { name: "Namor", location: "Talokan" },
      { name: "Doctor Doom", location: "Latveria" },
    ],
  },
  {
    id: "earth-828",
    name: "Earth-828",
    label: "Fantastic Four's World",
    shape: "sphere",
    colors: { base: "#8a6a2e", accent: "#b7c4c9", glow: "#8fe3c0", rim: "#d9b26a" },
    signaturePin: "Baxter Building",
    description: "Warm amber, chrome silver, mint green — a retro-futuristic skyline.",
    heroes: [
      { name: "Mister Fantastic", location: "Baxter Building" },
      { name: "Invisible Woman", location: "Baxter Building" },
      { name: "Human Torch", location: "Baxter Building" },
      { name: "The Thing", location: "Yancy Street" },
    ],
  },
  {
    id: "earth-838",
    name: "Earth-838",
    label: "The Illuminati's World",
    shape: "sphere",
    colors: { base: "#4b3a5c", accent: "#9a9aa2", glow: "#6a4b8c", rim: "#5c8c5c" },
    signaturePin: "Illuminati Chamber (dimmed)",
    description: "Cool violet, pale grey, sickly green. Fractured. Mostly wiped out.",
    faded: true,
    heroes: [
      { name: "Captain Marvel", location: "Chamber (faded)" },
      { name: "Black Bolt", location: "Chamber (faded)" },
      { name: "Professor X", location: "Chamber (faded)" },
    ],
  },
  {
    id: "x-men",
    name: "X-Men Universe",
    label: "Homo Superior",
    shape: "sphere",
    colors: { base: "#4a4f57", accent: "#f2c300", glow: "#c23bd0", rim: "#3a3d42" },
    signaturePin: "Xavier's School",
    description: "Steel grey, gunmetal, hazard yellow-black ring, magenta glow. Battle-scarred.",
    heroes: [
      { name: "Professor X", location: "Xavier's School" },
      { name: "Magneto", location: "Genosha" },
      { name: "Mystique", location: "Unknown" },
      { name: "Nightcrawler", location: "Xavier's School" },
      { name: "Cyclops", location: "Xavier's School" },
      { name: "Beast", location: "Xavier's School" },
      { name: "Gambit", location: "New Orleans" },
    ],
  },
  {
    id: "tva",
    name: "TVA",
    label: "Time Variance Authority",
    shape: "brutalist",
    colors: { base: "#2a2118", accent: "#e0863a", glow: "#f2a44c", rim: "#c9c2b4" },
    signaturePin: "Sacred Timeline Thread",
    description: "A floating brutalist structure in an orange-lit void, outside of time.",
    heroes: [
      { name: "Loki", location: "TVA" },
      { name: "Mobius", location: "TVA" },
      { name: "Miss Minutes", location: "TVA" },
    ],
  },
  {
    id: "raimiverse",
    name: "Raimiverse",
    label: "Earth-96283",
    shape: "sphere",
    colors: { base: "#5c1c1c", accent: "#1c2a5c", glow: "#e0c23a", rim: "#3a1010" },
    signaturePin: "Daily Bugle, Queens",
    description: "Deep red, navy, streetlight yellow. Grainy film-stock NYC.",
    heroes: [
      { name: "Spider-Man", location: "Queens" },
      { name: "Green Goblin", location: "Queens" },
    ],
  },
];
