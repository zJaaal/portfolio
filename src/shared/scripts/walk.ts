import { WALK } from '../../features/home/shared/constants';
import { advance, distances, pointAt, restTarget, type Px, type Stride } from '../../features/home/utils/walk';

/**
 * Walks the map's sprite (pixel me) along the road as the page scrolls: to the last node above the
 * reading line, on its own clock, so a flick of the wheel never makes it jump. It rests on the
 * node's center; hovering or focusing that node makes it step aside, beside the node, so the icon
 * can float, and it steps back when the pointer leaves. Without JS it stands on the newest floor;
 * with reduced motion it steps straight to its node.
 */
function start(run: HTMLElement): void {
    const sprite = run.querySelector<HTMLElement>('[data-sprite]');
    const waypoints = [...run.querySelectorAll<HTMLElement>('[data-waypoint]')];

    if (!sprite || waypoints.length < 2) {
        return;
    }

    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    let points: Px[] = [];
    let along: number[] = [];
    let rests: { y: number; distance: number; id: string }[] = [];
    let aside: string | null = null;
    let here: HTMLElement | null = null;
    let stride: Stride = { distance: 0, velocity: 0 };
    let target = 0;
    let frame = 0;
    let last = 0;

    const measure = (): void => {
        points = waypoints.map((el) => ({ x: el.offsetLeft, y: el.offsetTop }));
        along = distances(points);
        rests = waypoints.flatMap((el, i) => {
            const id = el.dataset.rest;

            return id ? [{ y: points[i].y, distance: along[i], id }] : [];
        });
    };

    const aim = (): void => {
        const settled = Math.min(1, scrollY / (innerHeight * WALK.settleScroll));
        const readingY = innerHeight * WALK.readingLine * settled - run.getBoundingClientRect().top;
        const atEnd = scrollY + innerHeight >= document.documentElement.scrollHeight - WALK.bottomSlack;

        target = restTarget(rests, readingY, atEnd);
    };

    // Beside the node it stands on, while that node is hovered or focused: clear of the icon.
    const stepAside = (): void => {
        const tile = here?.querySelector<HTMLElement>('[data-tile]');
        const beside = tile !== undefined && tile !== null && here?.dataset.node === aside && stride.velocity === 0;

        if (tile) {
            sprite.style.setProperty('--aside', `${tile.offsetWidth / 2}px`);
        }

        if (beside === sprite.hasAttribute('data-aside')) {
            return;
        }

        // Walking aside it faces left, the way it goes; back on the road it faces right. Once
        // aside, it turns to face the node.
        sprite.toggleAttribute('data-aside', beside);
        sprite.toggleAttribute('data-left', beside);

        if (!reduced.matches) {
            sprite.setAttribute('data-stepping', '');
        }
    };

    sprite.querySelector('[data-body]')?.addEventListener('transitionend', () => {
        sprite.removeAttribute('data-stepping');

        if (sprite.hasAttribute('data-aside')) {
            sprite.removeAttribute('data-left');
        }
    });

    // The node the sprite stands on, marked so it can light up; cleared as soon as it walks on.
    const settle = (arrived: boolean): void => {
        const rest = rests.find((r) => r.distance === stride.distance);
        const node = rest ? run.querySelector<HTMLElement>(`[data-node="${rest.id}"]`) : null;

        if (node !== here) {
            here?.removeAttribute('data-here');
            node?.setAttribute('data-here', '');
            here = node;
        }

        sprite.toggleAttribute('data-arrived', arrived && node !== null);
        stepAside();
    };

    const draw = (): void => {
        const at = pointAt(points, along, stride.distance);
        const ahead = pointAt(points, along, stride.distance + Math.sign(stride.velocity));

        sprite.style.translate = `${at.x}px ${at.y}px`;
        sprite.toggleAttribute('data-walking', stride.velocity !== 0);

        if (ahead.x !== at.x) {
            sprite.toggleAttribute('data-left', ahead.x < at.x);
        }
    };

    const tick = (now: number): void => {
        stride = advance(stride, target, (now - last) / 1000);
        last = now;
        draw();

        if (stride.distance === target) {
            frame = 0;
            settle(true);
        } else {
            frame = requestAnimationFrame(tick);
        }
    };

    const follow = (): void => {
        aim();

        if (reduced.matches) {
            stride = { distance: target, velocity: 0 };
            draw();
            settle(false);

            return;
        }

        if (frame === 0 && stride.distance !== target) {
            here?.removeAttribute('data-here');
            here = null;
            sprite.removeAttribute('data-arrived');
            sprite.removeAttribute('data-aside');
            last = performance.now();
            frame = requestAnimationFrame(tick);
        }
    };

    const relayout = (): void => {
        measure();
        aim();
        stride = { distance: target, velocity: 0 };
        draw();
        settle(false);
    };

    for (const node of run.querySelectorAll<HTMLElement>('[data-node]')) {
        const id = node.dataset.node ?? null;
        const enter = (): void => {
            aside = id;
            stepAside();
        };
        const leave = (): void => {
            aside = null;
            stepAside();
        };

        node.addEventListener('pointerenter', enter);
        node.addEventListener('pointerleave', leave);
        node.addEventListener('focusin', enter);
        node.addEventListener('focusout', leave);
    }

    relayout();
    run.setAttribute('data-walk', '');
    addEventListener('scroll', follow, { passive: true });
    new ResizeObserver(relayout).observe(run);
}

const run = document.querySelector<HTMLElement>('[data-run]');

if (run) {
    start(run);
}
