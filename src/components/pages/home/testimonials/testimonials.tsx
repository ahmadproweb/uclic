import TestimonialClient from './TestimonialClient';
import testi from './testi.json';
import type { Testimonial } from './types';

export default async function Testimonials() {
  // Map local JSON to Testimonial shape
  // Randomize order and limit to 40 entries
  const mapped: Testimonial[] = (testi as any[])
    .filter((t) => Boolean(t?.text))
    .sort(() => Math.random() - 0.5)
    .slice(0, 40)
    .map((t, idx) => ({
      id: String(t.comment_id ?? idx),
      title: String(t.author_name ?? 'Anonyme'),
      content: null,
      status: 'publish',
      clientDesignation: String(t.author_headline ?? ''),
      reviewGivenStar: 5,
      review: String(t.text ?? ''),
      imageTesti: t.author_profile_picture ?? null,
      authorProfileUrl: t.author_profile_url ?? null,
      commentUrl: t.comment_url ?? null,
    }));

  if (mapped.length === 0) return null;
  return <TestimonialClient testimonials={mapped} />;
}