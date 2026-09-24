const fs = require('fs');
const readline = require('readline');

const transcriptPath = 'C:\\Users\\jeelb\\.gemini\\antigravity-ide\\brain\\29f17307-b456-44b7-9498-5a9da5f83bd4\\.system_generated\\logs\\transcript_full.jsonl';
const targetFiles = [
    'theme.js',
    'index.css',
    'HeroGraphic.module.css',
    'Home.jsx',
    'Predict.jsx'
];

let foundFiles = new Set();

const rl = readline.createInterface({
    input: fs.createReadStream(transcriptPath, { encoding: 'utf-8' }),
    crlfDelay: Infinity
});

rl.on('line', (line) => {
    if (foundFiles.size === targetFiles.length) {
        rl.close();
        return;
    }
    
    try {
        const obj = JSON.parse(line);
        if (obj.source === 'SYSTEM' && obj.type === 'TOOL_RESPONSE' && obj.content) {
            targetFiles.forEach(file => {
                if (!foundFiles.has(file) && obj.content.includes(file)) {
                    // Extract the content. The tool response usually has "File Path: ...\nTotal Lines: ...\nTotal Bytes: ...\nShowing lines...\n<line_number>: <original_line>"
                    fs.writeFileSync(`original_${file}.txt`, obj.content);
                    foundFiles.add(file);
                    console.log(`Found original for ${file}`);
                }
            });
        }
    } catch (e) {
        // Ignore JSON parse errors
    }
});

rl.on('close', () => {
    console.log('Done.');
});
