const path = require('path');

// 1️⃣ Current filename
console.log('📄 Filename:', path.basename(__filename));

// 2️⃣ Current directory
console.log('📂 Dirname:', path.dirname(__filename));

// 3️⃣ File extension
console.log('🔧 Extension:', path.extname(__filename));

// 4️⃣ Build a cross-platform path
const filePath = path.join(__dirname, 'files', 'test.txt');
console.log('🛠️ Join path:', filePath);

// 5️⃣ Resolve to an absolute path
const absolute = path.resolve('files', 'test.txt');
console.log('🌍 Resolve absolute:', absolute);

// 6️⃣ Break a path into parts (useful for manipulation)
const parsed = path.parse(filePath);
console.log('📦 Parsed object:', parsed);

// 7️⃣ Rebuild a path from the parsed object
const formatted = path.format(parsed);
console.log('🔄 Formatted path:', formatted);
