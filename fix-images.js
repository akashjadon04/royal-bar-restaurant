const fs = require('fs');
const path = require('path');

function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      if (file !== 'node_modules' && file !== '.next') {
        processDir(fullPath);
      }
    } else if (file.endsWith('.tsx') || file.endsWith('.jsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      if (content.includes('<Image') && content.includes('fill')) {
        let changed = false;
        // Regex to find <Image ... fill ...> and inject sizes if not present
        content = content.replace(/<Image([^>]+)fill([^>]*)>/g, (match, p1, p2) => {
          if (!match.includes('sizes=')) {
            changed = true;
            return `<Image${p1}fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"${p2}>`;
          }
          return match;
        });
        
        // Handle cases where fill is at the end or before other props
        if (changed) {
          fs.writeFileSync(fullPath, content);
          console.log(`Updated ${fullPath}`);
        }
      }
    }
  }
}

processDir(path.join(__dirname, 'app'));
processDir(path.join(__dirname, 'components'));
