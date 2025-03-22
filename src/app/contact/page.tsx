import { CTAButton } from "@/components/ui/cta-button";
import { CTAText } from "@/components/ui/cta-text";

export default function ContactPage() {
  return (
    <div className="flex items-center">
      <CTAText variant="primary" className="text-base font-medium">
        Discutons ensemble
      </CTAText>
      <CTAButton href="/contact" variant="primary">
        Discutons ensemble
      </CTAButton>
    </div>
  );
} 