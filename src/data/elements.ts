/**
 * The six elements (Brand Book 01). Each service has a symbol and a side:
 * haus pulls a brand towards desire, profit pulls it towards the P&L.
 * Oxblood = profit side, white = haus side.
 */
export type Side = "haus" | "profit";

export type Element = {
  /** Brand Book element number, 01 to 06 */
  n: string;
  symbol: string;
  title: string;
  side: Side;
  description: string;
};

export const ELEMENTS: Element[] = [
  {
    n: "01",
    symbol: "Bp",
    title: "Brand positioning",
    side: "haus",
    description:
      "What the brand stands for, and why someone pays full price for it. We set the position first, because everything else hangs off it.",
  },
  {
    n: "02",
    symbol: "Cc",
    title: "Content creation",
    side: "haus",
    description:
      "Creative with a commercial job to do. Product, campaign and social content planned around launches and drops, not posted to fill a grid.",
  },
  {
    n: "03",
    symbol: "Wt",
    title: "Website trading",
    side: "profit",
    description:
      "The site run like a shop floor. Merchandising, pricing, promotions and the trading calendar, planned against the forecast by people who have owned the number.",
  },
  {
    n: "04",
    symbol: "Cr",
    title: "CRO",
    side: "profit",
    description:
      "Where the money leaks between the ad and the order. We rebuild the product page and fix checkout drop-off.",
  },
  {
    n: "05",
    symbol: "Cm",
    title: "CRM",
    side: "profit",
    description:
      "Email, SMS and retention. Your second order matters more than your first.",
  },
  {
    n: "06",
    symbol: "Mk",
    title: "Marketing",
    side: "haus",
    description:
      "One strategy across paid, organic and partnerships, aimed at the same goal, so your channels stop fighting over credit for the same sale.",
  },
];

const byNumber = (n: string) => ELEMENTS.find((e) => e.n === n)!;

/**
 * Shown alternating haus, profit, haus, profit: the scale swinging from one
 * side to the other. It also means neighbouring slides never share a ground,
 * so the zoom-through always reveals a different colour.
 */
export const ELEMENTS_ALTERNATING: Element[] = [
  "01",
  "03",
  "02",
  "04",
  "06",
  "05",
].map(byNumber);
