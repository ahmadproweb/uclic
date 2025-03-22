import { getTestimonials } from '@/services/wordpress';
import TestimonialClient from './TestimonialClient';

export default async function Testimonials() {
  try {
    const testimonials = await getTestimonials();
    
    if (!testimonials || testimonials.length === 0) {
      return null;
    }

    return <TestimonialClient testimonials={testimonials} />;
  } catch (error) {
    console.error('Error loading testimonials:', error);
    return null;
  }
} 