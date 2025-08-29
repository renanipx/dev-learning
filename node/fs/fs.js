const fs = require('fs');
const fsPromises = require('fs').promises;

// 1️⃣ Create/Write to a file (async with callback)
fs.writeFile('test.txt', 'Hello from Node.js!', (err) => {
    if (err) throw err;
    console.log('✅ File created and content written (writeFile)');
});

// 2️⃣ Read a file (async with callback)
fs.readFile('test.txt', 'utf8', (err, data) => {
    if (err) throw err;
    console.log('📖 File content (readFile):', data);
});

// 3️⃣ Append content
fs.appendFile('test.txt', '\nThis is a new line.', (err) => {
    if (err) throw err;
    console.log('➕ New content appended (appendFile)');
});

// 4️⃣ Version with Promises + async/await
async function run() {
    try {
        // Read the file using Promises
        const content = await fsPromises.readFile('test.txt', 'utf8');
        console.log('📖 [Promise] File content:', content);

        // Delete the file
        await fsPromises.unlink('test.txt');
        console.log('🗑️ File deleted (unlink)');
    } catch (err) {
        console.error('❌ Error:', err);
    }
}

setTimeout(run, 1000); // Delay to ensure the previous steps run first