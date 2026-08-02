const fs = require("fs");
const path = require("path");

const root = __dirname;

const htmlPath = path.join(root, "index.html");
const cssPath = path.join(root, "style.css");
const jsPath = path.join(root, "app.js");

const docsPath = path.join(root, "docs");


// Create docs folder if missing

if (!fs.existsSync(docsPath)) {
    fs.mkdirSync(docsPath);
}


// Read files

let html = fs.readFileSync(
    htmlPath,
    "utf8"
);

const css = fs.readFileSync(
    cssPath,
    "utf8"
);

const js = fs.readFileSync(
    jsPath,
    "utf8"
);


// Replace CSS

html = html.replace(
    '<link rel="stylesheet" href="style.css">',
    `<style>\n${css}\n</style>`
);


// Replace JS

html = html.replace(
    '<script src="app.js"></script>',
    `<script>\n${js}\n</script>`
);


// Write GitHub Pages version

const output = path.join(
    docsPath,
    "index.html"
);

fs.writeFileSync(
    output,
    html,
    "utf8"
);


// Copy assets

const assetsSource =
path.join(root, "assets");

const assetsDestination =
path.join(docsPath, "assets");


if(fs.existsSync(assetsSource)){

    fs.cpSync(
        assetsSource,
        assetsDestination,
        {
            recursive:true
        }
    );

}


// Copy standalone files needed by Pages

console.log("Created browser version:");
console.log(output);