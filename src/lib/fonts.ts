import localFont from "next/font/local";

export const absans = localFont({
  src: "../../public/absans-regular.woff",
  display: "block",
  variable: "--font-absans",
  preload: true,
  fallback: ["system-ui", "arial"],
});
