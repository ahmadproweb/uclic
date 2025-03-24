"use client";

export default function HeroAnimation() {
  // Générer les indices pour les murs et surfaces
  const walls = 6;
  const generateWallIndices = (wallIndex: number) => {
    const surfaceIndex = (wallIndex - 3) - 1;
    const firstSurfaceIndex = wallIndex * 2 - 1;
    const secondSurfaceIndex = wallIndex * 2;
    return { surfaceIndex, firstSurfaceIndex, secondSurfaceIndex };
  };

  return (
    <div className="wrapper">
      <style>{`
        @property --angle {
          syntax: "<angle>";
          inherits: true;
          initial-value: 0deg;
        }

        @property --circle-diameter {
          syntax: "<length>";
          inherits: true;
          initial-value: 0;
        }

        :root {
          --color-background: conic-gradient(
            black,
            #192d39,
            #0e1e2e,
            #281133,
            #14293d,
            #16031a,
            black
          );
          --color-on-background: white;
          --c1: #E0FF5C;
          --c2: rgba(218, 255, 71, 0.8);
          --c3: rgba(218, 255, 71, 0.6);
          --c4: rgba(218, 255, 71, 0.9);
          --animation-duration: 2.8s;
          --border-width: 0.6vmin;
          --glow: drop-shadow(0 0 6vmin rgba(218, 255, 71, 0.3));
          --hole-pos-y: 20%;
          --hole-radius: 22vmin;
          --offset-per-surface: calc(360deg / 24);
        }

        .wrapper {
          mix-blend-mode: plus-lighter;
          position: relative;
          margin-left: 130px;
          z-index: 1;
          padding-top: 2rem;
          transform: scale(0.5);
        }

        @media (max-width: 1600px) {
          .wrapper {
            transform: scale(0.7);
          }
        }

        @media (max-width: 768px) {
          .wrapper {
            transform: scale(0.5);
          }
        }

        @media (max-width: 480px) {
          .wrapper {
            transform: scale(1);
                      margin-left: 0px !important;

          }
        }

        .container {
          position: relative;
          width: 50vmin;
          aspect-ratio: 1/1.2;
          --angle: 30deg;
          animation: angle var(--animation-duration) linear infinite;
          transform-style: preserve-3d;
          transform: rotateX(-45deg) rotateY(45deg);
        }

        .wall {
          position: absolute;
          inset: 0;
          --wall-gap: 10vmin;
          filter: var(--glow);
          transform-style: preserve-3d;
        }

        ${[...Array(walls)].map((_, i) => {
          const wallIndex = i + 1;
          const { surfaceIndex } = generateWallIndices(wallIndex);
          return `
            .wall:nth-of-type(${wallIndex}) {
              transform: translateZ(calc(var(--wall-gap) * ${surfaceIndex}));
              --index: ${wallIndex};
            }
          `;
        }).join('')}

        .surface {
          position: absolute;
          inset: 0;
          --angle-offset: calc(var(--index) * var(--offset-per-surface));
          --circle-diameter: calc(var(--hole-radius) * cos(calc(var(--angle) + var(--angle-offset))));
          -webkit-mask: radial-gradient(
            circle at 50% var(--hole-pos-y),
            transparent var(--circle-diameter),
            black var(--circle-diameter)
          );
          mask: radial-gradient(
            circle at 50% var(--hole-pos-y),
            transparent var(--circle-diameter),
            black var(--circle-diameter)
          );
          -webkit-mask-repeat: no-repeat;
          mask-repeat: no-repeat;
          -webkit-mask-size: 100% 100%;
          mask-size: 100% 100%;
          -webkit-mask-position: 0 0;
          mask-position: 0 0;
          background: radial-gradient(
              circle at 50% var(--hole-pos-y),
              var(--c4) calc(var(--circle-diameter) + var(--border-width)),
              var(--c4) calc(var(--circle-diameter) + var(--border-width)),
              transparent var(--circle-diameter)
            ),
            linear-gradient(black, black),
            linear-gradient(45deg, var(--c1), var(--c3), var(--c2), var(--c1), var(--c4), var(--c3), var(--c2));
          background-repeat: no-repeat;
          background-size: 100% 100%,
            calc(100% - var(--border-width) * 2) calc(100% - var(--border-width) * 2),
            100%, 100%;
          background-position: 0 0, var(--border-width) var(--border-width), 0 0;
        }

        .surface:nth-child(2) {
          transform: translate(4vmin, 5.7vmin);
        }

        .left {
          position: absolute;
          transform: skewY(55deg) translateY(2.9vmin);
          inset: 0;
          width: 4.5vmin;
          background: linear-gradient(black, black) no-repeat,
            linear-gradient(to top, var(--c1), var(--c3), var(--c2), var(--c1)) no-repeat;
          background-size: calc(100% - var(--border-width) * 2) calc(100% - var(--border-width) * 2),
            100%, 100%;
          background-position: var(--border-width) var(--border-width), 0 0;
        }

        .top {
          position: absolute;
          transform: skewX(36deg) translateX(2vmin);
          inset: 0;
          height: 6vmin;
          background: linear-gradient(black, black) no-repeat,
            linear-gradient(to right, var(--c1), var(--c3), var(--c2), var(--c1)) no-repeat;
          background-size: calc(100% - var(--border-width) * 2) calc(100% - var(--border-width) * 2),
            100%, 100%;
          background-position: var(--border-width) var(--border-width), 0 0;
          --angle-offset: calc(var(--index) * var(--offset-per-surface));
          --circle-diameter: calc(var(--hole-radius) * cos(calc(var(--angle) + var(--angle-offset))));
          -webkit-mask: radial-gradient(
            calc(var(--circle-diameter) * 0.86) at 50% calc(60% / cos(calc(var(--angle) + var(--angle-offset)))),
            transparent var(--circle-diameter),
            black var(--circle-diameter)
          );
          mask: radial-gradient(
            calc(var(--circle-diameter) * 0.86) at 50% calc(60% / cos(calc(var(--angle) + var(--angle-offset)))),
            transparent var(--circle-diameter),
            black var(--circle-diameter)
          );
          -webkit-mask-repeat: no-repeat;
          mask-repeat: no-repeat;
          -webkit-mask-size: 100% 100%;
          mask-size: 100% 100%;
          -webkit-mask-position: 0 0;
          mask-position: 0 0;
        }

        .ball-container {
          display: grid;
          place-items: center;
          position: absolute;
          inset: 0;
          transform: translateZ(-60vmin);
          animation: ball-container var(--animation-duration) linear infinite;
        }

        .ball {
          width: 42vmin;
          aspect-ratio: 1;
          border-radius: 50%;
          filter: var(--glow);
          background: radial-gradient(21.5vmin 21.5vmin at center, black 20vmin, transparent 20vmin),
            conic-gradient(var(--c1), var(--c3), var(--c2), var(--c4), var(--c3), var(--c1), var(--c2), var(--c1));
          box-shadow: 0 0 10vmin rgba(255, 255, 255, 0.08);
          transform: rotateX(45deg) rotateY(45deg) translateY(-20vmin);
        }

        @keyframes angle {
          from { --angle: 360deg; }
          to { --angle: 0deg; }
        }

        @keyframes ball-container {
          from {
            transform: translateZ(-40vmin);
            opacity: 0;
          }
          10% {
            transform: translateZ(-25vmin);
            opacity: 1;
          }
          85% {
            opacity: 1;
          }
          to {
            opacity: 0;
            transform: translateZ(70vmin);
          }
        }
      `}</style>
      <div className="container">
        {[...Array(walls)].map((_, i) => {
          const wallIndex = i + 1;
          const { firstSurfaceIndex, secondSurfaceIndex } = generateWallIndices(wallIndex);
          return (
            <div key={wallIndex} className="wall">
              <div className="surface" style={{ '--index': firstSurfaceIndex } as React.CSSProperties}></div>
              <div className="surface" style={{ '--index': secondSurfaceIndex } as React.CSSProperties}></div>
              <div className="left"></div>
              <div className="top" style={{ '--index': firstSurfaceIndex } as React.CSSProperties}></div>
            </div>
          );
        })}
        <div className="ball-container">
          <div className="ball"></div>
        </div>
      </div>
    </div>
  );
} 