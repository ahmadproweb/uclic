export interface Testimonial {
  id: string;
  title: string;
  content: string | null;
  status: string;
  clientDesignation: string;
  reviewGivenStar: number;
  review: string;
  imageTesti: string | null;
  authorProfileUrl?: string | null;
  commentUrl?: string | null;
} 