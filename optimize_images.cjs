const fs = require("fs-extra");
const glob = require("glob");
const sharp = require("sharp");
const cheerio = require("cheerio");
const path = require("path");

const inputDir = "src";         // where your JSX/TSX files live
const imageRoot = "public";    // where your actual image files are
const outputDir = "optimized"; // where you want resized images to go

const sizes = [400, 800, 1200];  // widths to generate

async function getImagePaths() {
  const files = glob.sync(`${inputDir}/**/*.{html,js,jsx,ts,tsx}`);
  const allPaths = new Set();

  for (const file of files) {
    const stat = await fs.stat(file);
    if (!stat.isFile()) continue;

    const content = await fs.readFile(file, "utf-8");
    let imagePaths = [];

    if (file.endsWith(".html")) {
      const $ = cheerio.load(content);
      $("img").each((_, el) => {
        const src = $(el).attr("src") || $(el).attr("data-src");
        if (src) imagePaths.push(src);
      });
    } else {
      // regex for image file references in js/jsx/ts/tsx files
      const regex = /['"`](.*?\.(png|jpe?g|webp|svg))['"`]/gi;
      let match;
      while ((match = regex.exec(content)) !== null) {
        imagePaths.push(match[1]);
      }
    }

    // Filter out remote or data URLs and resolve relative to inputDir + file folder
    imagePaths = imagePaths
      .filter(p => p && !p.startsWith("http") && !p.startsWith("data:"))
      .map(p => {
        if (p.startsWith("/")) {
          // root-relative import → resolve from public/
          return path.join(imageRoot, p.slice(1));
        } 
        // relative import → resolve relative to scanDir
        return path.resolve(path.dirname(file), p);
      });


    for (const imgPath of imagePaths) {
      allPaths.add(imgPath);
      console.log(`Found image: ${imgPath}`);
    }
  }

  return Array.from(allPaths);
}

async function resizeImages() {
  const images = await getImagePaths();

  for (const imagePath of images) {
    const ext = path.extname(imagePath);
    const baseName = path.basename(imagePath, ext);
    const relativeDir = path.relative(inputDir, path.dirname(imagePath));
    const safeRelativeDir = relativeDir.startsWith("..") ? "" : relativeDir;
    const outBase = path.join(outputDir, safeRelativeDir);

    await fs.ensureDir(outBase);

    for (const width of sizes) {
      const outPath = path.join(outBase, `${baseName}-${width}${ext}`);
      try {
        const img = sharp(imagePath);
        const metadata = await img.metadata();

        if (metadata.width && metadata.width > width) {
          await img.resize({ width }).toFile(outPath);
          console.log(`✔ Resized ${imagePath} → ${outPath}`);
        } else {
          // Just copy original if already small
          await fs.copy(imagePath, outPath);
          console.log(`⚠ Copied (too small) ${imagePath} → ${outPath}`);
        }
      } catch (err) {
        console.error(`❌ Error processing ${imagePath}:`, err.message);
      }
    }
  }
}

resizeImages();
