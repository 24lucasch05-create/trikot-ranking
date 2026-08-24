// Script to update data.js image paths for 2. Bundesliga
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '..', 'js', 'data.js');
const imgDir = path.join(__dirname, '..', 'images', '2bundesliga');

const files = fs.readdirSync(imgDir);
console.log(`Found ${files.length} images in 2bundesliga folder`);

let content = fs.readFileSync(dataPath, 'utf8');

// Build file map
const fileMap = {};
for (const file of files) {
  const match = file.match(/^(.+)-2026-27-(home|away|third)-kit\.(jpg|png|webp)$/);
  if (match) {
    const imgTeamSlug = match[1];
    const kitType = match[2];
    const key = `${imgTeamSlug}-${kitType}`;
    fileMap[key] = file;
  } else {
    console.log(`Skipping non-standard file: ${file}`);
  }
}

console.log('File map entries:', Object.keys(fileMap).length);
console.log('Keys:', Object.keys(fileMap).sort().join('\n'));

// Known slug differences between data.js and actual filenames
const slugToImgSlug = {
  'hertha-berlin': 'hertha-bsc',
  'dynamo-dresden': 'sg-dynamo-dresden',
};

const imgRegex = /img: '(images\/2bundesliga\/(.+?)-(home|away|third)\.png)'/g;

let replacements = 0;
content = content.replace(imgRegex, (fullMatch, oldPath, slug, kitType) => {
  let imgSlug = slug;
  if (slugToImgSlug[slug]) {
    imgSlug = slugToImgSlug[slug];
  }
  
  const key = `${imgSlug}-${kitType}`;
  const actualFile = fileMap[key];
  
  if (actualFile) {
    replacements++;
    return `img: 'images/2bundesliga/${actualFile}'`;
  } else {
    console.log(`WARNING: No image for slug="${slug}" imgSlug="${imgSlug}" kitType="${kitType}"`);
    return fullMatch;
  }
});

console.log(`\nMade ${replacements} replacements`);
fs.writeFileSync(dataPath, content, 'utf8');
console.log('data.js updated successfully');
