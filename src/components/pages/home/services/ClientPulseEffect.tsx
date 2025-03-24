'use client';

export function ClientPulseEffect() {
  return (
    <div 
      className="absolute inset-0 pointer-events-none"
      aria-hidden="true"
    >
      <div 
        className="absolute left-1/2 -translate-x-1/2 bottom-0 w-[1200px] h-[600px] animate-pulse-slow" 
        style={{ 
          background: `radial-gradient(ellipse at 50% 100%, 
            #E0FF5C80 0%,
            #E0FF5C40 30%,
            #E0FF5C20 50%,
            transparent 70%
          )`,
          filter: 'blur(60px)',
          transformOrigin: 'bottom center',
          willChange: 'transform, opacity'
        }}
      />
      
      {/* Couches de fond supplémentaires */}
      <div 
        className="absolute left-1/2 -translate-x-1/2 bottom-0 w-[1000px] h-[500px] animate-pulse-slower"
        style={{ 
          background: `radial-gradient(ellipse at 50% 100%, 
            #E0FF5C60 0%,
            #E0FF5C30 40%,
            transparent 70%
          )`,
          filter: 'blur(50px)',
          willChange: 'transform'
        }}
      />
      
      <div 
        className="absolute left-1/2 -translate-x-1/2 bottom-0 w-[800px] h-[400px] animate-pulse-slowest"
        style={{ 
          background: `radial-gradient(ellipse at 50% 100%, 
            #E0FF5C90 0%,
            transparent 60%
          )`,
          filter: 'blur(40px)',
          willChange: 'transform'
        }}
      />
    </div>
  );
} 