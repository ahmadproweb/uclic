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
      "inline-block font-medium relative",
      className
    )}>
      <span className="relative z-10 text-dark dark:text-white">
        {text}
      </span>
      <span 
        className="absolute bottom-[-8px] left-[10%] w-[80%] h-[6px] -z-10 bg-dark/100 dark:bg-white/100"
      />
    </span>
  );
} 