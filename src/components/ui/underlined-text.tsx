import { cn } from "@/lib/utils";

interface UnderlinedTextProps {
  text: string;
  className?: string;
}

export function UnderlinedText({ 
  text, 
  className = "",
}: UnderlinedTextProps) {
  return (
    <span className={cn(
      "inline-block font-bold relative",
      className
    )}>
      <span className="relative z-10 text-[#97BE11] dark:text-[#D9FF4B]">
        {text}
      </span>
      <span 
        className="absolute bottom-[-8px] left-[10%] w-[80%] h-[6px] -z-10 bg-[#97BE11]/20 dark:bg-[#D9FF4B]/20"
      />
    </span>
  );
} 