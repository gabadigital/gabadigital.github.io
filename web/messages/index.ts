import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "./types";
import en from "./en";
import fr from "./fr";

const dictionaries: Record<Locale, Dictionary> = { en, fr };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries.en;
}

export type { Dictionary, ServiceSlug } from "./types";
