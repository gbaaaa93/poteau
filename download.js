const https = require('https');
const fs = require('fs');

const urls = {
    'index.html': 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ6Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpZCiVodG1sX2E4OGI1YjcwYjFhYTRkMTJiZTA4ZDM0MWZjM2E2NTZjEgsSBxDLoMvonRkYAZIBIgoKcHJvamVjdF9pZBIUQhIxMjQ0MDk3OTA1MzQ4NDg4NDA&filename=&opi=96797242',
    'match.html': 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ6Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpZCiVodG1sXzIxN2UwZmExYTZmZTRjMjdiMDQ2ODA5YmQxOWQwZDQyEgsSBxDLoMvonRkYAZIBIgoKcHJvamVjdF9pZBIUQhIxMjQ0MDk3OTA1MzQ4NDg4NDA&filename=&opi=96797242',
    'chat.html': 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ6Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpZCiVodG1sXzNmZDUxMDA4NTA3ZDQwODdhZDc2OGE1OTM3NmY5MjI2EgsSBxDLoMvonRkYAZIBIgoKcHJvamVjdF9pZBIUQhIxMjQ0MDk3OTA1MzQ4NDg4NDA&filename=&opi=96797242',
    'profile.html': 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ6Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpZCiVodG1sXzc3ZGEyMDFhZWZhZDQ5ZGU4YzU0ZGE3ZmEwNWQ1ZDY2EgsSBxDLoMvonRkYAZIBIgoKcHJvamVjdF9pZBIUQhIxMjQ0MDk3OTA1MzQ4NDg4NDA&filename=&opi=96797242',
    'alert.html': 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ6Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpZCiVodG1sX2RkM2Q4YTFiYWYzMjQ0NDU5NjMxOTQ1ZGIwZTFlYzNhEgsSBxDLoMvonRkYAZIBIgoKcHJvamVjdF9pZBIUQhIxMjQ0MDk3OTA1MzQ4NDg4NDA&filename=&opi=96797242',
    'dashboard.html': 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ6Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpZCiVodG1sX2UwM2JjNmUyMGNhNDRkM2VhYjUwMWY2MmMwMTc2OTdlEgsSBxDLoMvonRkYAZIBIgoKcHJvamVjdF9pZBIUQhIxMjQ0MDk3OTA1MzQ4NDg4NDA&filename=&opi=96797242'
};

async function download(filename, url) {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            if (res.statusCode !== 200) {
                reject(new Error(`Failed to get '${filename}' (${res.statusCode})`));
                return;
            }
            let data = '';
            res.on('data', (chunk) => { data += chunk; });
            res.on('end', () => {
                fs.writeFileSync(filename, data);
                console.log(`Downloaded ${filename}`);
                resolve();
            });
        }).on('error', reject);
    });
}

async function run() {
    for (const [filename, url] of Object.entries(urls)) {
        try {
            await download(filename, url);
        } catch (e) {
            console.error(e.message);
        }
    }
}

run();
