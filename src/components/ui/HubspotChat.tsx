'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';

export default function HubspotChat() {
  const [shouldLoadScript, setShouldLoadScript] = useState(false);

  useEffect(() => {
    // Attendre 30 secondes avant de charger le script
    const timer = setTimeout(() => {
      setShouldLoadScript(true);
    }, 30000);

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
      clearTimeout(timer);
    };
  }, []);

  if (!shouldLoadScript) return null;

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