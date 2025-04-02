const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Configuration
const rootDir = process.cwd();
const ignoreDirs = ['node_modules', '.next', 'public', 'scripts'];
const extensions = ['.js', '.jsx', '.ts', '.tsx'];

console.log('\n🔍 Début de la recherche des fichiers non utilisés...\n');

// Fonction pour obtenir tous les fichiers JavaScript/TypeScript
function getAllFiles() {
  const files = [];
  extensions.forEach(ext => {
    const pattern = `**/*${ext}`;
    glob.sync(pattern, {
      cwd: rootDir,
      ignore: ignoreDirs.map(dir => `**/${dir}/**`)
    }).forEach(file => {
      files.push(file);
    });
  });
  return files;
}

// Fonction pour vérifier si un fichier est importé
function isFileImported(filePath, allFiles) {
  const fileName = path.basename(filePath, path.extname(filePath));
  let isImported = false;

  allFiles.forEach(file => {
    if (file === filePath) return; // Skip self

    const content = fs.readFileSync(path.join(rootDir, file), 'utf8');
    const importPatterns = [
      `import.*from.*${fileName}['"]`,
      `require\\(.*${fileName}['"]\\)`,
      `import.*${fileName}['"]`,
      `dynamic\\(.*${fileName}['"]\\)`
    ];

    for (const pattern of importPatterns) {
      if (new RegExp(pattern).test(content)) {
        isImported = true;
        console.log(`  ✓ ${filePath} est importé dans ${file}`);
        return;
      }
    }
  });

  return isImported;
}

// Analyse principale
const allFiles = getAllFiles();
console.log(`📁 Total des fichiers trouvés: ${allFiles.length}\n`);

const unusedFiles = [];
allFiles.forEach(file => {
  console.log(`\n🔎 Analyse de: ${file}`);
  
  if (!isFileImported(file, allFiles)) {
    // Vérifier si c'est un point d'entrée (pages, composants principaux)
    if (file.includes('pages/') || file.includes('app/')) {
      console.log(`  ⚡ ${file} est un point d'entrée (page ou layout)`);
    } else {
      unusedFiles.push(file);
      console.log(`  ❌ ${file} n'est pas importé`);
    }
  }
});

// Résumé
console.log('\n📊 Résumé:');
console.log(`  • Fichiers analysés: ${allFiles.length}`);
console.log(`  • Fichiers non utilisés: ${unusedFiles.length}\n`);

if (unusedFiles.length > 0) {
  console.log('📝 Fichiers potentiellement non utilisés:');
  unusedFiles.forEach(file => {
    console.log(`  • ${file}`);
  });
} else {
  console.log('✨ Aucun fichier non utilisé trouvé !');
} 