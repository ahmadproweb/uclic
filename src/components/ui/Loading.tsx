'use client';

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <div className="relative w-24 h-24">
        <div className="absolute w-full h-full border-4 border-primary/20 rounded-full"></div>
        <div className="absolute w-full h-full border-4 border-primary rounded-full animate-spin border-t-transparent"></div>
      </div>
    </div>
  );
} 