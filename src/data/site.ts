/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  THE AVID FOUNDATION — SITE CONFIGURATION
 * ─────────────────────────────────────────────────────────────────────────────
 *  This is the one file to edit for the details that change as AVID grows:
 *  the domain, email addresses, donation links, charitable registration number
 *  and the impact figures.
 *
 *  Everything here is deliberately plain text. You do not need to understand
 *  the rest of the codebase to change any of it. Edit, save, and the site
 *  rebuilds. Anything marked TODO is a placeholder awaiting real information.
 * ─────────────────────────────────────────────────────────────────────────────
 */

interface SiteConfig {
  name: string;
  shortName: string;
  tagline: string;
  blurb: string;
  url: string;
  legalStatus: string;
  founded: string;
  location: {
    city: string;
    region: string;
    country: string;
    line: string;
  };
  programmeCountry: string;
  programmeRegion: string;
  /** Empty until the CRA grants registration. */
  charitableRegistrationNumber: string;
  email: {
    general: string;
    applications: string;
    partnerships: string;
    donate: string;
  };
  /** Empty hides every phone link on the site. */
  phone: string;
  social: {
    instagram: string;
    linkedin: string;
    x: string;
    facebook: string;
  };
}

/* Typed as SiteConfig rather than inferred `as const`: the placeholders below
   are genuinely going to change, and a literal type of "" would make the code
   that uses them look unreachable to the type checker. */
export const SITE: SiteConfig = {
  name: "The AVID Foundation",
  shortName: "AVID",

  /** Vision line. Used as the site tagline throughout. */
  tagline: "Where every classroom has a library behind it.",

  /** One-sentence description. Used in the footer and as the fallback meta description. */
  blurb:
    "The AVID Foundation refurbishes and restocks libraries in under-resourced Nigerian schools, and supports the teachers who bring them to life. We begin in Lagos.",

  /**
   * TODO(AVID): confirm the final domain, then set it here.
   * Must include the protocol and no trailing slash. Used for canonical URLs,
   * the sitemap and social share cards.
   */
  url: "https://theavidfoundation.org",

  /** Registered in Canada, delivering in Nigeria. */
  legalStatus: "A Canadian-registered non-profit",
  founded: "2026",
  location: {
    city: "Toronto",
    region: "Ontario",
    country: "Canada",
    /** Shown as the postal/legal line in the footer and on Contact. */
    line: "Toronto, Ontario, Canada",
  },
  programmeCountry: "Nigeria",
  programmeRegion: "Lagos",

  /**
   * TODO(AVID): once the CRA grants charitable registration, put the number
   * here. Leaving it empty is deliberate and safe: while it is empty the site
   * shows an honest "registration in progress" note and never implies that
   * donation tax receipts are issued. See also `donate.taxReceiptsAvailable`.
   */
  charitableRegistrationNumber: "",

  /**
   * Addresses shown in mailto: links and offered as the fallback whenever a
   * form cannot be submitted.
   *
   * ⚠ Every address here must be a mailbox that actually receives mail. The
   * site tells people to write to these; one that bounces is worse than no
   * address at all, because the sender believes they have made contact.
   *
   * All four are live mailboxes on Dynadot Pro Email, verified as accepting.
   */
  email: {
    general: "info@theavidfoundation.org",
    applications: "applications@theavidfoundation.org",
    partnerships: "partners@theavidfoundation.org",
    donate: "donate@theavidfoundation.org",
  },

  /** TODO(AVID): supply a phone number, or leave empty to hide it everywhere. */
  phone: "",

  social: {
    /** Leave a value empty to hide that icon. */
    instagram: "",
    linkedin: "",
    x: "",
    facebook: "",
  },
};

/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  DONATIONS
 * ─────────────────────────────────────────────────────────────────────────────
 *  Every "give" button on the site reads from here, so switching platforms is
 *  a one-line change. Canadian rule: official donation tax receipts can only
 *  be issued once CRA registered-charity status is granted. Until then keep
 *  `taxReceiptsAvailable` false — the site's wording depends on it and will
 *  not claim receipts while it is false.
 * ─────────────────────────────────────────────────────────────────────────────
 */
interface DonateConfig {
  url: string;
  platformName: string;
  taxReceiptsAvailable: boolean;
  currencies: string[];
}

export const DONATE: DonateConfig = {
  /**
   * TODO(AVID): the giving route, once it exists.
   *
   * An Interac account is being set up. Until the client is ready to announce
   * it, leave this empty: the site then says nothing at all about how to give,
   * and the give buttons open the donations inbox so no one is stranded.
   *
   * ⚠ Before setting this, read the copy it switches on — Get Involved and the
   * privacy policy both gain a line about a donation provider handling payment.
   * That wording is deliberately method-neutral, but an Interac transfer goes
   * to AVID's own bank rather than through a provider, so those two sentences
   * will need a pass rather than just a URL.
   */
  url: "",

  /** Shown to donors so they know where their payment details are going. */
  platformName: "",

  taxReceiptsAvailable: false,

  /**
   * Currencies accepted. Only shown once `url` is set; revise it then — an
   * Interac transfer is Canadian dollars only.
   */
  currencies: ["CAD", "USD", "GBP", "NGN"],
};

