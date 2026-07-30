export interface NavItem {
  href: string;
  label: string;
  blurb: string;
  /** Marks the beneficiary path so it can be styled distinctly. */
  audience?: "schools";
}

/** Primary navigation, in the order the brief specifies. */
export const NAV: NavItem[] = [
  { href: "/about", label: "About", blurb: "Our story, mission and team" },
  { href: "/our-work", label: "Our Work", blurb: "The programme model and our libraries" },
  { href: "/get-involved", label: "Get Involved", blurb: "Ways to give and to partner" },
  {
    href: "/for-schools",
    label: "For Schools",
    blurb: "Eligibility and application",
    audience: "schools",
  },
  { href: "/contact", label: "Contact", blurb: "Reach the right person" },
];

/** Secondary links, footer only. */
export const FOOTER_NAV: { href: string; label: string }[] = [
  { href: "/impact", label: "Impact & Reporting" },
  { href: "/news", label: "News" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms & Donor Policy" },
];
