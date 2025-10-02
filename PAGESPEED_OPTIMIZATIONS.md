# 🚀 Optimisations PageSpeed - Uclic

Ce document décrit toutes les optimisations de performance implémentées dans le projet Uclic, inspirées des fonctionnalités de WP Rocket.

## 📋 Fonctionnalités Implémentées

### 1. **Lazy Loading des Scripts** (`useLazyScripts.ts`)
- **Chargement différé** des scripts basé sur les interactions utilisateur
- **Priorisation** des scripts (high, medium, low)
- **Déclencheurs multiples** : interaction, scroll, viewport
- **Délais configurables** pour chaque script

```typescript
// Exemple d'utilisation
const { loadedScripts, isTriggered } = useLazyScripts({
  scripts: [
    {
      src: 'https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID',
      priority: 'low',
      delay: 2000
    }
  ],
  triggerOnInteraction: true,
  triggerOnScroll: true,
  triggerDelay: 0
});
```

### 2. **Optimisation des Images** (`OptimizedImage.tsx`)
- **Lazy loading avancé** avec IntersectionObserver
- **Placeholders blur** automatiques
- **Support WebP/AVIF** avec fallback
- **Optimisation des images externes** (Imgix, etc.)

```typescript
// Exemple d'utilisation
<OptimizedImage
  src="/image.jpg"
  alt="Description"
  width={800}
  height={600}
  lazy={true}
  intersectionThreshold={0.1}
  onLoad={() => console.log('Image loaded')}
/>
```

### 3. **CSS Critique** (`CriticalCSS.tsx`)
- **Injection immédiate** du CSS critique
- **Chargement asynchrone** du CSS non-critique
- **Optimisation des polices** avec `font-display: swap`
- **Préchargement** des ressources critiques

### 4. **Préconnexion aux Domaines** (`PreconnectOptimizer.tsx`)
- **DNS prefetch** pour les domaines externes
- **Preconnect** pour les domaines critiques
- **Prefetch** pour les ressources moins critiques
- **Optimisation des Google Fonts**

### 5. **Lazy Loading des Iframes** (`LazyIframe.tsx`)
- **Chargement différé** des iframes et vidéos
- **Support YouTube** avec paramètres optimisés
- **Placeholders personnalisables**
- **Gestion d'erreurs** robuste

```typescript
// Exemple YouTube
<LazyYouTube
  videoId="dQw4w9WgXcQ"
  title="Ma vidéo"
  width="100%"
  height="315"
  autoplay={false}
  controls={true}
/>
```

## ⚙️ Configuration Next.js

### Optimisations dans `next.config.js`
```javascript
module.exports = {
  // Compression GZIP
  compress: true,
  
  // Minification SWC
  swcMinify: true,
  
  // Optimisation des images
  images: {
    formats: ['image/avif', 'image/webp'],
    quality: 85,
    priority: true,
    placeholder: 'blur'
  },
  
  // Optimisation des packages
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['lucide-react'],
    modularizeImports: {
      'lucide-react': {
        transform: 'lucide-react/dist/esm/icons/{{kebabCase member}}'
      }
    }
  }
};
```

## 🎯 Scripts d'Optimisation

### Script de Performance (`scripts/optimize-performance.js`)
```bash
npm run optimize-performance
```

**Fonctionnalités :**
- Optimisation des images
- Génération du CSS critique
- Optimisation des polices
- Génération du service worker
- Build optimisé

### Script de Build Optimisé
```bash
npm run build:optimized
```

## 📊 Métriques de Performance

### Web Vitals Surveillés
- **LCP** (Largest Contentful Paint)
- **FID** (First Input Delay)
- **CLS** (Cumulative Layout Shift)
- **FCP** (First Contentful Paint)
- **TTFB** (Time to First Byte)
- **INP** (Interaction to Next Paint)

### Optimisations Automatiques
1. **Préchargement** des ressources critiques
2. **Lazy loading** des ressources non-critiques
3. **Compression** des assets
4. **Cache** optimisé avec headers appropriés
5. **Minification** CSS/JS
6. **Tree shaking** des imports

## 🔧 Utilisation

### Intégration dans le Layout
```typescript
import PageSpeedOptimizer from '@/components/optimization/PageSpeedOptimizer';

export default function RootLayout({ children }) {
  return (
    <PageSpeedOptimizer
      enableLazyScripts={true}
      enableCriticalCSS={true}
      enablePreconnect={true}
      enableImageOptimization={true}
      customScripts={[
        {
          src: 'https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID',
          priority: 'low',
          delay: 2000
        }
      ]}
    >
      {children}
    </PageSpeedOptimizer>
  );
}
```

### Composants Optimisés
```typescript
// Image optimisée
import OptimizedImage from '@/components/optimization/OptimizedImage';

// Iframe lazy
import LazyIframe, { LazyYouTube } from '@/components/optimization/LazyIframe';

// CSS critique
import CriticalCSS from '@/components/optimization/CriticalCSS';
```

## 📈 Résultats Attendus

### Améliorations PageSpeed
- **LCP** : Réduction de 20-30%
- **FID** : Amélioration de 15-25%
- **CLS** : Réduction de 40-50%
- **Score global** : +15-25 points

### Optimisations Spécifiques
- **Taille du bundle** : -20-30%
- **Temps de chargement initial** : -25-35%
- **Ressources non-critiques** : Chargement différé
- **Images** : Lazy loading + compression

## 🚨 Bonnes Pratiques

### 1. Scripts
- Utiliser `priority: 'low'` pour les scripts de tracking
- Définir des `delay` appropriés
- Tester les interactions utilisateur

### 2. Images
- Toujours spécifier `width` et `height`
- Utiliser `lazy={true}` pour les images non-critiques
- Optimiser les formats (WebP, AVIF)

### 3. CSS
- Injecter le CSS critique immédiatement
- Charger le CSS non-critique de manière asynchrone
- Utiliser `font-display: swap`

### 4. Polices
- Précharger les polices critiques
- Utiliser des formats optimisés (WOFF2)
- Éviter les polices externes non-optimisées

## 🔍 Debug et Monitoring

### Mode Développement
- Indicateur de chargement des scripts
- Logs détaillés des optimisations
- Métriques Web Vitals en console

### Production
- Monitoring automatique des performances
- Alertes en cas de dégradation
- Rapports de performance détaillés

## 📚 Ressources

- [Next.js Performance](https://nextjs.org/docs/advanced-features/measuring-performance)
- [Web Vitals](https://web.dev/vitals/)
- [WP Rocket Documentation](https://docs.wp-rocket.me/)
- [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci)

---

**Note :** Ces optimisations sont inspirées des meilleures pratiques de WP Rocket et adaptées pour Next.js. Elles sont conçues pour améliorer significativement les performances sans impacter l'expérience utilisateur.
