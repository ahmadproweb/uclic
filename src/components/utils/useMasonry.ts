'use client';

import { useEffect, useRef, useState } from 'react';

// Hook inspired by Cruip: https://cruip.com/how-to-create-a-true-masonry-with-nextjs/
// Adjusts vertical offsets via margins to create a true masonry layout in a CSS grid container
export default function useMasonry<T extends HTMLElement>() {
  const masonryContainer = useRef<T | null>(null);
  const [items, setItems] = useState<ChildNode[]>([]);

  useEffect(() => {
    if (masonryContainer.current) {
      const masonryItem = Array.from(masonryContainer.current.children);
      setItems(masonryItem);
    }
  }, []);

  useEffect(() => {
    const handleMasonry = () => {
      if (!items || items.length < 1) return;

      let gapSize = 0;
      if (masonryContainer.current) {
        const styles = window.getComputedStyle(masonryContainer.current);
        // both row and column gap exist; we care about row gap for vertical offset
        const rowGap = styles.getPropertyValue('row-gap') || styles.getPropertyValue('grid-row-gap');
        gapSize = parseInt(rowGap || '0');
      }

      items.forEach((el) => {
        if (!(el instanceof HTMLElement)) return;
        let previous = el.previousSibling;
        // reset
        el.style.marginTop = '0px';
        while (previous) {
          if (previous.nodeType === 1) {
            if (
              previous instanceof HTMLElement &&
              elementLeft(previous) === elementLeft(el)
            ) {
              el.style.marginTop = (
                -(elementTop(el) - elementBottom(previous) - gapSize)
              ).toString() + 'px';
              break;
            }
          }
          previous = previous.previousSibling as ChildNode | null;
        }
      });
    };

    handleMasonry();
    window.addEventListener('resize', handleMasonry);
    return () => window.removeEventListener('resize', handleMasonry);
  }, [items]);

  const elementLeft = (el: HTMLElement) => el.getBoundingClientRect().left;
  const elementTop = (el: HTMLElement) => el.getBoundingClientRect().top + window.scrollY;
  const elementBottom = (el: HTMLElement) => el.getBoundingClientRect().bottom + window.scrollY;

  return masonryContainer;
}


