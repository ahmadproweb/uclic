const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

export function getOptimizedImageUrl(url: string, width?: number, height?: number) {
  if (!CLOUDINARY_CLOUD_NAME) return url;
  
  // Si l'URL est déjà une URL Cloudinary, on la retourne telle quelle
  if (url.includes('cloudinary.com')) return url;
  
  // Sinon, on crée une URL Cloudinary
  const baseUrl = `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/fetch`;
  const transformParams = [
    'f_auto', // Format automatique (WebP si supporté)
    'q_auto:good', // Qualité automatique optimisée
    'c_fill', // Mode de recadrage intelligent
    width ? `w_${width}` : '',
    height ? `h_${height}` : '',
  ].filter(Boolean).join(',');

  return `${baseUrl}/${transformParams}/${encodeURIComponent(url)}`;
} 