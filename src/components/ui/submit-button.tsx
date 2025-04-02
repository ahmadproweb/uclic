'use client';

import { memo } from 'react';
import { CTAButton } from './cta-button';

interface SubmitButtonProps {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  variant?: 'shiny' | 'simple' | 'mainCTA';
  showArrow?: boolean;
}

export const SubmitButton = memo(({ 
  children,
  className,
  disabled = false,
  variant = 'shiny',
  showArrow = false,
}: SubmitButtonProps) => {
  return (
    <button
      type="submit"
      disabled={disabled}
      className={className}
    >
      <CTAButton
        variant={variant}
        className={className}
        showArrow={showArrow}
      >
        {children}
      </CTAButton>
    </button>
  );
});

SubmitButton.displayName = 'SubmitButton'; 