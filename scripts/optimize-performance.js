#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Starting performance optimization...');

// 1. Optimiser les images
console.log('📸 Optimizing images...');
try {
  execSync('node scripts/optimize-images.js', { stdio: 'inherit' });
  console.log('✅ Images optimized');
} catch (error) {
  console.warn('⚠️ Image optimization failed:', error.message);
}

// 2. Générer le critical CSS
console.log('🎨 Generating critical CSS...');
try {
  const criticalCSS = generateCriticalCSS();
  const cssPath = path.join(process.cwd(), 'src/styles/critical.css');
  fs.writeFileSync(cssPath, criticalCSS);
  console.log('✅ Critical CSS generated');
} catch (error) {
  console.warn('⚠️ Critical CSS generation failed:', error.message);
}

// 3. Optimiser les polices
console.log('🔤 Optimizing fonts...');
try {
  optimizeFonts();
  console.log('✅ Fonts optimized');
} catch (error) {
  console.warn('⚠️ Font optimization failed:', error.message);
}

// 4. Générer le service worker
console.log('⚙️ Generating service worker...');
try {
  generateServiceWorker();
  console.log('✅ Service worker generated');
} catch (error) {
  console.warn('⚠️ Service worker generation failed:', error.message);
}

// 5. Optimiser le bundle
console.log('📦 Optimizing bundle...');
try {
  execSync('npm run build', { stdio: 'inherit' });
  console.log('✅ Bundle optimized');
} catch (error) {
  console.warn('⚠️ Bundle optimization failed:', error.message);
}

console.log('🎉 Performance optimization completed!');

function generateCriticalCSS() {
  return `
/* Critical CSS - Above the fold styles */
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 0;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  line-height: 1.6;
  color: #333;
  background-color: #fff;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

/* Header styles */
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

/* Hero section */
.hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.hero h1 {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1rem;
  line-height: 1.2;
}

.hero p {
  font-size: 1.25rem;
  margin-bottom: 2rem;
  opacity: 0.9;
}

/* Button styles */
.btn {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background: #007bff;
  color: white;
  text-decoration: none;
  border-radius: 0.375rem;
  font-weight: 600;
  transition: background-color 0.2s ease;
  border: none;
  cursor: pointer;
}

.btn:hover {
  background: #0056b3;
}

.btn-primary {
  background: #007bff;
}

.btn-secondary {
  background: #6c757d;
}

/* Layout utilities */
.flex {
  display: flex;
}

.grid {
  display: grid;
}

.hidden {
  display: none;
}

.text-center {
  text-align: center;
}

.text-left {
  text-align: left;
}

.text-right {
  text-align: right;
}

/* Spacing */
.p-4 {
  padding: 1rem;
}

.m-4 {
  margin: 1rem;
}

.mb-4 {
  margin-bottom: 1rem;
}

.mt-4 {
  margin-top: 1rem;
}

/* Typography */
.text-lg {
  font-size: 1.125rem;
}

.text-xl {
  font-size: 1.25rem;
}

.text-2xl {
  font-size: 1.5rem;
}

.text-3xl {
  font-size: 1.875rem;
}

.font-bold {
  font-weight: 700;
}

.font-semibold {
  font-weight: 600;
}

/* Colors */
.text-white {
  color: white;
}

.text-black {
  color: black;
}

.bg-white {
  background-color: white;
}

.bg-black {
  background-color: black;
}

/* Responsive */
@media (max-width: 768px) {
  .hero h1 {
    font-size: 2rem;
  }
  
  .hero p {
    font-size: 1rem;
  }
  
  .container {
    padding: 0 0.5rem;
  }
}

/* Loading states */
.loading {
  opacity: 0.6;
  pointer-events: none;
}

.skeleton {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
}

@keyframes loading {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}
`;
}

function optimizeFonts() {
  const publicDir = path.join(process.cwd(), 'public');
  const fontsDir = path.join(publicDir, 'fonts');
  
  if (!fs.existsSync(fontsDir)) {
    fs.mkdirSync(fontsDir, { recursive: true });
  }
  
  // Créer un fichier de préchargement des polices
  const fontPreload = `
/* Font preload optimization */
@font-face {
  font-family: 'Absans';
  src: url('/fonts/absans-regular.woff2') format('woff2'),
       url('/fonts/absans-regular.woff') format('woff');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'RemixIcon';
  src: url('/fonts/remixicon.woff2') format('woff2'),
       url('/fonts/remixicon.woff') format('woff');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
`;
  
  const cssPath = path.join(process.cwd(), 'src/styles/fonts.css');
  fs.writeFileSync(cssPath, fontPreload);
}

function generateServiceWorker() {
  const serviceWorker = `
// Service Worker for caching
const CACHE_NAME = 'uclic-v1';
const urlsToCache = [
  '/',
  '/static/css/main.css',
  '/static/js/main.js',
  '/fonts/absans-regular.woff2',
  '/fonts/remixicon.woff2',
  '/logo.png',
  '/backgroundeffect.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});
`;
  
  const swPath = path.join(process.cwd(), 'public/sw.js');
  fs.writeFileSync(swPath, serviceWorker);
}
