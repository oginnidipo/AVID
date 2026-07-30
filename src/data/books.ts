/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  THE SHELF
 * ─────────────────────────────────────────────────────────────────────────────
 *  The titles we put in front of children, weighted towards Nigerian and
 *  African authors alongside international work — including books in Yorùbá,
 *  Igbo and Hausa, because a child should find their own language on a shelf.
 *
 *  This list feeds two places: the wall of spines behind the classroom on the
 *  home page, and the reading list on Our Work. Add or remove a title here and
 *  both update.
 *
 *  `band` is the reading stage the title suits:
 *     early  — first readers, roughly ages 5–8
 *     middle — confident readers, roughly ages 9–12
 *     upper  — older pupils, staff, and the school's reference shelf
 * ─────────────────────────────────────────────────────────────────────────────
 */

export type Band = "early" | "middle" | "upper";

export interface Book {
  title: string;
  author: string;
  /** The author's country. Used to group the reading list. */
  origin: string;
  band: Band;
  /** Optional: the language, when it is not English. */
  language?: string;
}

export const BOOKS: Book[] = [
  // ── First readers ───────────────────────────────────────────────────────
  { title: "Anna Hibiscus", author: "Atinuke", origin: "Nigeria", band: "early" },
  { title: "The No. 1 Car Spotter", author: "Atinuke", origin: "Nigeria", band: "early" },
  { title: "Africa, Amazing Africa", author: "Atinuke", origin: "Nigeria", band: "early" },
  { title: "A is for Africa", author: "Ifeoma Onyefulu", origin: "Nigeria", band: "early" },
  { title: "Chidi Only Likes Blue", author: "Ifeoma Onyefulu", origin: "Nigeria", band: "early" },
  { title: "Ikenna Goes to Nigeria", author: "Ifeoma Onyefulu", origin: "Nigeria", band: "early" },
  { title: "Chike and the River", author: "Chinua Achebe", origin: "Nigeria", band: "early" },
  { title: "The Drummer Boy", author: "Cyprian Ekwensi", origin: "Nigeria", band: "early" },
  { title: "Sugar Girl", author: "Kola Onadipe", origin: "Nigeria", band: "early" },
  { title: "Eze Goes to School", author: "Onuora Nzekwu", origin: "Nigeria", band: "early" },

  // ── Confident readers ───────────────────────────────────────────────────
  {
    title: "An African Night's Entertainment",
    author: "Cyprian Ekwensi",
    origin: "Nigeria",
    band: "middle",
  },
  {
    title: "The Passport of Mallam Ilia",
    author: "Cyprian Ekwensi",
    origin: "Nigeria",
    band: "middle",
  },
  { title: "Without a Silver Spoon", author: "Eddie Iroh", origin: "Nigeria", band: "middle" },
  { title: "The Bottled Leopard", author: "Chukwuemeka Ike", origin: "Nigeria", band: "middle" },
  { title: "Weep Not, Child", author: "Ngũgĩ wa Thiong'o", origin: "Kenya", band: "middle" },
  { title: "The Boy Who Harnessed the Wind", author: "William Kamkwamba", origin: "Malawi", band: "middle" },
  { title: "Akissi", author: "Marguerite Abouet", origin: "Côte d'Ivoire", band: "middle" },

  // ── In Nigerian languages ───────────────────────────────────────────────
  {
    title: "Ògbójú Ọdẹ Nínú Igbó Irúnmalẹ̀",
    author: "D. O. Fágúnwà",
    origin: "Nigeria",
    band: "middle",
    language: "Yorùbá",
  },
  {
    title: "Ìrèké Oníbùdó",
    author: "D. O. Fágúnwà",
    origin: "Nigeria",
    band: "upper",
    language: "Yorùbá",
  },
  { title: "Omenuko", author: "Pita Nwana", origin: "Nigeria", band: "middle", language: "Igbo" },
  {
    title: "Shaihu Umar",
    author: "Abubakar Tafawa Balewa",
    origin: "Nigeria",
    band: "upper",
    language: "Hausa",
  },

  // ── Older pupils and the reference shelf ────────────────────────────────
  { title: "Things Fall Apart", author: "Chinua Achebe", origin: "Nigeria", band: "upper" },
  { title: "Purple Hibiscus", author: "Chimamanda Ngozi Adichie", origin: "Nigeria", band: "upper" },
  { title: "Half of a Yellow Sun", author: "Chimamanda Ngozi Adichie", origin: "Nigeria", band: "upper" },
  { title: "The Famished Road", author: "Ben Okri", origin: "Nigeria", band: "upper" },
  { title: "Aké: The Years of Childhood", author: "Wole Soyinka", origin: "Nigeria", band: "upper" },
  { title: "Efuru", author: "Flora Nwapa", origin: "Nigeria", band: "upper" },
  { title: "The Joys of Motherhood", author: "Buchi Emecheta", origin: "Nigeria", band: "upper" },
  { title: "Second Class Citizen", author: "Buchi Emecheta", origin: "Nigeria", band: "upper" },
  { title: "The Concubine", author: "Elechi Amadi", origin: "Nigeria", band: "upper" },
  { title: "Sozaboy", author: "Ken Saro-Wiwa", origin: "Nigeria", band: "upper" },
  { title: "Stay With Me", author: "Ayọ̀bámi Adébáyọ̀", origin: "Nigeria", band: "upper" },
  { title: "So Long a Letter", author: "Mariama Bâ", origin: "Senegal", band: "upper" },
  { title: "Nervous Conditions", author: "Tsitsi Dangarembga", origin: "Zimbabwe", band: "upper" },
  { title: "Mine Boy", author: "Peter Abrahams", origin: "South Africa", band: "upper" },
  { title: "Long Walk to Freedom", author: "Nelson Mandela", origin: "South Africa", band: "upper" },
];

export const BAND_LABELS: Record<Band, string> = {
  early: "First readers",
  middle: "Confident readers",
  upper: "Older pupils and reference",
};
