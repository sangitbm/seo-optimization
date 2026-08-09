const fs = require('fs');
const path = require('path');

const appDir = path.join(__dirname, 'app', '[lang]');

function processDir(dir) {
  const items = fs.readdirSync(dir);
  for (const item of items) {
    const fullPath = path.join(dir, item);
    if (fs.statSync(fullPath).isDirectory()) {
      processDir(fullPath);
    } else if (item === 'page.tsx') {
      let content = fs.readFileSync(fullPath, 'utf8');
      if (content.includes('export const metadata = createToolMetadata(tool);')) {
        content = content.replace(
          'export const metadata = createToolMetadata(tool);',
          `export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {\n  const { lang } = await params;\n  return createToolMetadata(tool, lang);\n}`
        );
        fs.writeFileSync(fullPath, content);
        console.log(`Updated ${fullPath}`);
      }
    }
  }
}

processDir(appDir);
