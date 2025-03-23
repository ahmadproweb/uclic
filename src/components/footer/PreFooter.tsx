'use client';

import Link from "next/link";
import { colors as theme } from '@/config/theme';
import { cn } from '@/lib/utils';
import { useTheme } from "@/context/ThemeContext";

interface PreFooterProps {
  noBgGradient?: boolean;
}

export default function PreFooter({ noBgGradient = false }: PreFooterProps) {
  const { theme: currentTheme } = useTheme();
  const isDark = currentTheme === 'dark';

  return (
    <div className={cn(
      "w-full rounded-[32px] overflow-visible",
      noBgGradient ? "bg-black" : isDark ? "bg-[#D9FF4B]" : "bg-black"
    )}>
      <div className="grid grid-cols-1 md:grid-cols-2 items-center relative">
        {/* Left Content */}
        <div className="p-8 md:p-16 relative z-10">
          <h2 className="text-3xl md:text-5xl text-white font-normal mb-4">
            Prêt à transformer votre marketing ?
          </h2>
          <p className="text-white/60 text-base md:text-lg mb-8">
            Contactez-nous pour découvrir comment nous pouvons booster vos résultats dès aujourd&apos;hui.
          </p>
          <div className="flex flex-col md:flex-row gap-4">
            <Link 
              href="/services"
              className="inline-flex items-center px-6 py-3 bg-white hover:bg-[#D9FF4B] text-black rounded-full transition-all duration-300 text-base"
            >
              Nos services
              <svg 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                className="ml-2"
              >
                <path d="M4 12h16m0 0l-6-6m6 6l-6 6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
            <Link 
              href="/cas-clients"
              className="inline-flex items-center px-6 py-3 border border-white/10 text-white hover:bg-white/5 rounded-full transition-all duration-300 text-base"
            >
              Nos études de cas
              <svg 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                className="ml-2"
              >
                <path d="M4 12h16m0 0l-6-6m6 6l-6 6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>
        </div>

        {/* Right Content - Image */}
        <div className="relative h-full min-h-[400px] md:min-h-full overflow-visible bg-black rounded-br-[32px] rounded-tr-[32px]">
          {/* Background SVG */}
          <div className="absolute inset-0 z-[5] left-[48%] bottom-[0%] w-[450px]">
            <svg width="100%" height="100%" viewBox="0 0 611 491" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              <path d="M610.686 116.519C610.686 51.9064 558.089 -0.426768 493.379 0.00262359C456.602 0.243686 421.543 18.5117 399.93 48.2075C385.421 68.1479 376.645 93.723 380.479 118.5C382.415 130.997 387.674 142.749 395.757 152.49C398.002 155.202 418.387 178.291 419.17 177.439L418.974 177.635C433.731 195.956 432.617 222.835 415.599 239.852C398.582 256.869 371.703 257.984 353.383 243.227L353.186 243.423L316.598 206.834C295.467 185.703 266.803 173.831 236.919 173.831H57.3354C25.6659 173.831 0 199.504 0 231.166V395.247C0 395.729 0.00791574 396.211 0.0154489 396.686C0.0154489 397.16 0 397.635 0 398.117C0 449.636 42.126 491.318 93.8037 490.594C143.613 489.901 184.27 449.252 184.963 399.435C185.287 376.512 176.947 351.629 158.725 336.397C136.923 318.182 105.503 325.399 83.536 307.485C67.8293 294.679 58.2848 275.266 57.9835 254.971C57.6822 234.888 66.3223 215.354 81.3886 202.066C114.512 172.844 174.092 177.025 202.801 210.601C205.084 213.275 207.314 216.107 209.129 219.121L287.738 341.776C309.448 375.653 346.919 396.143 387.154 396.143H553.343C585.013 396.143 610.679 370.47 610.679 338.808V173.831C610.679 152.49 610.679 137.363 610.679 116.526L610.686 116.519Z" 
                fill={theme.colors.primary.main}
                className="opacity-100"
              />
            </svg>
          </div>

          {/* Logo Footer with clip path to ensure rounding */}
          <div className="absolute left-[5%] bottom-[-10%] w-[250px] h-[250px] z-20">
            <svg width="100%" height="100%" viewBox="0 0 352 330" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M351.415 232.339C351.34 230.455 351.212 228.572 351.069 226.681L351.009 226.086C350.85 224.195 350.67 222.304 350.459 220.421L337.728 88.9443C337.223 83.3094 336.748 77.6671 336.349 72.0248C335.618 61.7043 334.451 51.2105 330.775 41.4701C329.57 38.276 328.063 35.2552 326.376 32.2947C318.119 18.4261 304.793 7.85713 289.387 3.02082C282.992 1.00946 276.287 0 269.582 0C248.407 0 230.681 12.136 215.238 25.417C196.91 41.184 178.468 56.8228 160.042 72.4768C136.968 92.0782 115.084 110.7 91.8219 130.626C79.6257 141.074 66.8189 151.583 54.1707 161.481C42.8181 170.363 29.5145 180.345 20.083 191.396C7.88671 205.679 0.391452 224.097 0.0147922 244.256C-0.851525 290.525 36.4453 329.118 82.7217 329.758C129.608 330.406 167.817 292.597 167.817 245.861C167.817 231.728 164.336 217.506 157.21 205.053C153.812 199.11 146.618 190.733 141.353 186.356C136.102 181.987 130.867 177.663 127.221 171.757C121.819 163.003 118.941 152.811 118.941 142.528C118.941 111.747 143.892 86.7899 174.68 86.7899C199.102 86.7899 219.909 101.992 232.399 122.188C246.659 145.255 246.84 170.175 246.84 196.405C246.84 211.517 246.84 226.621 246.84 241.733C246.84 270.652 270.283 294.096 299.203 294.096C319.422 294.096 337.66 281.975 346.233 263.782C350.813 254.064 351.838 243.307 351.401 232.339H351.415Z" 
                fill={theme.colors.primary.main}
              />
            </svg>
          </div>
          
          {/* Image with clip-path to respect rounded corner */}
          <div className="relative h-full w-full rounded-br-[32px] rounded-tr-[32px] overflow-hidden">
            <img
              src="/man-516x378.webp"
              alt="Notre équipe"
              width="516"
              height="378"
              className="absolute bottom-0 right-0 h-full w-auto object-contain z-10 rounded-br-[32px] rounded-tr-[32px]"
              loading="eager"
            />
          </div>
        </div>
      </div>
    </div>
  );
} 