'use client';

import { memo } from 'react';
import { colors as theme } from '@/config/theme';
import { cn } from '@/lib/utils';
import { useTheme } from "@/context/ThemeContext";
import { CTAButton } from "@/components/ui/cta-button";

interface PreFooterProps {
  noBgGradient?: boolean;
}

// Memoized Components
const LeftContent = memo(({ isDark }: { isDark: boolean }) => (
  <div
  className={cn(
      "p-8 md:p-12 relative z-10 backdrop-blur-md overflow-hidden rounded-tl-2xl rounded-bl-2xl",
      isDark 
        ? "bg-black/20" 
        : "bg-white/20"
    )}
  >
    {/* Background pattern */}
    <div
      className="absolute inset-0 rounded-tl-2xl rounded-bl-2xl -z-10"
      style={{
        backgroundImage: `url(${require('../../lib/assets').backgroundEffectUrl})`,
        backgroundRepeat: "repeat",
        backgroundSize: "200px",
        opacity: isDark ? "0.25" : "0.04"
      }}
    />
    <span
      className="text-3xl md:text-5xl font-normal mb-4 animate-fade-in-up text-black dark:text-white block"
      role="text"
      aria-label="Prêt à automatiser votre croissance avec l'IA ?"
    >
      Prêt à automatiser votre croissance avec l&apos;IA ?
    </span>
    <p
      className="text-base md:text-lg mb-8 animate-fade-in-up text-black dark:text-white"
      style={{ animationDelay: '100ms' }}
    >
      Notre agence d'experts en Intelligence Artificielle automatise votre Growth Marketing 
      pour multiplier vos résultats par 3x. Pendant que vos concurrents hésitent, vous gagnez.
    </p>
    <div className="flex flex-col md:flex-row gap-4 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
      <CTAButton 
        href="/expertise/"
        className="group !bg-[#E0FF5C] !text-black hover:!bg-[#E0FF5C]/90 [&_span]:!border-black [&_svg]:!stroke-black"
      >
        Nos services
      </CTAButton>
      <CTAButton 
        href="/cas-clients"
        variant="simple"
        className="group !bg-white !text-black hover:!bg-[#E0FF5C] [&_span]:!border-black [&_svg]:!stroke-black border border-black/10 dark:border-white/10"
      >
        Nos études de cas
      </CTAButton>
    </div>
  </div>
));

LeftContent.displayName = 'LeftContent';

