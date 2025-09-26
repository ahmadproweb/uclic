export function slugify(str: string): string {
  return str
    .toLowerCase()
    // Remplace les accents
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    // Remplace les espaces et caractères spéciaux par des tirets
    .replace(/[^a-z0-9]+/g, '-')
    // Enlève les tirets au début et à la fin
    .replace(/^-+|-+$/g, '');
}

export function cleanHtmlEntities(text: string): string {
  return text
    .replace(/&#038;/g, '&')
    .replace(/&#8211;/g, '–')
    .replace(/&#8216;/g, "'")
    .replace(/&#8217;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&#8230;/g, '...')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/&hellip;/g, '...')
    .replace(/&ndash;/g, '–')
    .replace(/&mdash;/g, '—')
    .replace(/&rsquo;/g, "'")
    .replace(/&lsquo;/g, "'");
} 