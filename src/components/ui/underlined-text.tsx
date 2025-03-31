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
      <span className="relative z-10 inherit">
        {text}
      </span>
      <span 
        className="absolute bottom-[-8px] left-[10%] w-[80%] h-[6px] -z-10"
        style={{ backgroundColor: 'currentColor' }}
      />
    </span>
  );
} 