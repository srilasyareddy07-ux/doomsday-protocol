export type Character = {
  id: string;
  name: string;
  universe: string;
  initials: string;
};

// One card per confirmed Doomsday cast member across the assembled universes.
// Names only — no photos or likenesses, per the no-real-imagery rule.
export const CHARACTERS: Character[] = [
  { id: "doctor-doom", name: "Doctor Doom", universe: "Latveria", initials: "DD" },
  { id: "captain-america", name: "Captain America (Sam Wilson)", universe: "Earth-616", initials: "CA" },
  { id: "thor", name: "Thor", universe: "Earth-616", initials: "TH" },
  { id: "winter-soldier", name: "Winter Soldier", universe: "Earth-616", initials: "WS" },
  { id: "red-guardian", name: "Red Guardian", universe: "Earth-616", initials: "RG" },
  { id: "yelena", name: "Yelena Belova", universe: "Earth-616", initials: "YB" },
  { id: "us-agent", name: "U.S. Agent", universe: "Earth-616", initials: "USA" },
  { id: "ghost", name: "Ghost", universe: "Earth-616", initials: "GH" },
  { id: "ant-man", name: "Ant-Man", universe: "Earth-616", initials: "AM" },
  { id: "loki", name: "Loki", universe: "TVA", initials: "LK" },
  { id: "shang-chi", name: "Shang-Chi", universe: "Earth-616", initials: "SC" },
  { id: "black-panther", name: "Black Panther (Shuri)", universe: "Earth-616", initials: "BP" },
  { id: "mister-fantastic", name: "Mister Fantastic", universe: "Earth-828", initials: "MF" },
  { id: "invisible-woman", name: "Invisible Woman", universe: "Earth-828", initials: "IW" },
  { id: "human-torch", name: "Human Torch", universe: "Earth-828", initials: "HT" },
  { id: "the-thing", name: "The Thing", universe: "Earth-828", initials: "TT" },
  { id: "professor-x", name: "Professor X", universe: "X-Men Universe", initials: "PX" },
  { id: "magneto", name: "Magneto", universe: "X-Men Universe", initials: "MG" },
  { id: "wolverine", name: "Wolverine", universe: "X-Men Universe", initials: "WV" },
  { id: "deadpool", name: "Deadpool", universe: "X-Men Universe", initials: "DP" },
  { id: "nightcrawler", name: "Nightcrawler", universe: "X-Men Universe", initials: "NC" },
  { id: "beast", name: "Beast", universe: "X-Men Universe", initials: "BS" },
  { id: "spider-man", name: "Spider-Man", universe: "Raimiverse", initials: "SM" },
  { id: "namor", name: "Namor", universe: "Talokan", initials: "NM" },
];