const RightContent = memo(({ isDark }: { isDark: boolean }) => (
  <div
  className={cn(
      "relative h-full min-h-[400px] md:min-h-full z-10 backdrop-blur-md overflow-visible rounded-tr-2xl rounded-br-2xl px-4 sm:px-6",
      isDark 
        ? "bg-black/20" 
        : "bg-white/20"
    )}
  >
    {/* Background pattern */}
    <div
      className="absolute inset-0 rounded-tr-2xl rounded-br-2xl -z-10"
      style={{
        backgroundImage: `url(${require('../../lib/assets').backgroundEffectUrl})`,
        backgroundRepeat: "repeat",
        backgroundSize: "200px",
        opacity: isDark ? "0.25" : "0.04"
      }}
    />
    <svg 
      width="450" 
      height="100%" 
      viewBox="0 0 611 491" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className="absolute z-[5] left-[48%] bottom-0"
      aria-hidden="true"
    >
      <path d="M610.686 116.519C610.686 51.9064 558.089 -0.426768 493.379 0.00262359C456.602 0.243686 421.543 18.5117 399.93 48.2075C385.421 68.1479 376.645 93.723 380.479 118.5C382.415 130.997 387.674 142.749 395.757 152.49C398.002 155.202 418.387 178.291 419.17 177.439L418.974 177.635C433.731 195.956 432.617 222.835 415.599 239.852C398.582 256.869 371.703 257.984 353.383 243.227L353.186 243.423L316.598 206.834C295.467 185.703 266.803 173.831 236.919 173.831H57.3354C25.6659 173.831 0 199.504 0 231.166V395.247C0 395.729 0.00791574 396.211 0.0154489 396.686C0.0154489 397.16 0 397.635 0 398.117C0 449.636 42.126 491.318 93.8037 490.594C143.613 489.901 184.27 449.252 184.963 399.435C185.287 376.512 176.947 351.629 158.725 336.397C136.923 318.182 105.503 325.399 83.536 307.485C67.8293 294.679 58.2848 275.266 57.9835 254.971C57.6822 234.888 66.3223 215.354 81.3886 202.066C114.512 172.844 174.092 177.025 202.801 210.601C205.084 213.275 207.314 216.107 209.129 219.121L287.738 341.776C309.448 375.653 346.919 396.143 387.154 396.143H553.343C585.013 396.143 610.679 370.47 610.679 338.808V173.831C610.679 152.49 610.679 137.363 610.679 116.526L610.686 116.519Z" 
        fill={theme.colors.primary.main}
      />
    </svg>

    <svg 
      width="250" 
      height="250" 
      viewBox="0 0 352 330" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className="absolute left-[5%] bottom-[-10%] z-20"
      aria-hidden="true"
    >
      <path d="M351.415 232.339C351.34 230.455 351.212 228.572 351.069 226.681L351.009 226.086C350.85 224.195 350.67 222.304 350.459 220.421L337.728 88.9443C337.223 83.3094 336.748 77.6671 336.349 72.0248C335.618 61.7043 334.451 51.2105 330.775 41.4701C329.57 38.276 328.063 35.2552 326.376 32.2947C318.119 18.4261 304.793 7.85713 289.387 3.02082C282.992 1.00946 276.287 0 269.582 0C248.407 0 230.681 12.136 215.238 25.417C196.91 41.184 178.468 56.8228 160.042 72.4768C136.968 92.0782 115.084 110.7 91.8219 130.626C79.6257 141.074 66.8189 151.583 54.1707 161.481C42.8181 170.363 29.5145 180.345 20.083 191.396C7.88671 205.679 0.391452 224.097 0.0147922 244.256C-0.851525 290.525 36.4453 329.118 82.7217 329.758C129.608 330.406 167.817 292.597 167.817 245.861C167.817 231.728 164.336 217.506 157.21 205.053C153.812 199.11 146.618 190.733 141.353 186.356C136.102 181.987 130.867 177.663 127.221 171.757C121.819 163.003 118.941 152.811 118.941 142.528C118.941 111.747 143.892 86.7899 174.68 86.7899C199.102 86.7899 219.909 101.992 232.399 122.188C246.659 145.255 246.84 170.175 246.84 196.405C246.84 211.517 246.84 226.621 246.84 241.733C246.84 270.652 270.283 294.096 299.203 294.096C319.422 294.096 337.66 281.975 346.233 263.782C350.813 254.064 351.838 243.307 351.401 232.339H351.415Z" 
        fill={theme.colors.primary.main}
      />
    </svg>
    
    <div className="absolute inset-0" />
    
    <img
      src={require('../../lib/assets').getAssetUrl('/man-516x378.webp')}
      alt="Notre équipe"
      width="516"
      height="378"
      className="absolute inset-0 w-full h-full z-10 object-cover md:object-contain"
      loading="eager"
    />
  </div>
));

RightContent.displayName = 'RightContent';

function PreFooter({ noBgGradient = false }: PreFooterProps) {
  const { theme: currentTheme } = useTheme();
  const isDark = currentTheme === 'dark';

  return (
    <section className="w-full">
      <div 
        className={cn(
          "max-w-[1250px] mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-0 overflow-visible rounded-2xl border bg-transparent",
          isDark
            ? "border-white/10"
            : "border-black/10"
        )}
        style={{ width: '100%' }}
      >
        <LeftContent isDark={isDark} />
        <RightContent isDark={isDark} />
      </div>
    </section>
  );
}

PreFooter.displayName = 'PreFooter';

export default memo(PreFooter); 