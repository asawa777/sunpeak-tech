const fs = require('fs-extra');
const path = require('path');

const SOURCE_DIR = 'C:/Users/jupit/OneDrive/Desktop/portfolio';
const DEST_DIR = path.join(__dirname, '../public/logos');
const MANIFEST_FILE = path.join(__dirname, '../public/logos.json');

async function processLogos() {
  try {
    console.log(`Starting asset import from: ${SOURCE_DIR}`);

    // Ensure source exists
    if (!fs.existsSync(SOURCE_DIR)) {
      console.error(`Source directory not found: ${SOURCE_DIR}`);
      process.exit(1);
    }

    // Ensure destination exists
    await fs.ensureDir(DEST_DIR);
    // Clean destination to ensure no stale files (optional, but good for V2 "Unified Stream" cleanup if we want to be strict, but maybe safer to just overwrite)
    // await fs.emptyDir(DEST_DIR); 
    console.log(`Destination directory ready: ${DEST_DIR}`);

    // Read files
    const files = await fs.readdir(SOURCE_DIR);
    const imageFiles = files.filter(file => /\.(png|jpg|jpeg|svg)$/i.test(file));

    console.log(`Found ${imageFiles.length} image files.`);

    const importedLogos = [];

    for (const file of imageFiles) {
      const srcPath = path.join(SOURCE_DIR, file);
      const destPath = path.join(DEST_DIR, file);
      
      await fs.copy(srcPath, destPath, { overwrite: true });
      importedLogos.push(`/logos/${file}`);
      console.log(`Copied: ${file}`);
    }

    // Write manifest
    await fs.writeJson(MANIFEST_FILE, importedLogos, { spaces: 2 });
    console.log(`Manifest written to: ${MANIFEST_FILE}`);
    console.log('Logo processing complete successfully.');

  } catch (err) {
    console.error('Error processing logos:', err);
    process.exit(1);
  }
}

processLogos();
