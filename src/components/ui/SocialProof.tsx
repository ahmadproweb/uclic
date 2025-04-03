"use client";

import AvatarGroup from './AvatarGroup';

const teamAvatars = [
  {
    src: "https://cdn.prod.website-files.com/5c6ab1fe3ca6bd217e37aea8/5f7a39a419656d9ce7eca9c4_Brice-Maurin.jpeg",
    alt: "Brice Maurin"
  },
  {
    src: "https://socialsellingforum.com/wp-content/uploads/2021/01/Denis-Cohen.jpg",
    alt: "Denis Cohen"
  },
  {
    src: "https://pbs.twimg.com/profile_images/1380604432526741505/ZoxckFlA_400x400.jpg",
    alt: "Professional 3"
  },
  {
    src: "https://media.licdn.com/dms/image/v2/D4D03AQF1Tp_cka4CJw/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1695053204498?e=2147483647&v=beta&t=gYor-eUxVISVwWqXZDHdmjdfQeW8m_X7PIFCthGiUp8",
    alt: "Professional 4"
  },
  {
    src: "https://media.licdn.com/dms/image/v2/C4E03AQFJfjmIIQBvxw/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1605084585589?e=1749081600&v=beta&t=Tr-iALGgev4KN6ljWS8J6b7xt2B8Je1vD1AS-3MKnpc",
    alt: "Professional 5"
  }
];

export default function SocialProof() {
  return (
    <div className="flex flex-col gap-1">
      <span className="flex items-center gap-1.5 text-xs font-medium tracking-wide text-white/70">
        ✓ Recommandé par
      </span>
      <AvatarGroup
        avatars={teamAvatars}
        text=""
        className="min-w-[180px]"
      />
    </div>
  );
} 