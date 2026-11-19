import { easeInOut, glideDuration } from '../utils/glide';

/**
 * Links to a node on the map ("Now: leading Content Drive…") glide to it and center it in the
 * viewport, instead of the browser's jump that leaves the node at the page's top edge. The sprite
 * walks there on its own, since it follows the scroll. With reduced motion the page moves at once.
 * Focus moves to the node's link, so keyboard and screen reader users land where they looked.
 */
function nodeFor(hash: string): HTMLElement | null {
    const id = decodeURIComponent(hash.slice(1));

    return id ? document.querySelector<HTMLElement>(`[data-node="${CSS.escape(id)}"]`) : null;
}

let glide = 0;

const stop = (): void => {
    cancelAnimationFrame(glide);
    glide = 0;
};

// Any wheel, touch or key hands the page back to the visitor mid-glide.
for (const type of ['wheel', 'touchstart', 'keydown'] as const) {
    window.addEventListener(type, stop, { passive: true });
}

/** Scrolls to `to` with a slow ease in and out, sized to the distance. */
function glideTo(to: number): void {
    stop();
    const from = scrollY;
    const distance = to - from;
    const duration = glideDuration(distance);
    let begin = 0;

    const step = (time: number): void => {
        begin ||= time;
        const t = Math.min(1, (time - begin) / duration);

        scrollTo(0, from + distance * easeInOut(t));
        glide = t < 1 ? requestAnimationFrame(step) : 0;
    };

    glide = requestAnimationFrame(step);
}

function center(node: HTMLElement, smooth: boolean): void {
    const tile = node.querySelector<HTMLElement>('[data-tile]') ?? node;
    const box = tile.getBoundingClientRect();
    const max = document.documentElement.scrollHeight - innerHeight;
    const to = Math.min(max, Math.max(0, scrollY + box.top + box.height / 2 - innerHeight / 2));
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (smooth && !reduced) {
        glideTo(to);
    } else {
        stop();
        scrollTo(0, to);
    }

    node.querySelector<HTMLElement>('a')?.focus({ preventScroll: true });
}

document.addEventListener('click', (event) => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return;
    }

    const link = (event.target as Element | null)?.closest<HTMLAnchorElement>('a[href^="#"]');
    const node = link ? nodeFor(link.hash) : null;

    if (!link || !node) {
        return;
    }

    event.preventDefault();
    history.pushState(null, '', link.hash);
    center(node, true);
});

// Arriving with a node in the address (a shared link, or back and forward) centers it too.
const arrive = (): void => {
    const node = nodeFor(location.hash);

    if (node) {
        center(node, false);
    }
};

window.addEventListener('popstate', arrive);
window.addEventListener('load', arrive, { once: true });
