const fs = require("fs-extra");
const path = require("path");
const glob = require("glob");
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const generate = require("@babel/generator").default;
const t = require("@babel/types");

// Config
const sourceDir = "src";
const imageBaseUrl = "/optimized";
const widths = [400, 800, 1200];

// Build /optimized/... srcSet values
function buildSrcSet(imgPath) {
  const parsed = path.posix.parse(imgPath);
  return widths.map(
    w => `${path.posix.join(imageBaseUrl, parsed.dir, `${parsed.name}-${w}${parsed.ext}`)} ${w}w`
  ).join(", ");
}

function buildSrc(imgPath) {
  const parsed = path.posix.parse(imgPath);
  return path.posix.join(imageBaseUrl, parsed.dir, `${parsed.name}-${widths[0]}${parsed.ext}`);
}

function isImgTag(babelPath) {
  return (
    babelPath &&
    babelPath.node &&
    babelPath.node.name &&
    babelPath.node.name.name === "img"
  );
}
function updateImgProps(babelPath) {
  if (!babelPath || !babelPath.node || !babelPath.node.attributes) return;

  const props = babelPath.node.attributes; // use babelPath here, not path!

  for (let i = 0; i < props.length; i++) {
    const attr = props[i];
    if (
      t.isJSXAttribute(attr) &&
      attr.name.name === "src" &&
      t.isStringLiteral(attr.value)
    ) {
      const imgPath = attr.value.value;

      // Use the imported Node.js path module here:
      const ext = path.extname(imgPath).toLowerCase();

      if (![".webp", ".jpg", ".jpeg", ".png"].includes(ext)) return;

      // Normalize path using Node.js path.posix, not babelPath
      const cleanPath = path.posix.normalize(imgPath.replace(/^\/+/, ""));

      // Replace src value
      attr.value.value = buildSrc(cleanPath);

      // Build srcSet and sizes strings
      const srcSetVal = buildSrcSet(cleanPath);
      const sizesVal = "(max-width: 600px) 100vw, 50vw";

      let srcSetExists = false;
      let sizesExists = false;

      props.forEach(attr => {
        if (t.isJSXAttribute(attr) && attr.name.name === "srcSet") {
          attr.value = t.stringLiteral(srcSetVal);
          srcSetExists = true;
        }
        if (t.isJSXAttribute(attr) && attr.name.name === "sizes") {
          attr.value = t.stringLiteral(sizesVal);
          sizesExists = true;
        }
      });

      if (!srcSetExists) {
        props.push(t.jsxAttribute(t.jsxIdentifier("srcSet"), t.stringLiteral(srcSetVal)));
      }
      if (!sizesExists) {
        props.push(t.jsxAttribute(t.jsxIdentifier("sizes"), t.stringLiteral(sizesVal)));
      }

      console.log(`✅ Updated <img src="${imgPath}">`);
    }
  }
}


function processFile(filePath) {
  const code = fs.readFileSync(filePath, "utf8");

  const ast = parser.parse(code, {
    sourceType: "module",
    plugins: ["jsx", "typescript"],
  });

  traverse(ast, {
    JSXOpeningElement(path) {
      if (isImgTag(path)) {
        updateImgProps(path);
      }
    },
  });

  const output = generate(ast, { retainLines: true }, code);
  fs.writeFileSync(filePath, output.code, "utf8");
}

function main() {
  const files = glob.sync(`${sourceDir}/**/*.{js,jsx,ts,tsx}`);
  files.forEach(processFile);
  console.log("🎉 All image tags updated safely.");
}

main();
