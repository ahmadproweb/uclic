'use client';

import { useEffect } from 'react';
import Script from 'next/script';

export default function HubspotChat() {
  useEffect(() => {
    // Ajouter le style pour corriger le problème de fond du widget et sa position
    const style = document.createElement('style');
    style.innerHTML = `
      #hubspot-messages-iframe-container {
        color-scheme: light !important;
        bottom: 20px !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <>
      <Script
        id="hs-script-loader"
        src="//js-na1.hs-scripts.com/48395533.js"
        strategy="lazyOnload"
      />
    </>
  );
} 