export interface Category {
  id: string;
  title: MultiLanguageField;
  description: MultiLanguageField;
  created_at: Date;
}

export interface Product {
  id: string;
  title: MultiLanguageField;
  description: MultiLanguageField;
  categoryId: string;
  price: number;
  image?: string;
  created_at: Date;
}
export interface MultiLanguageField {
  en: string;
  fr: string;
  es: string;
  de: string;
  it: string;
  pt: string;
  ru: string;
}

export type Language = "en" | "fr" | "es" | "de" | "it" | "pt" | "ru";

export const LANGUAGES = {
  en: "English",
  fr: "Français",
  es: "Español",
  de: "Deutsch",
  it: "Italiano",
  pt: "Português",
  ru: "Русский",
} as const;

export const LANGUAGE_FLAGS = {
  en: "🇺🇸",
  fr: "🇫🇷",
  es: "🇪🇸",
  de: "🇩🇪",
  it: "🇮🇹",
  pt: "🇵🇹",
  ru: "🇷🇺",
} as const;

export type MultiLangText = {
  en: string;
  fr: string;
  es: string;
  de: string;
  it: string;
  pt: string;
  ru: string;
};
export type Categories = "cephalopod" | "pelagic" | "demersal";
