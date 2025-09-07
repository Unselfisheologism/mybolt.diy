#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

function fixFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let changed = false;

    // Replace @remix-run/cloudflare imports with @remix-run/node
    const oldImport = content.replace(/@remix-run\/cloudflare/g, '@remix-run/node');
    if (oldImport !== content) {
      content = oldImport;
      changed = true;
      console.log(`✅ Updated imports in: ${filePath}`);
    }

    // Replace context.cloudflare?.env with process.env
    const oldEnv = content.replace(/context\.cloudflare\?\.env/g, 'process.env');
    if (oldEnv !== content) {
      content = oldEnv;
      changed = true;
      console.log(`✅ Updated env refs in: ${filePath}`);
    }

    // Replace standalone Env type with { [key: string]: string | undefined }
    if (content.includes(' Env') && !content.includes('process.env')) {
      const envTypeReplace = content.replace(/: Env\b/g, ': { [key: string]: string | undefined }');
      const envOptionalReplace = envTypeReplace.replace(/\bEnv\??/g, '{ [key: string]: string | undefined }');

      if (envOptionalReplace !== content && !content.includes('interface') && !content.includes('type Env')) {
        content = envOptionalReplace;
        changed = true;
        console.log(`✅ Updated Env types in: ${filePath}`);
      }
    }

    if (changed) {
      fs.writeFileSync(filePath, content, 'utf8');
    }

  } catch (error) {
    console.error(`❌ Error processing ${filePath}:`, error.message);
  }
}

function walkDirectory(dir, callback, exclude = []) {
  const items = fs.readdirSync(dir);

  items.forEach(item => {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    if (exclude.some(ex => fullPath.includes(ex))) {
      return;
    }

    if (stat.isDirectory()) {
      walkDirectory(fullPath, callback, exclude);
    } else if (stat.isFile() && (item.endsWith('.ts') || item.endsWith('.tsx'))) {
      callback(fullPath);
    }
  });
}

console.log('🚀 Starting bulk import replacement...\n');

// Target directories to fix
const targetDirs = [
  path.join(__dirname, 'app')
];

// Skip node_modules and other irrelevant directories
const excludeDirs = ['node_modules', '.git'];

targetDirs.forEach(dir => {
  if (fs.existsSync(dir)) {
    walkDirectory(dir, fixFile, excludeDirs);
  }
});

// Fix load-context.ts separately
const loadContextPath = path.join(__dirname, 'load-context.ts');
if (fs.existsSync(loadContextPath)) {
  let content = fs.readFileSync(loadContextPath, 'utf8');
  if (!content.includes('@remix-run/node')) {
    content = content.replace(/@remix-run\/cloudflare/g, '@remix-run/node');
    fs.writeFileSync(loadContextPath, content, 'utf8');
    console.log(`✅ Fixed load-context.ts`);
  }
}

console.log('\n✅ Bulk replacement completed!');
console.log('🎉 All Cloudflare imports should now be updated to use @remix-run/node');
console.log('🔥 Env references changed from context.cloudflare?.env to process.env');
console.log('\nNext steps:');
console.log('1. Run: npm run typecheck');
console.log('2. Fix any remaining TypeScript issues manually');
console.log('3. Test your application: npm run dev');
