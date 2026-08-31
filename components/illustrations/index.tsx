import type { ComponentType } from "react";
import CameraIllustration from "./CameraIllustration";
import ChecklistIllustration from "./ChecklistIllustration";
import HouseKeyIllustration from "./HouseKeyIllustration";
import MagnifierIllustration from "./MagnifierIllustration";
import PriceTagIllustration from "./PriceTagIllustration";
import StarsIllustration from "./StarsIllustration";

type IllustrationKey =
  | "houseKey"
  | "priceTag"
  | "camera"
  | "magnifier"
  | "stars"
  | "checklist";

const ILLUSTRATIONS: Record<IllustrationKey, ComponentType<{ className?: string }>> = {
  houseKey: HouseKeyIllustration,
  priceTag: PriceTagIllustration,
  camera: CameraIllustration,
  magnifier: MagnifierIllustration,
  stars: StarsIllustration,
  checklist: ChecklistIllustration,
};

/*
 * Every blog post is mapped to the variant that matches its subject, and the
 * same six variants are reused across related posts so the set reads as one
 * family of hand-drawn illustrations rather than 22 unrelated images.
 * All artwork is drawn in code (paths and shapes only) - no photography.
 */
export const POST_ILLUSTRATIONS: Record<string, IllustrationKey> = {
  // The product / "how to write the copy" posts
  "airbnb-listing-description-guide": "houseKey",
  "booking-com-description-guide": "houseKey",
  "hostcopy-ai-vs-chatgpt": "houseKey",
  "hostcopy-ai-vs-copyai": "houseKey",

  // Anything about money: pricing, costs, taxes, platform fees
  "airbnb-pricing-strategy": "priceTag",
  "airbnb-startup-cost": "priceTag",
  "short-term-rental-tax-basics": "priceTag",
  "airbnb-vs-booking-vs-vrbo": "priceTag",
  "airbnb-vs-vrbo-vs-booking-2026": "priceTag",

  // Visual and social posts
  "airbnb-photography-tips": "camera",
  "airbnb-instagram-marketing": "camera",

  // Search, discovery and timing
  "airbnb-seo-search-ranking": "magnifier",
  "airbnb-title-that-gets-clicks": "magnifier",
  "best-time-to-list-airbnb": "magnifier",
  "common-airbnb-description-mistakes": "magnifier",

  // Reputation and guest relations
  "how-to-get-airbnb-5-star-reviews": "stars",
  "airbnb-superhost-requirements": "stars",
  "dealing-with-difficult-airbnb-guests": "stars",

  // Setup, rules and reference material
  "new-airbnb-host-checklist": "checklist",
  "airbnb-house-rules-guide": "checklist",
  "best-airbnb-amenities-2026": "checklist",
  "airbnb-hosting-glossary": "checklist",
};

type PostIllustrationProps = {
  slug: string;
  variant?: "hero" | "thumb";
};

export function PostIllustration({ slug, variant = "hero" }: PostIllustrationProps) {
  const Illustration = ILLUSTRATIONS[POST_ILLUSTRATIONS[slug] ?? "houseKey"];

  if (variant === "thumb") {
    return (
      <div className="rounded-xl border border-brass/20 bg-parchment overflow-hidden" aria-hidden="true">
        <Illustration className="block w-full h-24" />
      </div>
    );
  }

  return (
    <div
      className="rounded-2xl border border-brass/20 bg-parchment overflow-hidden mt-6 print:hidden"
      aria-hidden="true"
    >
      <Illustration className="block w-full h-40 sm:h-48" />
    </div>
  );
}
