/**
 * Looping demo videos (`video[data-loop]`) play only while they are on screen, so a page with
 * several never decodes them all at once. With reduced motion they never start on their own:
 * they show their poster and native controls, and the visitor presses play.
 *
 * Each one drives the controls in its figure: a progress road (`[data-progress]`, through a
 * `--progress` custom property from 0 to 1, updated once a frame only while it plays), a seek
 * slider on that road (`[data-seek]`), and a replay button (`[data-replay]`).
 *
 * Videos load nothing but their poster until they are wanted (`preload="none"`). Once one is asked
 * to play and still can't after a short grace, its figure gets `data-state="loading"`, so on a slow
 * connection the poster reads as "on its way" rather than as the whole demo.
 */
const VISIBLE_RATIO = 0.35;
const SEEK_STEPS = 1000;
const LOADING_GRACE_MS = 250;

/**
 * Plays a clip. The native controls come back only when the browser refuses to start it on its own
 * (autoplay blocked: `NotAllowedError`), so the visitor can press play. A play cut short by a pause,
 * as when a clip scrolls out of view before it starts (`AbortError`), is no reason to show them.
 */
function start(video: HTMLVideoElement): void {
    video.play().catch((error: unknown) => {
        if (error instanceof DOMException && error.name === 'NotAllowedError') {
            video.controls = true;
        }
    });
}

function wire(video: HTMLVideoElement): void {
    const figure = video.closest('figure');
    const road = figure?.querySelector<HTMLElement>('[data-progress]');
    const seek = figure?.querySelector<HTMLInputElement>('[data-seek]');
    const replay = figure?.querySelector<HTMLButtonElement>('[data-replay]');
    let frame = 0;
    let dragging = false;
    let grace = 0;

    // Loading shows only while the clip is wanted and not moving; it clears on playback, on a pause
    // (it left the screen) and on failure, where the native controls take over.
    const loading = (on: boolean): void => {
        clearTimeout(grace);
        if (!on) {
            figure?.removeAttribute('data-state');
            return;
        }
        grace = window.setTimeout(() => figure?.setAttribute('data-state', 'loading'), LOADING_GRACE_MS);
    };
    video.addEventListener('waiting', () => loading(true));
    video.addEventListener('playing', () => loading(false));
    video.addEventListener('pause', () => loading(false));
    // A source that fails reports on its <source>; the video only errors when every source has.
    video.querySelector('source:last-of-type')?.addEventListener('error', () => {
        loading(false);
        video.controls = true;
    });
    video.addEventListener('play', () => {
        if (video.readyState < HTMLMediaElement.HAVE_FUTURE_DATA) loading(true);
    });

    const show = (ratio: number): void => {
        road?.style.setProperty('--progress', String(ratio));
        if (seek && !dragging) seek.value = String(Math.round(ratio * SEEK_STEPS));
    };
    const draw = (): void => {
        if (video.duration > 0) show(video.currentTime / video.duration);
        frame = video.paused ? 0 : requestAnimationFrame(draw);
    };

    video.addEventListener('play', () => {
        cancelAnimationFrame(frame);
        frame = requestAnimationFrame(draw);
    });
    video.addEventListener('pause', draw);
    video.addEventListener('seeked', draw);

    // Dragging the road scrubs the clip; it keeps playing from there once the pointer lets go.
    seek?.addEventListener('input', () => {
        dragging = true;
        const ratio = Number(seek.value) / SEEK_STEPS;
        road?.style.setProperty('--progress', String(ratio));
        if (video.duration > 0) video.currentTime = ratio * video.duration;
    });
    seek?.addEventListener('change', () => {
        dragging = false;
    });

    replay?.addEventListener('click', () => {
        video.currentTime = 0;
        show(0);
        start(video);
    });
}

const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
const videos = [...document.querySelectorAll<HTMLVideoElement>('video[data-loop]')];
videos.forEach(wire);

function still(): void {
    for (const video of videos) {
        video.pause();
        video.controls = true;
    }
}

if (reduced.matches) {
    still();
} else {
    const observer = new IntersectionObserver(
        (entries) => {
            for (const entry of entries) {
                const video = entry.target as HTMLVideoElement;
                if (entry.isIntersecting) start(video);
                else video.pause();
            }
        },
        { threshold: VISIBLE_RATIO }
    );
    videos.forEach((video) => observer.observe(video));
    reduced.addEventListener('change', () => {
        observer.disconnect();
        still();
    });
}
