import { Inter } from "next/font/google";
import localFont from "next/font/local";

export const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const absans = localFont({
  src: "../../public/absans-regular.woff",
  display: "block",
  variable: "--font-absans",
  preload: true,
  fallback: ["system-ui", "arial"],
});
