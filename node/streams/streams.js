const fs = require('fs');
const path = require('path');

// Example file
const file = path.join(__dirname, 'large_file.txt');

// Get total file size to calculate progress
const totalSize = fs.statSync(file).size;

let bytesRead = 0;
let totalChunks = 0;
const start = Date.now();

const reader = fs.createReadStream(file, { encoding: 'utf8' });

// Event: each chunk received
reader.on('data', (chunk) => {
  totalChunks++;
  bytesRead += Buffer.byteLength(chunk, 'utf8');

  // Calculate progress
  const progress = ((bytesRead / totalSize) * 100).toFixed(2);

  console.clear();
  console.log(`📦 Chunk #${totalChunks}`);
  console.log(`🔹 Chunk size: ${chunk.length} characters`);
  console.log(`🔹 Progress: ${progress}%`);
  console.log(`🔹 Preview: ${chunk.substring(0, 50)}...`);
  console.log('---');
});

// Event: reading finished
reader.on('end', () => {
  const totalTime = ((Date.now() - start) / 1000).toFixed(2);
  console.log('✅ Reading finished!');
  console.log(`📊 Total chunks: ${totalChunks}`);
  console.log(`📊 Total bytes read: ${bytesRead} bytes`);
  console.log(`⏱ Total time: ${totalTime} seconds`);
});

// Event: error
reader.on('error', (err) => {
  console.error('❌ Error reading file:', err.message);
});
