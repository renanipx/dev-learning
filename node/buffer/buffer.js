const fs = require('fs');
const path = require('path');

// 1️⃣ Path to the file
const filePath = path.join(__dirname, 'files', 'example.txt');

// 2️⃣ Read file as Buffer
fs.readFile(filePath, (err, data) => {
    if (err) throw err;

    console.log('Original Buffer:', data);
    console.log('As string (utf-8):', data.toString('utf-8'));

    // 3️⃣ Convert buffer to Base64
    const base64 = data.toString('base64');
    console.log('Base64:', base64);

    // 4️⃣ Convert Base64 back to Buffer
    const bufferFromBase64 = Buffer.from(base64, 'base64');

    // 5️⃣ Save the decoded buffer to a new file
    const newFilePath = path.join(__dirname, 'files', 'example_copy.txt');
    fs.writeFile(newFilePath, bufferFromBase64, (err) => {
        if (err) throw err;
        console.log('✅ File copied and saved successfully using Buffer!');
    });
});
