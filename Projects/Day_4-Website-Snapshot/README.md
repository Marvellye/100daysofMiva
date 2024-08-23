Today, I worked on a simple API in Nodejs that gets a url parameter from the `/screenshot?url=https:/example.com` query and it runs a virtual browser and screenshot the website's page, saves the image and returns the page title, image URL and the load time in a Json response. 

### Documentation for Screenshot API with Express.js

This Node.js application provides an API for taking and clearing screenshots using Express.js. Below is a short and precise documentation of the setup.

### Dependencies

- **express**: Web framework for Node.js.
- **cors**: Middleware for enabling Cross-Origin Resource Sharing (CORS).
- **path**: Node.js module for handling file and directory paths.

### Files Structure

- `app.js`: Main entry point of the application.
- `libs/screenshot.js`: Contains the `takeScreenshot` and `clearScreenshots` functions.
- `public/`: Directory to serve static files, including saved screenshots.

### API Endpoints

1. **GET /screenshot**
    - **Description**: Takes a screenshot of a specified URL and saves it to the `public` directory.
    - **Handler**: `takeScreenshot`
    - **Response**: Returns the screenshot image.
2. **GET /screenshot/clear**
    - **Description**: Clears all screenshots from the `public` directory.
    - **Handler**: `clearScreenshots`
    - **Response**: Returns a success message upon clearing the screenshots.

### Setup and Usage

1. **Static Files**:
    - The app serves static files from the `public` directory, accessible via `/public`.
2. **CORS**:
    - CORS is enabled for all routes, allowing cross-origin requests.
3. **Server Port**:
    - The server runs on port defined by the environment variable `PORT` or defaults to `3000`.

### Code Overview

```jsx
const express = require('express');
const cors = require('cors');
const path = require('path');
const { takeScreenshot, clearScreenshots } = require('./libs/screenshot'); // Import functions

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3000;

// Serve static files from the "public" directory
app.use('/public', express.static(path.join(__dirname, 'public')));

// API Routes
app.get('/screenshot', takeScreenshot);           // Route to take a screenshot
app.get('/screenshot/clear', clearScreenshots);    // Route to clear screenshots

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

```

### Additional Notes

- Ensure the `libs/screenshot.js` file contains the correct logic for taking and clearing screenshots.
- With this setup, screenshots are saved in the `public` directory and can be accessed via URLs prefixed with `/public`.

### Documentation for `/libs/creenshot.js` Module

This module provides two main functions: `takeScreenshot` and `clearScreenshots`. These functions are used in an Express.js application to capture screenshots of web pages and clear the saved screenshots.

### Dependencies

- **axios**: Used for making HTTP requests to fetch web page HTML.
- **cheerio**: Used for parsing and manipulating the HTML to extract the page title.
- **webshot-node**: Used for capturing screenshots of web pages.
- **path**: Node.js module for handling and transforming file paths.
- **fs**: Node.js module for interacting with the file system.
- **util**: Node.js module, specifically used here to promisify `fs` functions.

### Functions

1. **takeScreenshot**
    - **Description**: Captures a screenshot of a specified URL, saves it in the `public` directory, and returns the page title, screenshot URL, and load time.
    - **Parameters**:
        - `req`: The request object from Express, containing the `url` query parameter.
        - `res`: The response object from Express.
    - **Process**:
        1. Validates the `url` query parameter.
        2. Fetches the HTML content of the page using `axios`.
        3. Extracts the page title using `cheerio`.
        4. Generates a random 10-digit filename.
        5. Takes a screenshot using `webshot-node` with specific options (screen size and delay).
        6. Returns a JSON response containing the page title, screenshot URL, and load time.
    - **Response**:
        - **Success**: Returns a JSON object with the page title, screenshot URL, and load time.
        - **Error**: Returns a JSON object with an error message and details.
    
    ```jsx
    async function takeScreenshot(req, res) {
        const { url } = req.query;
        if (!url) {
            return res.status(400).json({ error: 'URL is required. Pass a valid url' });
        }
        try {
            const start = Date.now();
            const { data } = await axios.get(url);
            const $ = cheerio.load(data);
            const title = $('title').text();
            const randomNumber = Math.floor(1000000000 + Math.random() * 9000000000);
            const screenshotFilename = `${randomNumber}.png`;
            const screenshotPath = path.join(__dirname, '../public', screenshotFilename);
            const options = {
                screenSize: { width: 1366, height: 768 },
                shotSize: { width: 1366, height: 768 },
                renderDelay: 3000
            };
            webshot(url, screenshotPath, options, function (err) {
                if (err) {
                    return res.status(500).json({ error: 'Failed to take screenshot', details: err.message });
                }
                const end = Date.now();
                const loadTime = end - start;
                const fullScreenshotURL = `https://${req.get('host')}/public/${screenshotFilename}`;
                res.json({ title, screenshotURL: fullScreenshotURL, loadTime: `${loadTime}ms` });
            });
        } catch (error) {
            res.status(500).json({ error: 'Failed to take screenshot', details: error.message });
        }
    }
    
    ```
    
2. **clearScreenshots**
    - **Description**: Deletes all PNG files from the `public` directory.
    - **Parameters**:
        - `req`: The request object from Express.
        - `res`: The response object from Express.
    - **Process**:
        1. Reads the contents of the `public` directory.
        2. Filters the files to include only PNG files.
        3. Deletes each PNG file asynchronously.
        4. Returns a success message upon completion.
    - **Response**:
        - **Success**: Returns a JSON object with a success message.
        - **Error**: Returns a JSON object with an error message and details.
    
    ```jsx
    async function clearScreenshots(req, res) {
        const publicDir = path.join(__dirname, '../public');
        try {
            const files = await readdir(publicDir);
            const pngFiles = files.filter(file => file.endsWith('.png'));
            await Promise.all(pngFiles.map(file => unlink(path.join(publicDir, file))));
            res.json({ message: 'All PNG files deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: 'Failed to delete PNG files', details: error.message });
        }
    }
    
    ```
    

### Exported Functions

- `takeScreenshot`: Captures and saves a screenshot, then returns relevant information.
- `clearScreenshots`: Deletes all PNG screenshots from the `public` directory.

```jsx
module.exports = {
  takeScreenshot,
  clearScreenshots
};

```

### Usage

These functions are designed to be used as route handlers in an Express.js application. When a request is made to the `/screenshot` route, the `takeScreenshot` function will be executed. Similarly, when a request is made to the `/screenshot/clear` route, the `clearScreenshots` function will be executed.

It gives you a Json response 

```json
{
  "title":"Page Title",
  "screenshotURL":"http://localhost:3000/public/1882747163.png",
  "loadTime":"25561ms"
}
```

Here is the API in action https://app.marvelly.com.ng/100daysofMiva/day-4/ Good Luck

https://dev.to/marvellye/day-4-web-snapshots-api-568p

[https://www.linkedin.com/posts/ezekiel-marvellous-oghenemaga_100daysofmiva-activity-7232850332253384704-st_2](https://www.linkedin.com/posts/ezekiel-marvellous-oghenemaga_100daysofmiva-activity-7232850332253384704-st_2?utm_source=share&utm_medium=member_desktop)
