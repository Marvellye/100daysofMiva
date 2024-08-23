const axios = require('axios');
const cheerio = require('cheerio');
const webshot = require('webshot-node');
const path = require('path');
const fs = require('fs');
const { promisify } = require('util');

// Promisify fs.readdir and fs.unlink
const readdir = promisify(fs.readdir);
const unlink = promisify(fs.unlink);

// API keys for Screenshot Machine
const apiKeys = ["b131f8", "bca945", "877fb9", "f9a4eb"];

async function takeScreenshot(req, res) {
    const { url, thirdparty } = req.query;

    if (!url) {
        return res.status(400).json({ error: 'URL is required. Pass a valid url' });
    }

    try {
        const start = Date.now();

        // Fetch the page HTML using axios
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);
        const title = $('title').text();

        // Generate a random 10-digit number for the filename
        const randomNumber = Math.floor(1000000000 + Math.random() * 9000000000);
        const screenshotFilename = `${randomNumber}.png`;
        const screenshotPath = path.join(__dirname, '../public', screenshotFilename);

        if (thirdparty === '1') {
            // Use the Screenshot Machine API
            const randomKey = apiKeys[Math.floor(Math.random() * apiKeys.length)];
            const screenshotMachineUrl = `https://api.screenshotmachine.com?key=${randomKey}&url=${encodeURIComponent(url)}&dimension=1366x768`;

            const response = await axios.get(screenshotMachineUrl, { responseType: 'arraybuffer' });
            fs.writeFileSync(screenshotPath, response.data);
        } else {
            // Webshot options
            const options = {
                screenSize: {
                    width: 1366, // Width of a typical laptop screen
                    height: 768  // Height of a typical laptop screen
                },
                shotSize: {
                    width: 1366, // Capture only the visible portion (same as screen width)
                    height: 768  // Capture only the visible portion (same as screen height)
                },
                renderDelay: 3000 // Wait for 3 seconds before taking the screenshot
            };

            // Take a screenshot using webshot with options
            await new Promise((resolve, reject) => {
                webshot(url, screenshotPath, options, function (err) {
                    if (err) {
                        return reject(err);
                    }
                    resolve();
                });
            });
        }

        const end = Date.now();
        const loadTime = end - start;

        // Get the full URL for the screenshot
        const fullScreenshotURL = `https://${req.get('host')}/public/${screenshotFilename}`;

        res.json({
            title: title,                // Include the page title in the response
            screenshotURL: fullScreenshotURL,
            loadTime: `${loadTime}ms`,
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to take screenshot', details: error.message });
    }
}

async function clearScreenshots(req, res) {
    const publicDir = path.join(__dirname, '../public');

    try {
        const files = await readdir(publicDir);
        const pngFiles = files.filter(file => file.endsWith('.png'));

        // Delete each PNG file
        await Promise.all(pngFiles.map(file => unlink(path.join(publicDir, file))));

        res.json({ message: 'All PNG files deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete PNG files', details: error.message });
    }
}

module.exports = {
    takeScreenshot,
    clearScreenshots
};
