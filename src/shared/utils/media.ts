import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const HASH_LENGTH = 8;
const PUBLIC_DIR = join(process.cwd(), 'public');

/**
 * Adds a short hash of a file's contents to its URL: `/media/work/x.mp4` → `/media/work/x.mp4?v=3f9a1c2b`.
 * Media is cached as immutable for a year (`public/_headers`), so a replaced file must get a new
 * URL; hashing at build time does that without renaming anything. Runs at build only, on files in
 * `public/`. A path that isn't there is returned as is.
 */
export function versioned(path: string): string {
    try {
        const hash = createHash('sha1').update(readFileSync(join(PUBLIC_DIR, path))).digest('hex');
        return `${path}?v=${hash.slice(0, HASH_LENGTH)}`;
    } catch {
        return path;
    }
}
