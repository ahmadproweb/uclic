import { useEffect, useRef } from 'react';

export function GradientPulse() {
  const gradientRef1 = useRef<HTMLDivElement>(null);
  const gradientRef2 = useRef<HTMLDivElement>(null);
  const gradientRef3 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame: number;
    let start = Date.now();

    const animate = () => {
      const now = Date.now();
      const progress = (now - start) / 1000;

      if (gradientRef1.current && gradientRef2.current && gradientRef3.current) {
        // Premier gradient
        const opacity1 = 0.5 + Math.sin(progress * 1.5) * 0.15;
        gradientRef1.current.style.background = `radial-gradient(at 50% 100%, rgba(224, 255, 92, ${opacity1}) 0%, rgba(224, 255, 92, ${opacity1 * 0.5}) 30%, rgba(224, 255, 92, ${opacity1 * 0.25}) 50%, transparent 70%)`;

        // Deuxième gradient (légèrement décalé)
        const opacity2 = 0.376 + Math.sin(progress * 1.5 + 1) * 0.1;
        gradientRef2.current.style.background = `radial-gradient(at 50% 100%, rgba(224, 255, 92, ${opacity2}) 0%, rgba(224, 255, 92, ${opacity2 * 0.5}) 40%, transparent 70%)`;

        // Troisième gradient (encore plus décalé)
        const opacity3 = 0.565 + Math.sin(progress * 1.5 + 2) * 0.12;
        gradientRef3.current.style.background = `radial-gradient(at 50% 100%, rgba(224, 255, 92, ${opacity3}) 0%, transparent 60%)`;
      }

      frame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
      <div
        ref={gradientRef1}
        className="absolute left-1/2 -translate-x-1/2 bottom-0 w-[1200px] h-[600px]"
        style={{ filter: 'blur(60px)', transformOrigin: 'center bottom', willChange: 'transform, opacity' }}
      />
      <div
        ref={gradientRef2}
        className="absolute left-1/2 -translate-x-1/2 bottom-0 w-[1000px] h-[500px]"
        style={{ filter: 'blur(50px)', willChange: 'transform' }}
      />
      <div
        ref={gradientRef3}
        className="absolute left-1/2 -translate-x-1/2 bottom-0 w-[800px] h-[400px]"
        style={{ filter: 'blur(40px)', willChange: 'transform' }}
      />
    </div>
  );
} 