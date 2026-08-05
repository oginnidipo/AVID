/**
 * The five-part refurbishment package, as set out in the organisational
 * profile. Copy here is taken from that document.
 *
 * Every school library AVID takes on receives all five. That completeness is
 * the organisation's central claim, so the five appear together wherever they
 * appear at all — never as a subset.
 */
export const COMPONENTS = [
  {
    n: 1,
    key: "space",
    name: "The space",
    short: "A room fit to read in.",
    body: "Flooring, ceiling, windows, lighting, ventilation, security, and wiring where it is needed.",
  },
  {
    n: 2,
    key: "furniture",
    name: "The furniture",
    short: "Built locally, repairable locally.",
    body: "Shelving, tables, chairs and storage — built locally, so a broken chair is mended in an afternoon.",
  },
  {
    n: 3,
    key: "collection",
    name: "The collection",
    short: "Books children want to read.",
    body: "Chosen with the school's teachers. Weighted towards Nigerian and African authors, plus reference and curriculum titles.",
  },
  {
    n: 4,
    key: "systems",
    name: "The systems",
    short: "A catalogue the school can keep.",
    body: "A catalogue, a borrowing process and labelling the school can keep up without special software.",
  },
  {
    n: 5,
    key: "people",
    name: "The people",
    short: "A trained adult, and time to read.",
    body: "We train the staff member who will run it, help timetable reading periods, and come back.",
  },
] as const;

export type ComponentKey = (typeof COMPONENTS)[number]["key"];

/** How we work in Nigeria — the delivery model, step by step. */
export const DELIVERY_STEPS = [
  {
    title: "We vet a local partner",
    body: "An organisation or contractor with a verifiable record in that community.",
  },
  {
    title: "We sign a written agreement",
    body: "Scope, standards, reporting, and the conditions for releasing funds.",
  },
  {
    title: "Funds move in stages",
    body: "Transferred against agreed milestones, never as a single lump sum.",
  },
  {
    title: "Evidence comes back at every stage",
    body: "Receipts, photographs, inventory and progress reports.",
  },
  {
    title: "We verify",
    body: "Remotely as standard, and in person for a sample of projects.",
  },
  {
    title: "The decision stays with our board",
    body: "We retain authority over our resources at every point.",
  },
] as const;

/** Theory of change, as four linked columns. */
export const THEORY_OF_CHANGE = [
  {
    stage: "We invest in",
    items: [
      "Refurbished rooms",
      "Furniture and shelving",
      "Curated book stock",
      "Trained library staff",
      "Simple lending systems",
    ],
  },
  {
    stage: "Which produces",
    items: [
      "Functioning, open libraries",
      "Books children want to read",
      "Scheduled reading periods",
      "A responsible adult in place",
    ],
  },
  {
    stage: "Which leads to",
    items: [
      "More books borrowed",
      "More time spent reading",
      "Reading habits formed",
      "Teachers using the library in lessons",
    ],
  },
  {
    stage: "Resulting in",
    items: [
      "Improved reading fluency and comprehension",
      "Stronger academic outcomes",
      "A resource the school sustains itself",
    ],
  },
] as const;

/** What we measure. */
export const MEASURES = [
  { name: "Reach", body: "Libraries refurbished; pupils with access; schools served." },
  {
    name: "Usage",
    body: "Books borrowed per pupil; library visits per week; reading periods timetabled.",
  },
  {
    name: "Learning",
    body: "Reading fluency and comprehension, at baseline and at follow-up.",
  },
  {
    name: "Equity",
    body: "Participation by gender, with specific attention to girls' access.",
  },
  {
    name: "Durability",
    body: "Libraries still open, stocked and staffed at 12 and 24 months.",
  },
  {
    name: "Stewardship",
    body: "Cost per pupil; share of spending reaching delivery.",
  },
] as const;

/** Our values. */
export const VALUES = [
  {
    name: "Dignity",
    body: "We refurbish to a standard we would accept for our own children.",
  },
  {
    name: "Local leadership",
    body: "Nigerian educators know what Nigerian schools need. We fund their judgement rather than replace it.",
  },
  {
    name: "Accountability",
    body: "Every dollar is traceable to a school, a receipt and a result.",
  },
  {
    name: "Durability",
    body: "A library that closes within a year is a failure, however good the photographs.",
  },
  {
    name: "Evidence",
    body: "We measure whether children read more, not how many books we delivered.",
  },
] as const;

/**
 * Ways to give.
 *
 * TODO(AVID): the `amount` fields are placeholders. Set real figures once the
 * first cohort is costed. A tier with an empty amount displays as
 * "By arrangement" rather than showing a blank or a fake number.
 */
export interface GivingTier {
  key: string;
  name: string;
  /** Empty means "not costed yet" — rendered as "By arrangement". */
  amount: string;
  delivers: string;
  featured?: boolean;
}

export const GIVING_TIERS: GivingTier[] = [
  {
    key: "library",
    name: "Sponsor a library",
    amount: "",
    delivers:
      "One school library, complete and named in your honour, with a full report.",
    featured: true,
  },
  {
    key: "collection",
    name: "Fund a collection",
    amount: "",
    delivers: "The book stock for one school, selected with its teachers.",
  },
  {
    key: "shelf",
    name: "Adopt a shelf",
    amount: "",
    delivers:
      "One named shelf in a named school, with a photograph once it is full.",
  },
  {
    key: "systems",
    name: "Fund the systems",
    amount: "",
    delivers: "Cataloguing, shelving and staff training for one library.",
  },
  {
    key: "monthly",
    name: "Give monthly",
    amount: "",
    delivers:
      "Funds maintenance, follow-up and restocking — what keeps a library open after the opening.",
  },
  {
    key: "grants",
    name: "Institutional grants",
    amount: "By agreement",
    delivers: "Multi-school programmes with formal monitoring and evaluation.",
  },
  {
    key: "inkind",
    name: "In-kind and pro bono",
    amount: "—",
    delivers:
      "Professional expertise in education, logistics, law, accounting or design.",
  },
];
