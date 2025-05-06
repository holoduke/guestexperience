const fs = require('fs');
const path = require('path');

const projectName = 'guest-experience'; // change to your actual project name
const buildPath = path.join(__dirname, `../dist/${projectName}/browser/en/`);
const swSrcPath = path.join(__dirname, '../src/service-worker.js');
const swDestPath = path.join(buildPath, 'service-worker.js');

// Generate unique version
const timestamp = new Date().toISOString().replace(/[-:.TZ]/g, '').slice(0, 14);
const newCacheName = `static-${timestamp}`;

// Read and replace
let swCode = fs.readFileSync(swSrcPath, 'utf8');
swCode = swCode.replace(/__BUILD_HASH__/g, newCacheName);


// Copy to dist with updated cache version
fs.writeFileSync(swDestPath, swCode);

console.log(`[SW] service-worker.js copied to dist with cache name: ${newCacheName}`);