/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  FORMS
 * ─────────────────────────────────────────────────────────────────────────────
 *  A web form cannot send email by itself; it has to post to a service that
 *  does. Paste your endpoint URLs below. Recommended: Formspree (formspree.io)
 *  — set each form's destination to the matching AVID address.
 *
 *  While an endpoint is empty, the form still renders and validates, but
 *  submitting shows a plain "email us directly" fallback with a mailto: link
 *  rather than silently losing the message.
 * ─────────────────────────────────────────────────────────────────────────────
 */
interface FormEndpoints {
  schoolApplication: string;
  contact: string;
  partnership: string;
  newsletter: string;
  /**
   * Can the school application accept photo attachments?
   *
   * Formspree's free tier has no file-upload storage, and its documentation
   * does not say whether a submission carrying a file is rejected outright or
   * simply has the file dropped. A rejected submission means a head teacher
   * loses a completed application, so this defaults to `false`: the upload
   * field is hidden and applicants are invited to email photographs instead,
   * which always works.
   *
   * Set to `true` on a paid Formspree plan (file storage is included), or once
   * you have tested a free-tier submission with an attachment and confirmed the
   * rest of the answers still arrive.
   */
  fileUploadsEnabled: boolean;
}

export const FORMS: FormEndpoints = {
  /** "AVID — School application" → applications@ */
  schoolApplication: "https://formspree.io/f/mrpzzggb",
  /** "AVID — General enquiry" → applications@ */
  contact: "https://formspree.io/f/xjybbvvw",
  /** "AVID — Partnership enquiry" → applications@ */
  partnership: "https://formspree.io/f/maewwyyb",
  /** TODO(AVID): Mailchimp / Buttondown form action URL for newsletter signup. */
  newsletter: "",

  /** See the note on this field above before switching it on. */
  fileUploadsEnabled: false,
};

/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  IMPACT FIGURES
 * ─────────────────────────────────────────────────────────────────────────────
 *  Two sets of numbers, kept apart on purpose.
 *
 *  `goals`   — what the first cohort is funded to achieve. Shown as goals.
 *  `actual`  — what has actually been delivered and verified. Starts at zero.
 *
 *  The site labels these honestly and will never present a goal as an
 *  achievement. Update `actual` as libraries open, and update `verifiedOn`
 *  to the date you last checked the figures.
 * ─────────────────────────────────────────────────────────────────────────────
 */
interface ImpactConfig {
  goals: { libraries: number; pupils: number; books: number };
  actual: { libraries: number; pupils: number; books: number };
  verifiedOn: string;
  spendingReportedToNamedSchool: number;
}

export const IMPACT: ImpactConfig = {
  /** TODO(AVID): replace with real pilot targets once the first cohort is set. */
  goals: {
    libraries: 5,
    pupils: 4000,
    books: 7500,
  },
  actual: {
    libraries: 0,
    pupils: 0,
    books: 0,
  },
  /** TODO(AVID): date you last verified the `actual` figures above. */
  verifiedOn: "",
  /**
   * Proportion of spending reported against a named school. This is a policy
   * commitment, not a measurement — it is 100% by design because every
   * disbursement is tied to a school, a receipt and a result.
   */
  spendingReportedToNamedSchool: 100,
};

/** Analytics. Privacy-friendly and cookieless by default — see docs/HANDOVER.md. */
/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  SEARCH ENGINES
 * ─────────────────────────────────────────────────────────────────────────────
 *  Verification tokens prove to Google and Bing that you own the domain, which
 *  is what unlocks Search Console — where you see the queries people used to
 *  find you, and can ask for pages to be re-crawled.
 *
 *  Get the Google one at search.google.com/search-console → add
 *  theavidfoundation.org → choose "HTML tag" → copy the `content` value only
 *  (not the whole tag). Bing: bing.com/webmasters.
 * ─────────────────────────────────────────────────────────────────────────────
 */
interface SearchConfig {
  googleSiteVerification: string;
  bingSiteVerification: string;
}

export const SEARCH: SearchConfig = {
  /** TODO(AVID): paste the content value from Search Console's HTML tag. */
  googleSiteVerification: "",
  /** TODO(AVID): optional — Bing Webmaster Tools. */
  bingSiteVerification: "",
};

interface AnalyticsConfig {
  plausibleDomain: string;
  googleAnalyticsId: string;
}

export const ANALYTICS: AnalyticsConfig = {
  /**
   * TODO(AVID): choose one.
   *  - Leave empty for no analytics at all (and no cookie banner needed).
   *  - Set `plausibleDomain` to your domain for Plausible (cookieless, no banner).
   *  - Set `googleAnalyticsId` for GA4 (sets cookies — the consent banner will
   *    then appear automatically and GA only loads after consent).
   */
  plausibleDomain: "",
  googleAnalyticsId: "",
};

/** True when any analytics tool that sets cookies is enabled. Drives the consent banner. */
export const NEEDS_COOKIE_CONSENT = ANALYTICS.googleAnalyticsId !== "";
