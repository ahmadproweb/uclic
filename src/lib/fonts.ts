import localFont from "next/font/local";
import { Inter, Roboto_Mono } from "next/font/google";

export const absans = localFont({
  src: "../../public/absans-regular.woff",
  display: "block",
  variable: "--font-absans",
  preload: true,
  fallback: ["system-ui", "arial"],
});

export const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
export const gmono = Roboto_Mono({ subsets: ["latin"], variable: "--font-gmono" });
