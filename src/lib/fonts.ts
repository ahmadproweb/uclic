import localFont from 'next/font/local';
import { Inter } from 'next/font/google';

export const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const absans = localFont({
  src: '../../public/absans-regular.otf',
  display: 'swap',
  variable: '--font-absans',
  preload: true,
}); 