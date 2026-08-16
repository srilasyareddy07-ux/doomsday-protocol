export type ChecklistItem = {
  id: string;
  title: string;
  type: "film" | "series" | "side-quest";
};

export type ChecklistSection = {
  id: string;
  label: string;
  items: ChecklistItem[];
};

// Full watch order as supplied by the user, titles only (no runtimes/ratings),
// grouped into the five tracks from the source list. Side quests are kept as
// their own entries, in place, same as everything else.
export const CHECKLIST_SECTIONS: ChecklistSection[] = [
  {
    id: "phase-1-3",
    label: "Phase 1–3",
    items: [
      { id: "iron-man", title: "Iron Man", type: "film" },
      { id: "incredible-hulk", title: "The Incredible Hulk", type: "film" },
      { id: "iron-man-2", title: "Iron Man 2", type: "film" },
      { id: "thor-1", title: "Thor", type: "film" },
      { id: "cap-first-avenger", title: "Captain America: The First Avenger", type: "film" },
      { id: "sq-agent-carter", title: "Side quest: Agent Carter S1–2 + the Marvel One-Shots", type: "side-quest" },
      { id: "avengers-1", title: "The Avengers", type: "film" },
      { id: "iron-man-3", title: "Iron Man 3", type: "film" },
      { id: "sq-agents-of-shield-s1", title: "Side quest: Agents of S.H.I.E.L.D. Season 1", type: "side-quest" },
      { id: "thor-dark-world", title: "Thor: The Dark World", type: "film" },
      { id: "cap-winter-soldier", title: "Captain America: The Winter Soldier", type: "film" },
      { id: "gotg-1", title: "Guardians of the Galaxy", type: "film" },
      { id: "gotg-2", title: "Guardians of the Galaxy Vol. 2", type: "film" },
      { id: "aou", title: "Avengers: Age of Ultron", type: "film" },
      { id: "ant-man-1", title: "Ant-Man", type: "film" },
      { id: "civil-war", title: "Captain America: Civil War", type: "film" },
      { id: "black-widow", title: "Black Widow", type: "film" },
      { id: "doctor-strange-1", title: "Doctor Strange", type: "film" },
      { id: "spiderman-homecoming", title: "Spider-Man: Homecoming", type: "film" },
      { id: "thor-ragnarok", title: "Thor: Ragnarok", type: "film" },
      { id: "black-panther-1", title: "Black Panther", type: "film" },
      { id: "infinity-war", title: "Avengers: Infinity War", type: "film" },
      { id: "ant-man-wasp", title: "Ant-Man and the Wasp", type: "film" },
      { id: "captain-marvel", title: "Captain Marvel", type: "film" },
      { id: "endgame", title: "Avengers: Endgame", type: "film" },
      { id: "spiderman-ffh", title: "Spider-Man: Far From Home", type: "film" },
    ],
  },
  {
    id: "street-level",
    label: "The Street-Level Track",
    items: [
      { id: "daredevil-s1", title: "Daredevil Season 1", type: "series" },
      { id: "jessica-jones-s1", title: "Jessica Jones Season 1", type: "series" },
      { id: "daredevil-s2", title: "Daredevil Season 2", type: "series" },
      { id: "sq-defenders-corner", title: "Side quest: Luke Cage, Iron Fist, The Defenders, Jessica Jones S2–3", type: "side-quest" },
      { id: "punisher-s1", title: "The Punisher Season 1", type: "series" },
      { id: "daredevil-s3", title: "Daredevil Season 3", type: "series" },
      { id: "punisher-s2", title: "The Punisher Season 2", type: "series" },
    ],
  },
  {
    id: "multiverse-saga",
    label: "The Multiverse Saga: Phases 4–5",
    items: [
      { id: "wandavision", title: "WandaVision", type: "series" },
      { id: "falcon-winter-soldier", title: "The Falcon and the Winter Soldier", type: "series" },
      { id: "loki-s1", title: "Loki Season 1", type: "series" },
      { id: "what-if-s1", title: "What If...? Season 1", type: "series" },
      { id: "shang-chi", title: "Shang-Chi and the Legend of the Ten Rings", type: "film" },
      { id: "eternals", title: "Eternals", type: "film" },
      { id: "hawkeye-1-5", title: "Hawkeye — episodes 1–5", type: "series" },
      { id: "sq-raimi-webb-spiderman", title: "Side quest: The Raimi + Webb Spider-Man films", type: "side-quest" },
      { id: "no-way-home", title: "Spider-Man: No Way Home", type: "film" },
      { id: "hawkeye-6", title: "Hawkeye — episode 6 (finale)", type: "series" },
      { id: "moon-knight", title: "Moon Knight", type: "series" },
      { id: "multiverse-madness", title: "Doctor Strange in the Multiverse of Madness", type: "film" },
      { id: "ms-marvel", title: "Ms. Marvel", type: "series" },
      { id: "thor-love-thunder", title: "Thor: Love and Thunder", type: "film" },
      { id: "she-hulk", title: "She-Hulk: Attorney at Law", type: "series" },
      { id: "sq-werewolf-holiday-groot", title: "Side quest: Werewolf by Night + GotG Holiday Special + I Am Groot", type: "side-quest" },
      { id: "wakanda-forever", title: "Black Panther: Wakanda Forever", type: "film" },
      { id: "quantumania", title: "Ant-Man and the Wasp: Quantumania", type: "film" },
      { id: "loki-s2", title: "Loki Season 2", type: "series" },
      { id: "gotg-3", title: "Guardians of the Galaxy Vol. 3", type: "film" },
      { id: "secret-invasion", title: "Secret Invasion", type: "series" },
      { id: "the-marvels", title: "The Marvels", type: "film" },
      { id: "echo", title: "Echo", type: "series" },
    ],
  },
  {
    id: "x-men-homework",
    label: "The X-Men Homework Pack",
    items: [
      { id: "x-men-1", title: "X-Men", type: "film" },
      { id: "x2", title: "X2: X-Men United", type: "film" },
      { id: "x-men-last-stand", title: "X-Men: The Last Stand", type: "film" },
      { id: "x-men-days-future-past", title: "X-Men: Days of Future Past", type: "film" },
      { id: "deadpool-1", title: "Deadpool", type: "film" },
      { id: "logan", title: "Logan", type: "film" },
      { id: "deadpool-2", title: "Deadpool 2", type: "film" },
      { id: "deadpool-wolverine", title: "Deadpool & Wolverine", type: "film" },
      { id: "sq-first-class-etc", title: "Side quest: First Class, Apocalypse, Dark Phoenix, Wolverine solos", type: "side-quest" },
    ],
  },
  {
    id: "final-run",
    label: "The Final Run",
    items: [
      { id: "agatha-all-along", title: "Agatha All Along", type: "series" },
      { id: "brave-new-world", title: "Captain America: Brave New World", type: "film" },
      { id: "daredevil-born-again-s1", title: "Daredevil: Born Again Season 1", type: "series" },
      { id: "thunderbolts", title: "Thunderbolts*", type: "film" },
      { id: "ironheart", title: "Ironheart", type: "series" },
      { id: "sq-eyes-of-wakanda-zombies", title: "Side quest: Eyes of Wakanda + Marvel Zombies", type: "side-quest" },
      { id: "fantastic-four-first-steps", title: "The Fantastic Four: First Steps", type: "film" },
      { id: "wonder-man", title: "Wonder Man", type: "series" },
      { id: "daredevil-born-again-s2", title: "Daredevil: Born Again Season 2", type: "series" },
      { id: "punisher-one-last-kill", title: "The Punisher: One Last Kill", type: "series" },
      { id: "spiderman-brand-new-day", title: "Spider-Man: Brand New Day", type: "film" },
      { id: "visionquest", title: "VisionQuest", type: "series" },
      { id: "sq-x-men-97-friendly-neighborhood", title: "Side quest: X-Men '97 Season 1–2 + Your Friendly Neighborhood Spider-Man", type: "side-quest" },
    ],
  },
];

// Flat list, preserved for anywhere that just needs every item in order.
export const CHECKLIST_ITEMS: ChecklistItem[] = CHECKLIST_SECTIONS.flatMap((s) => s.items);
