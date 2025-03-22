export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  slug: string;
  category?: string;
  reading_time: string;
  featured_image_url: string;
} 