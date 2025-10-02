#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🚀 Optimizing JavaScript bundle...');

// Configuration pour l'optimisation du bundle
const bundleOptimizations = {
  // Réduire la taille des chunks
  chunkSizeWarningLimit: 1000,
  
  // Optimiser les imports
  optimizeImports: {
    'lucide-react': {
      transform: 'lucide-react/dist/esm/icons/{{kebabCase member}}',
      skipDefaultConversion: true,
    },
    'date-fns': {
      transform: 'date-fns/{{member}}',
      skipDefaultConversion: true,
    }
  },

  // Configuration webpack pour l'optimisation
  webpackConfig: {
    optimization: {
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
            priority: 10,
          },
          common: {
            name: 'common',
            minChunks: 2,
            chunks: 'all',
            priority: 5,
            reuseExistingChunk: true,
          },
        },
      },
    },
  }
};

// Créer un fichier de configuration d'optimisation
const optimizationConfig = `
// Configuration d'optimisation du bundle
export const bundleOptimizations = ${JSON.stringify(bundleOptimizations, null, 2)};

// Fonction pour optimiser les imports dynamiques
export function optimizeDynamicImports() {
  // Lazy loading des composants lourds
  const lazyComponents = {
    PostHog: () => import('@/components/optimization/LazyPostHog'),
    GoogleAnalytics: () => import('@/components/optimization/LazyGoogleAnalytics'),
    VideoPopup: () => import('@/components/ui/VideoPopup'),
    HubspotChat: () => import('@/components/ui/HubspotChat')
  };

  return lazyComponents;
}

// Fonction pour précharger les ressources critiques
export function preloadCriticalResources() {
  if (typeof window === 'undefined') return;

  const criticalResources = [
    { href: '/logo.png', as: 'image' },
    { href: '/heroo.png', as: 'image' },
    { href: '/fonts/absans-regular.woff2', as: 'font', type: 'font/woff2' },
    { href: '/fonts/remixicon.woff2', as: 'font', type: 'font/woff2' }
  ];

  criticalResources.forEach(resource => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = resource.href;
    link.as = resource.as;
    if (resource.type) {
      link.type = resource.type;
    }
    if (resource.as === 'font') {
      link.crossOrigin = 'anonymous';
    }
    document.head.appendChild(link);
  });
}
`;

// Écrire le fichier de configuration
const configPath = path.join(process.cwd(), 'src/config/bundle-optimization.ts');
fs.writeFileSync(configPath, optimizationConfig);

console.log('✅ Bundle optimization configuration created');

// Créer un script pour analyser la taille du bundle
const bundleAnalyzer = `
const { BundleAnalyzerPlugin } = require('@next/bundle-analyzer');

const withBundleAnalyzer = BundleAnalyzerPlugin({
  enabled: process.env.ANALYZE === 'true',
  openAnalyzer: false,
  analyzerMode: 'static',
  reportFilename: './bundle-analysis.html'
});

module.exports = withBundleAnalyzer;
`;

const analyzerPath = path.join(process.cwd(), 'next.config.analyzer.js');
fs.writeFileSync(analyzerPath, bundleAnalyzer);

console.log('✅ Bundle analyzer configuration created');

// Créer un script pour optimiser les images
const imageOptimizer = `
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function optimizeImages() {
  const publicDir = path.join(process.cwd(), 'public');
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp'];
  
  function findImages(dir) {
    const files = fs.readdirSync(dir);
    const images = [];
    
    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        images.push(...findImages(filePath));
      } else if (imageExtensions.some(ext => file.toLowerCase().endsWith(ext))) {
        images.push(filePath);
      }
    });
    
    return images;
  }
  
  const images = findImages(publicDir);
  
  for (const imagePath of images) {
    try {
      const ext = path.extname(imagePath).toLowerCase();
      const name = path.basename(imagePath, ext);
      const dir = path.dirname(imagePath);
      
      // Optimiser en WebP
      if (['.jpg', '.jpeg', '.png'].includes(ext)) {
        const webpPath = path.join(dir, \`\${name}.webp\`);
        await sharp(imagePath)
          .webp({ quality: 85 })
          .toFile(webpPath);
        
        console.log(\`Optimized: \${imagePath} -> \${webpPath}\`);
      }
      
      // Optimiser l'original
      await sharp(imagePath)
        .jpeg({ quality: 85, progressive: true })
        .png({ compressionLevel: 9 })
        .toFile(imagePath);
        
    } catch (error) {
      console.warn(\`Failed to optimize \${imagePath}:\`, error.message);
    }
  }
}

if (require.main === module) {
  optimizeImages().catch(console.error);
}

module.exports = { optimizeImages };
`;

const imageOptimizerPath = path.join(process.cwd(), 'scripts/optimize-images-advanced.js');
fs.writeFileSync(imageOptimizerPath, imageOptimizer);

console.log('✅ Advanced image optimizer created');

// Mettre à jour package.json avec les nouveaux scripts
const packageJsonPath = path.join(process.cwd(), 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

packageJson.scripts = {
  ...packageJson.scripts,
  'analyze-bundle': 'ANALYZE=true npm run build',
  'optimize-images-advanced': 'node scripts/optimize-images-advanced.js',
  'optimize-all': 'npm run optimize-images-advanced && npm run optimize-performance && npm run build'
};

fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

console.log('✅ Package.json updated with optimization scripts');
console.log('🎉 Bundle optimization completed!');
console.log('');
console.log('📋 Available commands:');
console.log('  npm run analyze-bundle     - Analyze bundle size');
console.log('  npm run optimize-images-advanced - Optimize images');
console.log('  npm run optimize-all       - Run all optimizations');
