/**
 * Download Josefin Sans fonts from Google Fonts CDN
 * 
 * This script downloads all required Josefin Sans font files
 * Run: node scripts/download-fonts.js
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const { URL } = require('url');

const fontDir = path.join(__dirname, '../public/fonts/josefin-sans');

// Create directory if it doesn't exist
if (!fs.existsSync(fontDir)) {
  fs.mkdirSync(fontDir, { recursive: true });
  console.log('✅ Created directory: public/fonts/josefin-sans\n');
}

function downloadFile(url, filepath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filepath);
    
    const parsedUrl = new URL(url);
    const options = {
      hostname: parsedUrl.hostname,
      path: parsedUrl.pathname + parsedUrl.search,
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    };
    
    const request = https.request(options, (response) => {
      // Handle redirects
      if (response.statusCode === 301 || response.statusCode === 302) {
        file.close();
        if (fs.existsSync(filepath)) {
          fs.unlinkSync(filepath);
        }
        return downloadFile(response.headers.location, filepath).then(resolve).catch(reject);
      }
      
      if (response.statusCode !== 200) {
        file.close();
        if (fs.existsSync(filepath)) {
          fs.unlinkSync(filepath);
        }
        return reject(new Error(`HTTP ${response.statusCode}: ${response.statusMessage}`));
      }
      
      response.pipe(file);
      
      file.on('finish', () => {
        file.close();
        resolve();
      });
    });
    
    request.on('error', (err) => {
      file.close();
      if (fs.existsSync(filepath)) {
        fs.unlinkSync(filepath);
      }
      reject(err);
    });
    
    request.setTimeout(60000, () => {
      request.destroy();
      file.close();
      if (fs.existsSync(filepath)) {
        fs.unlinkSync(filepath);
      }
      reject(new Error('Download timeout'));
    });
    
    request.end();
  });
}

function fetchText(url, userAgent) {
  return new Promise((resolve, reject) => {
    const parsedUrl = new URL(url);
    const options = {
      hostname: parsedUrl.hostname,
      path: parsedUrl.pathname + parsedUrl.search,
      method: 'GET',
      headers: {
        'User-Agent': userAgent || 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    };
    
    const request = https.request(options, (response) => {
      if (response.statusCode !== 200) {
        return reject(new Error(`HTTP ${response.statusCode}: ${response.statusMessage}`));
      }
      
      let data = '';
      response.on('data', (chunk) => { data += chunk; });
      response.on('end', () => resolve(data));
      response.on('error', reject);
    });
    
    request.on('error', reject);
    request.setTimeout(30000, () => {
      request.destroy();
      reject(new Error('Request timeout'));
    });
    
    request.end();
  });
}

async function downloadFonts() {
  console.log('📥 Downloading Josefin Sans fonts from Google Fonts...\n');
  
  try {
    // Use a modern browser User-Agent to get WOFF2/WOFF formats
    const modernUA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';
    const apiUrl = 'https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@300;400;500;600;700&display=swap';
    console.log('🔍 Fetching font information from Google Fonts API...');
    
    const css = await fetchText(apiUrl, modernUA);
    
    // Parse CSS to extract font URLs
    const fontFiles = [];
    const weights = [300, 400, 500, 600, 700];
    const names = ['Light', 'Regular', 'Medium', 'SemiBold', 'Bold'];
    
    // Split CSS into font-face blocks
    const fontFaceBlocks = css.split('@font-face');
    
    for (let i = 0; i < weights.length; i++) {
      const weight = weights[i];
      const name = names[i];
      
      // Find the block for this weight
      const block = fontFaceBlocks.find(b => 
        b.includes(`font-weight: ${weight}`) || 
        b.includes(`font-weight:${weight}`) ||
        b.match(new RegExp(`font-weight:\\s*${weight}`))
      );
      
      if (block) {
        // Extract all URLs from the src property (may have multiple formats)
        const srcMatch = block.match(/src:\s*([^;]+);/);
        if (srcMatch) {
          const srcContent = srcMatch[1];
          
          // Extract woff2 URL (preferred)
          const woff2Match = srcContent.match(/url\(([^)]+\.woff2)\)/);
          // Extract woff URL (fallback)
          const woffMatch = srcContent.match(/url\(([^)]+\.woff)\)/);
          // Extract ttf URL (if woff not available)
          const ttfMatch = srcContent.match(/url\(([^)]+\.ttf)\)/);
          
          if (woff2Match || woffMatch || ttfMatch) {
            fontFiles.push({
              name: `JosefinSans-${name}`,
              weight: weight,
              woff2: woff2Match ? woff2Match[1].trim().replace(/['"]/g, '') : null,
              woff: woffMatch ? woffMatch[1].trim().replace(/['"]/g, '') : null,
              ttf: ttfMatch ? ttfMatch[1].trim().replace(/['"]/g, '') : null,
            });
          }
        }
      }
    }
    
    // If we got TTF files, try to construct WOFF2/WOFF URLs
    // Google Fonts CDN URLs follow a pattern where we can replace .ttf with .woff2/.woff
    if (fontFiles.length > 0 && fontFiles[0].ttf && !fontFiles[0].woff2) {
      console.log('⚠️  Got TTF files, constructing WOFF2/WOFF URLs...\n');
      
      for (const font of fontFiles) {
        if (font.ttf) {
          // Try to construct WOFF2 and WOFF URLs from TTF URL
          font.woff2 = font.ttf.replace('.ttf', '.woff2');
          font.woff = font.ttf.replace('.ttf', '.woff');
        }
      }
    }
    
    if (fontFiles.length === 0) {
      throw new Error('Could not extract font URLs from Google Fonts API response');
    }
    
    console.log(`✅ Found ${fontFiles.length} font weights to download\n`);
    
    // Download each font file
    let successCount = 0;
    let failCount = 0;
    
    for (const font of fontFiles) {
      console.log(`📥 Downloading ${font.name} (weight ${font.weight})...`);
      
      // Download woff2 (preferred)
      if (font.woff2) {
        try {
          const woff2Path = path.join(fontDir, `${font.name}.woff2`);
          await downloadFile(font.woff2, woff2Path);
          const stats = fs.statSync(woff2Path);
          console.log(`  ✅ ${font.name}.woff2 (${(stats.size / 1024).toFixed(1)} KB)`);
          successCount++;
        } catch (error) {
          console.log(`  ❌ ${font.name}.woff2 - ${error.message}`);
          failCount++;
        }
      }
      
      // Download woff (fallback for older browsers)
      if (font.woff) {
        try {
          const woffPath = path.join(fontDir, `${font.name}.woff`);
          // Only download if woff2 failed or doesn't exist
          if (!font.woff2 || !fs.existsSync(path.join(fontDir, `${font.name}.woff2`))) {
            await downloadFile(font.woff, woffPath);
            const stats = fs.statSync(woffPath);
            console.log(`  ✅ ${font.name}.woff (${(stats.size / 1024).toFixed(1)} KB)`);
            successCount++;
          } else {
            // Try to get woff anyway for browser compatibility
            try {
              await downloadFile(font.woff, woffPath);
              const stats = fs.statSync(woffPath);
              console.log(`  ✅ ${font.name}.woff (${(stats.size / 1024).toFixed(1)} KB)`);
              successCount++;
            } catch (error) {
              // WOFF not available, that's okay - WOFF2 is sufficient for modern browsers
              console.log(`  ⚠️  ${font.name}.woff not available (WOFF2 is sufficient)`);
            }
          }
        } catch (error) {
          // WOFF not available, that's okay
          console.log(`  ⚠️  ${font.name}.woff not available`);
        }
      }
    }
    
    console.log(`\n✅ Download complete!`);
    console.log(`   Success: ${successCount} files`);
    if (failCount > 0) {
      console.log(`   Failed: ${failCount} files`);
    }
    
    // List downloaded files
    const files = fs.readdirSync(fontDir).filter(f => f.endsWith('.woff') || f.endsWith('.woff2'));
    if (files.length > 0) {
      console.log(`\n📁 Files in ${fontDir}:`);
      files.forEach(file => {
        const filePath = path.join(fontDir, file);
        const stats = fs.statSync(filePath);
        console.log(`   ${file} (${(stats.size / 1024).toFixed(1)} KB)`);
      });
      
      // Verify we have all required files
      const requiredFiles = [
        'JosefinSans-Light.woff2',
        'JosefinSans-Regular.woff2',
        'JosefinSans-Medium.woff2',
        'JosefinSans-SemiBold.woff2',
        'JosefinSans-Bold.woff2',
      ];
      
      const missing = requiredFiles.filter(f => !files.includes(f));
      if (missing.length === 0) {
        console.log(`\n✅ All required font files are present!`);
      } else {
        console.log(`\n⚠️  Missing files: ${missing.join(', ')}`);
      }
    } else {
      console.log(`\n⚠️  No font files were downloaded.`);
    }
    
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    console.log('\n💡 Alternative: Please download manually from:');
    console.log('   https://gwfh.mranftl.com/fonts/josefin-sans');
    process.exit(1);
  }
}

// Run the script
downloadFonts().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
