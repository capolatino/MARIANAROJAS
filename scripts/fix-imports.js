const fs = require('fs');
const path = require('path');

// Function to get relative path from source to target
function getRelativePath(from, to) {
  const fromDir = path.dirname(from);
  const relativePath = path.relative(fromDir, to);
  return relativePath.replace(/\\/g, '/'); // Normalize path separators
}

// Function to fix imports in a file
function fixImportsInFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    // Fix @/components/ui/ imports
    const uiImportRegex = /from ['"]@\/components\/ui\/([^'"]+)['"]/g;
    content = content.replace(uiImportRegex, (match, componentPath) => {
      const relativePath = getRelativePath(filePath, `components/ui/${componentPath}`);
      modified = true;
      return `from '${relativePath}'`;
    });

    // Fix @/lib/ imports
    const libImportRegex = /from ['"]@\/lib\/([^'"]+)['"]/g;
    content = content.replace(libImportRegex, (match, libPath) => {
      const relativePath = getRelativePath(filePath, `lib/${libPath}`);
      modified = true;
      return `from '${relativePath}'`;
    });

    // Fix @/components/ imports (non-ui)
    const componentImportRegex = /from ['"]@\/components\/([^'"]+)['"]/g;
    content = content.replace(componentImportRegex, (match, componentPath) => {
      if (!componentPath.startsWith('ui/')) {
        const relativePath = getRelativePath(filePath, `components/${componentPath}`);
        modified = true;
        return `from '${relativePath}'`;
      }
      return match;
    });

    if (modified) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Fixed imports in: ${filePath}`);
    }
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
  }
}

// Function to find all TypeScript/JavaScript files
function findTsxFiles(dir) {
  const files = [];
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules') {
      files.push(...findTsxFiles(fullPath));
    } else if (item.endsWith('.tsx') || item.endsWith('.ts')) {
      files.push(fullPath);
    }
  }
  
  return files;
}

// Main execution
console.log('Fixing imports...');
const files = findTsxFiles('.');
files.forEach(fixImportsInFile);
console.log('Import fixing completed!');
