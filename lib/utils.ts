/** Format a number as ZAR currency — e.g. 1500 → "R 1 500" */
export function formatZAR(amount: number, decimals = 0): string {
  return (
    "R " +
    amount.toLocaleString("en-ZA", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    })
  );
}

/** Clamp a number between min and max */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/** Round up to nearest integer */
export function ceilInt(value: number): number {
  return Math.ceil(value);
}

/** Generate a slug from a string */
export function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/** Payhip product links — update once store is live */
export const PAYHIP_LINKS = {
  sideHustlePack:       "https://payhip.com/grade13/side-hustle-pack",
  sarsGuide:            "https://payhip.com/grade13/sars-guide",
  dropshippingBlueprint:"https://payhip.com/grade13/dropshipping",
  chineseSupplier:      "https://payhip.com/grade13/chinese-supplier",
  cipcGuide:            "https://payhip.com/grade13/cipc-guide",
  usdEarning:           "https://payhip.com/grade13/usd-earning",
  cvInterviewPack:      "https://payhip.com/grade13/cv-pack",
  loadSheddingGuide:    "https://payhip.com/grade13/load-shedding",
  popiaKit:             "https://payhip.com/grade13/popia",
  sarsMiniGuide:        "https://payhip.com/grade13/sars-mini",
} as const;
