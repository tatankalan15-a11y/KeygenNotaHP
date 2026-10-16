// Minimal prepare — pastikan www ada
const fs = require('fs');
const path = require('path');
const www = path.join(__dirname, '..', 'www');
if (!fs.existsSync(www)) fs.mkdirSync(www, { recursive: true });
console.log('prepare:www ok');
