"use client";

interface Avatar {
  src: string;
  alt: string;
}

interface AvatarGroupProps {
  avatars: Avatar[];
  text: string;
  className?: string;
}

export default function AvatarGroup({ avatars, text, className = "" }: AvatarGroupProps) {
  return (
    <div className={`flex flex-col ${className}`}>
      {/* Avatars */}
      <div className="flex -space-x-3">
        {avatars.map((avatar, index) => (
          <div
            key={index}
            className={`
              relative rounded-full overflow-hidden border-2 border-white dark:border-black
              w-10 h-10 md:w-12 md:h-12
              transition-transform duration-300
              hover:scale-110 hover:z-10
              ${index > 0 ? 'hover:-translate-x-1' : ''}
              ${index < avatars.length - 1 ? 'hover:translate-x-1' : ''}
            `}
            style={{ zIndex: avatars.length - index }}
          >
            <img
              src={avatar.src}
              alt={avatar.alt}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        ))}
      </div>

      {/* Text below */}
      <p className="mt-4 text-base md:text-lg text-gray-600 dark:text-gray-300">
        {text}
      </p>
    </div>
  );
} 