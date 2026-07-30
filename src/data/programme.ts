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
    body: "Repair and preparation of the room — flooring, ceiling, windows, lighting, ventilation, security and, where required, basic electrical work.",
  },
  {
    n: 2,
    key: "furniture",
    name: "The furniture",
    short: "Built locally, repairable locally.",
    body: "Shelving, reading tables, chairs and storage, sourced and built locally wherever possible to support the local economy and simplify repair.",
  },
  {
    n: 3,
    key: "collection",
    name: "The collection",
    short: "Books children want to read.",
    body: "Age-appropriate books selected with the school, weighted towards Nigerian and African authors alongside international titles, plus reference and curriculum-support material.",
  },
  {
    n: 4,
    key: "systems",
    name: "The systems",
    short: "A catalogue the school can keep.",
    body: "A simple catalogue, a borrowing and returns process, labelling, and a record-keeping method the school can maintain without specialist software.",
  },
  {
    n: 5,
    key: "people",
    name: "The people",
    short: "A trained adult, and time to read.",
    body: "Training for the teacher or staff member responsible for the library, guidance on timetabling reading periods, and a follow-up visit schedule.",
  },
] as const;

export type ComponentKey = (typeof COMPONENTS)[number]["key"];

/** How we work in Nigeria — the delivery model, step by step. */
export const DELIVERY_STEPS = [
  {
    title: "We vet a local partner",
    body: "An established organisation, contractor or school network with a verifiable track record in the community we are serving.",
  },
  {
    title: "We sign a written agreement",
    body: "Setting out the scope of work, the standards to be met, the reporting required, and the conditions under which funds are released.",
  },
  {
    title: "Funds move in stages",
    body: "Transferred against agreed milestones, never as a single lump sum.",
  },
  {
    title: "Evidence comes back at every stage",
    body: "Receipts, photographic records, inventory and progress reports from our partner.",
  },
  {
    title: "We verify",
    body: "Remotely as standard, and in person for a sample of projects.",
  },
  {
    title: "The decision stays with our board",
    body: "We retain authority over how our resources are used at every point.",
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
    body: "Books borrowed per pupil per term; library visits per week; reading periods timetabled.",
  },
  {
    name: "Learning",
    body: "Reading fluency and comprehension assessed at baseline and at follow-up intervals.",
  },
  {
    name: "Equity",
    body: "Participation disaggregated by gender, with specific attention to girls' access and usage.",
  },
  {
    name: "Durability",
    body: "Proportion of libraries still open, stocked and staffed at 12 and 24 months.",
  },
  {
    name: "Stewardship",
    body: "Cost per pupil reached; proportion of expenditure reaching programme delivery.",
  },
] as const;

/** Our values. */
export const VALUES = [
  {
    name: "Dignity",
    body: "We refurbish to a standard we would accept for our own children. We do not send what we would not use.",
  },
  {
    name: "Local leadership",
    body: "Nigerian educators know what Nigerian schools need. We fund and support their judgement rather than substituting our own.",
  },
  {
    name: "Accountability",
    body: "Every dollar is traceable to a school, a receipt and a result. We report to our donors as rigorously as we are required to report to regulators.",
  },
  {
    name: "Durability",
    body: "A library that closes within a year is a failure, however good the photographs. We fund maintenance, training and follow-up as part of every project.",
  },
  {
    name: "Evidence",
    body: "We measure whether children are reading more — not merely how many books we delivered.",
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
      "A complete refurbishment of one school library, named in your honour, with a full report and photographic record.",
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
      "One named shelf, stocked and labelled, in a named school — with a photograph of it once it is full.",
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
      "A standing amount that funds maintenance, follow-up visits and restocking — the part of the work that keeps a library open after the opening.",
  },
  {
    key: "grants",
    name: "Institutional grants",
    amount: "By agreement",
    delivers: "Multi-school programmes with formal reporting, monitoring and evaluation.",
  },
  {
    key: "inkind",
    name: "In-kind and pro bono",
    amount: "—",
    delivers:
      "Professional expertise in education, logistics, law, accounting or design.",
  },
];
