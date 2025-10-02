const fs = require('fs');
const path = require('path');

// Configuration
const STATIC_DOMAIN = 'https://static.uclic.fr';
const LOCAL_LINKEDIN_DIR = path.join(__dirname, '../public/linkedin');
const UPLOAD_DIR = '/linkedin/'; // Sur static.uclic.fr

async function uploadImageToStatic(localPath, remotePath) {
  // Ici tu peux utiliser différentes méthodes selon ton setup :
  
  // Option A: FTP/SFTP
  // const ftp = require('ftp');
  // const client = new ftp.Client();
  // await client.access({ host: 'static.uclic.fr', ... });
  // await client.uploadFrom(localPath, remotePath);
  
  // Option B: AWS S3 (si static.uclic.fr est un bucket S3)
  // const AWS = require('aws-sdk');
  // const s3 = new AWS.S3();
  // await s3.upload({ Bucket: 'static.uclic.fr', Key: remotePath, Body: fs.readFileSync(localPath) });
  
  // Option C: rsync/scp (si c'est un serveur SSH)
  // const { exec } = require('child_process');
  // exec(`scp ${localPath} user@static.uclic.fr:${remotePath}`);
  
  console.log(`Upload: ${localPath} → ${STATIC_DOMAIN}${remotePath}`);
}

async function uploadLinkedInImages() {
  try {
    const files = fs.readdirSync(LOCAL_LINKEDIN_DIR);
    const webpFiles = files.filter(file => file.endsWith('.webp'));
    
    console.log(`Found ${webpFiles.length} LinkedIn images to upload`);
    
    for (const file of webpFiles) {
      const localPath = path.join(LOCAL_LINKEDIN_DIR, file);
      const remotePath = `${UPLOAD_DIR}${file}`;
      
      await uploadImageToStatic(localPath, remotePath);
    }
    
    console.log('✅ All LinkedIn images uploaded successfully!');
  } catch (error) {
    console.error('❌ Error uploading images:', error);
  }
}

// Instructions d'utilisation
console.log(`
🚀 Script d'upload des images LinkedIn vers static.uclic.fr

Pour utiliser ce script, tu dois :

1. Installer les dépendances nécessaires :
   npm install ftp  # ou aws-sdk, ou autre selon ton setup

2. Configurer les credentials dans le script

3. Exécuter :
   node scripts/upload-linkedin-images.js

Ou upload manuellement :
- Va sur static.uclic.fr
- Crée le dossier /linkedin/
- Copie toutes les images de public/linkedin/ vers /linkedin/
`);

// Décommente pour exécuter
// uploadLinkedInImages();
