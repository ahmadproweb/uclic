
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
        const webpPath = path.join(dir, `${name}.webp`);
        await sharp(imagePath)
          .webp({ quality: 85 })
          .toFile(webpPath);
        
        console.log(`Optimized: ${imagePath} -> ${webpPath}`);
      }
      
      // Optimiser l'original
      await sharp(imagePath)
        .jpeg({ quality: 85, progressive: true })
        .png({ compressionLevel: 9 })
        .toFile(imagePath);
        
    } catch (error) {
      console.warn(`Failed to optimize ${imagePath}:`, error.message);
    }
  }
}

if (require.main === module) {
  optimizeImages().catch(console.error);
}

module.exports = { optimizeImages };
