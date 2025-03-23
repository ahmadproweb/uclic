'use client';

import { TeamMember } from '@/lib/wordpress';
import { useTheme } from '@/context/ThemeContext';
import ScrollToTop from '@/components/ui/ScrollToTop';
import TeamMemberPageLayout from './TeamMemberPageLayout';
import { OtherConsultants } from '@/components/pages/equipe/OtherConsultants';
import { cn } from '@/lib/utils';

interface TeamMemberPageProps {
  member: TeamMember;
  otherMembers?: TeamMember[];
}

export default function TeamMemberPage({ member, otherMembers = [] }: TeamMemberPageProps) {
  const { theme: currentTheme } = useTheme();
  const isDark = currentTheme === 'dark';

  return (
    <div className={cn(
      "relative",
      isDark ? "bg-black" : "bg-white"
    )}>
      <TeamMemberPageLayout member={member} isDark={isDark}>
        {/* Autres consultants */}
        <OtherConsultants currentMember={member} initialMembers={otherMembers} />
      </TeamMemberPageLayout>

      {/* Scroll to top button */}
      <ScrollToTop />
    </div>
  );
} 