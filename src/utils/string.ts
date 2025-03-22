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