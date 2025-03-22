const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');
const glob = require('glob');

const QUALITY = 80;
const PUBLIC_DIR = path.join(__dirname, '../public');
const IMAGES_DIR = path.join(PUBLIC_DIR, 'images');

async function optimizeImage(inputPath) {
  const ext = path.extname(inputPath).toLowerCase();
  if (!['.jpg', '.jpeg', '.png'].includes(ext)) {
    console.log(`Skipping ${inputPath} - not a supported image format`);
    return;
  }

  const outputPath = inputPath.replace(/\.(jpg|jpeg|png)$/i, '.webp');
  
  try {
    // Optimiser l'image originale
    await sharp(inputPath)
      .resize({
        width: 1920,
        height: 1080,
        fit: 'inside',
        withoutEnlargement: true
      })
      .jpeg({ quality: QUALITY, progressive: true })
      .toFile(inputPath + '.optimized');

    // Remplacer l'original par la version optimisée
    await fs.rename(inputPath + '.optimized', inputPath);

    // Créer la version WebP
    await sharp(inputPath)
      .webp({ quality: QUALITY })
      .toFile(outputPath);

    console.log(`✓ Optimized: ${path.basename(inputPath)}`);
    console.log(`  └─ Created WebP version: ${path.basename(outputPath)}`);
  } catch (error) {
    console.error(`✗ Error processing ${inputPath}:`, error);
  }
}

async function processDirectory() {
  try {
    // Créer le dossier images s'il n'existe pas
    await fs.mkdir(IMAGES_DIR, { recursive: true });

    // Trouver toutes les images
    const files = glob.sync(path.join(IMAGES_DIR, '**/*.{jpg,jpeg,png}'));
    
    if (files.length === 0) {
      console.log('No images found to optimize');
      return;
    }

    console.log(`Found ${files.length} images to process\n`);
    
    // Optimiser chaque image
    await Promise.all(files.map(optimizeImage));
    
    console.log('\nImage optimization complete! 🎉');
  } catch (error) {
    console.error('Error during image optimization:', error);
    process.exit(1);
  }
}

async function optimizeImage() {
  try {
    await sharp('public/man.png')
      .resize(516, 378)
      .webp({ quality: 85 })
      .toFile('public/man-516x378.webp');
    
    console.log('Image optimized successfully!');
  } catch (error) {
    console.error('Error optimizing image:', error);
  }
}

optimizeImage();

processDirectory(); 