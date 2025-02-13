import { readdir, writeFile } from "fs/promises";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const __outScriptsDir = '../';

const cdsDir = join(__dirname, `${__outScriptsDir}public/CDs`);
const outputJson = join(__dirname, `${__outScriptsDir}public/CDs/images.json`);

async function generateImagesJson() {
  try {
    const files = await readdir(cdsDir);
    
    // Filtrer les fichiers images (png, jpg, jpeg, webp)
    const cdFiles = files.filter(file => file.match(/^cd_\d+\.(png|jpe?g|webp|svg)$/));

    // Écrire dans le fichier JSON
    await writeFile(outputJson, JSON.stringify(cdFiles, null, 2));

    console.log("✅ images.json généré avec succès !");
  } catch (error) {
    console.error("❌ Erreur lors de la génération de images.json :", error);
  }
}

generateImagesJson();