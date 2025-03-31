'use client';

import styles from './ExpertiseAnimation.module.css';

export default function ExpertiseAnimation() {
  const walls = 6;
  const generateWallIndices = (wallIndex: number) => {
    const surfaceIndex = (wallIndex - 3) - 1;
    return { surfaceIndex };
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        {[...Array(walls)].map((_, i) => {
          const wallIndex = i + 1;
          const { surfaceIndex } = generateWallIndices(wallIndex);
          return (
            <div
              key={wallIndex}
              className={styles.wall}
              style={{
                transform: `translateZ(calc(10vmin * ${surfaceIndex}))`,
                '--index': wallIndex
              } as any}
            >
              <div className={styles.surface}>
                <div className={styles.left} />
                <div className={styles.top} />
              </div>
              <div className={styles.surface} />
            </div>
          );
        })}
      </div>
    </div>
  );
} 