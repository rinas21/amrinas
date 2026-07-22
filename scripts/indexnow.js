const fs = require('fs');
const https = require('https');
const path = require('path');

const HOST = 'rinas.tech';
const KEY = 'a8f4d2c91b7e5f3a8d6c2e1f9b4a7c0d';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const SITEMAP_PATH = path.join(__dirname, '../sitemap.xml');

function submitToIndexNow(urlList) {
    if (urlList.length === 0) {
        console.log('No URLs to submit.');
        return;
    }

    const payload = JSON.stringify({
        host: HOST,
        key: KEY,
        keyLocation: KEY_LOCATION,
        urlList: urlList
    });

    const options = {
        hostname: 'api.indexnow.org',
        port: 443,
        path: '/IndexNow',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(payload)
        }
    };

    console.log(`Submitting to IndexNow:`, payload);

    const req = https.request(options, (res) => {
        console.log(`Status: ${res.statusCode}`);
        res.on('data', (d) => process.stdout.write(d));
        res.on('end', () => console.log('\nSubmission complete.'));
    });

    req.on('error', (error) => {
        console.error('Error:', error);
    });

    req.write(payload);
    req.end();
}

function getUrlsFromSitemap() {
    if (!fs.existsSync(SITEMAP_PATH)) {
        console.error(`Sitemap not found at ${SITEMAP_PATH}`);
        return [];
    }
    const xml = fs.readFileSync(SITEMAP_PATH, 'utf8');
    const regex = /<loc>(.*?)<\/loc>/g;
    let match;
    const urls = [];
    while ((match = regex.exec(xml)) !== null) {
        urls.push(match[1]);
    }
    return urls;
}

const args = process.argv.slice(2);
let urlsToSubmit = [];

if (args.length > 0 && args[0] === '--files') {
    const files = args.slice(1);
    urlsToSubmit = files
        .filter(f => f.endsWith('.html'))
        .map(f => {
            let urlPath = f === 'index.html' ? '' : f;
            return `https://${HOST}/${urlPath}`;
        });
} else {
    console.log('Running manual submission from sitemap...');
    urlsToSubmit = getUrlsFromSitemap();
}

if (urlsToSubmit.length > 0) {
    console.log(`Found ${urlsToSubmit.length} URLs.`);
    submitToIndexNow(urlsToSubmit);
} else {
    console.log('No URLs found to submit.');
}
