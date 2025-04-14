'use client';

import Script from 'next/script';

export default function Analytics() {
  return (
    <>
      {/* Google Tag Manager */}
      <Script
        id="google-tag-manager"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){
              w[l]=w[l]||[];
              w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});
              w[l].push({
                'event': 'virtualPageview',
                'virtualPagePath': window.location.pathname + window.location.search,
                'virtualPageTitle': document.title
              });
              var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
              j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
              f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-P6CSQ32');

            // Track route changes for SPA
            if (typeof window !== 'undefined') {
              const handleRouteChange = () => {
                window.dataLayer?.push({
                  'event': 'virtualPageview',
                  'virtualPagePath': window.location.pathname + window.location.search,
                  'virtualPageTitle': document.title
                });
              };

              // Listen for route changes
              window.addEventListener('popstate', handleRouteChange);
              
              // Observe title changes
              const titleObserver = new MutationObserver(() => {
                if (document.title) {
                  handleRouteChange();
                }
              });
              
              titleObserver.observe(
                document.querySelector('title') || document.documentElement,
                { subtree: true, characterData: true, childList: true }
              );
            }
          `
        }}
      />
    </>
  );
} 