import en from './en.json';
import es from './es.json';

export const LOCALES = ['en', 'es'] as const;
export type Locale = (typeof LOCALES)[number];
export type MessageKey = keyof typeof en;

const MESSAGES: Record<Locale, Record<MessageKey, string>> = { en, es };

/** The translator for one locale. English is the source; es.json mirrors its keys. */
export function useTranslations(locale: Locale): (key: MessageKey) => string {
    return (key) => MESSAGES[locale][key];
}

/** The same page in the other locale: `/en/` → `/es/`. Pure. */
export function localizedPath(locale: Locale, path = '/'): string {
    return `/${locale}${path}`;
}
