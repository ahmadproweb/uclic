'use client';

import { LazyYouTube } from '@/components/optimization/LazyIframe';
import OptimizedImage from '@/components/optimization/OptimizedImage';
import { useLazyScripts } from '@/hooks/useLazyScripts';
import { useState } from 'react';

export default function OptimizedHeroExample() {
  const [showVideo, setShowVideo] = useState(false);

  // Exemple d'utilisation du lazy loading des scripts
  const { loadedScripts, isTriggered } = useLazyScripts({
    scripts: [
      {
        src: 'https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID',
        id: 'google-analytics',
        async: true,
        priority: 'low',
        delay: 3000,
        onLoad: () => console.log('Google Analytics loaded'),
        onError: () => console.warn('Failed to load Google Analytics')
      },
      {
        src: 'https://platform.linkedin.com/in.js',
        id: 'linkedin-script',
        async: true,
        priority: 'medium',
        delay: 1500,
        onLoad: () => console.log('LinkedIn script loaded')
      }
    ],
    triggerOnInteraction: true,
    triggerOnScroll: true,
    triggerDelay: 1000
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section avec image optimisée */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Contenu texte */}
          <div className="space-y-8">
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900">
              Optimisations PageSpeed
              <span className="block text-blue-600">Comme WP Rocket</span>
            </h1>
            
            <p className="text-xl text-gray-600 leading-relaxed">
              Découvrez comment nos optimisations améliorent les performances 
              de votre site web avec un lazy loading intelligent des scripts.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => setShowVideo(!showVideo)}
                className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                {showVideo ? 'Masquer la vidéo' : 'Voir la démo'}
              </button>
              
              <button className="px-8 py-4 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
                En savoir plus
              </button>
            </div>

            {/* Indicateur de chargement des scripts */}
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="font-semibold mb-2">Scripts chargés :</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${isTriggered ? 'bg-green-500' : 'bg-yellow-500'}`} />
                  <span className="text-sm">
                    {isTriggered ? 'Déclenché' : 'En attente d\'interaction'}
                  </span>
                </div>
                <div className="text-sm text-gray-600">
                  {loadedScripts.length} script(s) chargé(s)
                </div>
              </div>
            </div>
          </div>

          {/* Image optimisée */}
          <div className="relative">
            <OptimizedImage
              src="/heroo.png"
              alt="Optimisations PageSpeed"
              width={600}
              height={400}
              className="rounded-lg shadow-xl"
              priority={true}
              quality={90}
              lazy={false}
              onLoad={() => console.log('Hero image loaded')}
            />
            
            {/* Overlay avec statistiques */}
            <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-4">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-green-600">+25</div>
                  <div className="text-sm text-gray-600">Points PageSpeed</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-600">-30%</div>
                  <div className="text-sm text-gray-600">Temps de chargement</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section vidéo avec lazy loading */}
      {showVideo && (
        <section className="container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">
              Démonstration des Optimisations
            </h2>
            
            <LazyYouTube
              videoId="dQw4w9WgXcQ"
              title="Démonstration des optimisations PageSpeed"
              width="100%"
              height="500"
              className="rounded-lg shadow-xl"
              controls={true}
              onLoad={() => console.log('YouTube video loaded')}
            />
          </div>
        </section>
      )}

      {/* Section avec images lazy loading */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-center mb-12">
          Images Optimisées avec Lazy Loading
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { src: '/logo.png', alt: 'Logo Uclic' },
            { src: '/backgroundeffect.png', alt: 'Background Effect' },
            { src: '/heroo.png', alt: 'Hero Image' }
          ].map((image, index) => (
            <div key={index} className="group">
              <OptimizedImage
                src={image.src}
                alt={image.alt}
                width={400}
                height={300}
                className="w-full h-64 object-cover rounded-lg shadow-lg group-hover:shadow-xl transition-shadow duration-300"
                lazy={true}
                intersectionThreshold={0.1}
                onLoad={() => console.log(`${image.alt} loaded`)}
              />
              <h3 className="mt-4 text-lg font-semibold text-center">
                {image.alt}
              </h3>
            </div>
          ))}
        </div>
      </section>

      {/* Section avec iframe lazy loading */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-center mb-12">
          Iframes avec Lazy Loading
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">Google Maps</h3>
            <LazyIframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.991440608142!2d2.352221915674057!3d48.85661407928747!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e1f06e2b70f%3A0x40b82c3688c9460!2sTour%20Eiffel!5e0!3m2!1sfr!2sfr!4v1234567890"
              title="Localisation Uclic - Paris"
              width="100%"
              height="300"
              className="rounded-lg shadow-lg"
              onLoad={() => console.log('Google Maps loaded')}
            />
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-4">Formulaire de Contact</h3>
            <LazyIframe
              src="https://forms.google.com/example"
              title="Formulaire de contact"
              width="100%"
              height="300"
              className="rounded-lg shadow-lg"
              placeholder={
                <div className="w-full h-full bg-gray-100 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-12 h-12 mx-auto mb-2 bg-blue-500 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                    </div>
                    <p className="text-gray-500">Formulaire de contact</p>
                  </div>
                </div>
              }
            />
          </div>
        </div>
      </section>
    </div>
  );
}
