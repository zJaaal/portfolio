import { THEME_STORAGE_KEY } from '../constants';

const THEME = { LIGHT: 'light', DARK: 'dark' } as const;

type Theme = (typeof THEME)[keyof typeof THEME];

function readStored(): string | null {
    try {
        return localStorage.getItem(THEME_STORAGE_KEY);
    } catch {
        return null; // ignoreStorageBlocked: private mode falls back to the system theme
    }
}

function systemTheme(): Theme {
    return matchMedia('(prefers-color-scheme: dark)').matches ? THEME.DARK : THEME.LIGHT;
}

function effectiveTheme(): Theme {
    const stored = readStored();

    return stored === THEME.LIGHT || stored === THEME.DARK ? stored : systemTheme();
}

function render(): void {
    const theme = effectiveTheme();

    document.documentElement.dataset.effective = theme;

    for (const button of document.querySelectorAll<HTMLButtonElement>('[data-theme-toggle]')) {
        const label = theme === THEME.DARK ? button.dataset.toLight : button.dataset.toDark;

        button.setAttribute('aria-label', label ?? '');
    }
}

function toggle(): void {
    const next = effectiveTheme() === THEME.DARK ? THEME.LIGHT : THEME.DARK;

    document.documentElement.dataset.theme = next;

    try {
        localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
        // ignoreStorageBlocked: the choice lasts for this page only
    }

    render();
}

for (const button of document.querySelectorAll('[data-theme-toggle]')) {
    button.addEventListener('click', toggle);
}

matchMedia('(prefers-color-scheme: dark)').addEventListener('change', render);
render();
