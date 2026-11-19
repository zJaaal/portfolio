import { EMAIL, LINKS } from '../constants';

interface PersonInput {
    /** The page's own language home, as an absolute URL. */
    url: string;
    image: string;
    description: string;
}

/**
 * Who this is, as schema.org JSON-LD that search and AI engines read directly (GEO). Only public
 * facts and public links: private repositories (Che Bondi, dotcms-scripts) are never listed. Pure.
 */
export function personSchema({ url, image, description }: PersonInput): Record<string, unknown> {
    const author = { '@type': 'Person', name: 'Jalinson Diaz' };

    return {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: 'Jalinson Diaz',
        alternateName: 'zJaaal',
        jobTitle: 'Product Engineer',
        url,
        email: `mailto:${EMAIL}`,
        image,
        description,
        worksFor: { '@type': 'Organization', name: 'dotCMS', url: 'https://www.dotcms.com' },
        homeLocation: { '@type': 'Place', name: 'Buenos Aires, Argentina' },
        knowsLanguage: ['en', 'es'],
        sameAs: [LINKS.GITHUB, LINKS.LINKEDIN],
        subjectOf: [
            {
                '@type': 'SoftwareSourceCode',
                name: 'Artemis',
                description: 'A Node framework for the commands AI agents run.',
                codeRepository: LINKS.ARTEMIS,
                url: LINKS.ARTEMIS_NPM,
                author
            },
            {
                '@type': 'SoftwareSourceCode',
                name: 'react-scroll-utilities',
                description: 'An npm library of React scroll hooks.',
                url: LINKS.SCROLL_UTILITIES_NPM,
                author
            }
        ]
    };
}
