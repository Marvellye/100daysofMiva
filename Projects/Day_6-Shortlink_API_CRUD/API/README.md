Hello world 👋🏻
#100daysofMiva day 6, I worked on an API for shortening links without a database. let's talk about it

### Step-by-Step Instructions and Documentation

This Node.js script creates, edits, deletes, and manages shortlinks with associated QR codes. It uses Express.js, Axios, Cheerio, and several Node.js core modules to achieve these tasks.

#### 1. **Installation**

Before running the script, ensure you have Node.js installed on your machine. Then, follow these steps:

**1.1.** **Clone the repository** or create a new directory and copy the script into it:

```bash
git clone https://github.com/Marvellye/100daysofMiva/Projects/Day_6-Shortlink_API_CRUD
cd https://github.com/Marvellye/100daysofMiva/Projects/Day_6-Shortlink_API_CRUD
```

**1.2.** **Install the required dependencies** using npm:

```bash
npm init -y
npm install axios cheerio qrcode uuid
```

**1.3.** **Create necessary directories**:

Ensure that the following directories exist within your project:
- `public`: This directory will store generated QR codes.
- `db`: This directory will store the `shortlink.json` file, which holds the shortlink data.

If these directories don't exist, the script will create them automatically.

#### 2. **How the Code Works**

**2.1.** **Initialization and Directory Setup**

- The script begins by defining the paths to the `public` and `db` directories and the `shortlink.json` file.
- It checks if the `public` and `db` directories exist. If not, it creates them.

```javascript
const publicDir = path.join(__dirname, '../public');
const dbDir = path.join(__dirname, '../db');
const shortlinkFile = path.join(dbDir, 'shortlink.json');

// Ensure directories exist
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir);
}
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir);
}
```

**2.2.** **Load and Save Shortlinks**

- `loadShortlinks`: This function reads the `shortlink.json` file and parses its content into a JavaScript array. If the file does not exist, it returns an empty array.
  
- `saveShortlinks`: This function saves the shortlink data into the `shortlink.json` file, formatted as a JSON string.

```javascript
const loadShortlinks = () => { /*...*/ };
const saveShortlinks = (shortlinks) => { /*...*/ };
```

**2.3.** **Shortlink Creation and Management**

- The `shortlinkParser` function is an Express.js middleware that handles all incoming requests to create, edit, delete, or retrieve shortlinks.

  **2.3.1.** **Create a Shortlink**

  - When a `url` is provided, the script attempts to fetch the page title using Axios and Cheerio. If successful, it stores the title; otherwise, it uses a default title.
  - The script generates unique IDs, a short URL, and a QR code image for the short URL.
  - It saves the new shortlink to `shortlink.json`.

  ```javascript
  const decodedUrl = decodeURIComponent(url);
  const { data } = await axios.get(decodedUrl);
  const $ = cheerio.load(data);
  const fetchedTitle = $('title').text();

  const mainId = uuidv4().slice(0, 6);
  const uniqueId = generateRandomNumber();
  const shortUrl = `https://sl.free.nf/${mainId}`;
  
  await qrCode.toFile(qrFilePath, shortUrl);
  
  const newShortlink = { /*...*/ };
  shortlinks.push(newShortlink);
  saveShortlinks(shortlinks);
  ```

  **2.3.2.** **Delete a Shortlink**

  - If `delete=1` is passed with `unique_id`, the corresponding shortlink is removed from `shortlink.json`, and the associated QR code file is deleted.

  ```javascript
  if (uniqueIdStr && deleteFlag === '1') {
    let shortlinks = loadShortlinks();
    shortlinks = shortlinks.filter(link => String(link.unique_id) !== uniqueIdStr);
    // Delete QR code file and save changes
  }
  ```

  **2.3.3.** **Edit a Shortlink**

  - If `unique_id` is passed along with other edit parameters (`edit_title`, `edit_long_url`, `edit_main_id`), the script updates the shortlink data, generates a new QR code if necessary, and saves the updated data.

  ```javascript
  if (uniqueIdStr) {
    let shortlinks = loadShortlinks();
    const linkIndex = shortlinks.findIndex(link => String(link.unique_id) === uniqueIdStr);
    // Update the shortlink data and generate a new QR code if needed
  }
  ```

  **2.3.4.** **Track Clicks on a Shortlink**

  - If `main_id` is passed with `clicks=1`, the script increments the click count for the corresponding shortlink.

  ```javascript
  if (main_id && clicks === '1') {
    const shortlinks = loadShortlinks();
    const foundLink = shortlinks.find(link => link.main_id === main_id);
    foundLink.clicks += 1;
    saveShortlinks(shortlinks);
  }
  ```

**2.4.** **Date Formatting**

- The `formatDate` function formats the timestamp according to the Nigerian time zone.

```javascript
const formatDate = (date) => { /*...*/ };
```

**2.5.** **Export the Middleware**

- The `shortlinkParser` function is exported so it can be used as a middleware in an Express.js application.

```javascript
module.exports = { shortlinkParser };
```

#### 3. **Usage**

**3.1.** **Integration with Express.js**

In your `app.js` or server file, you can integrate the `shortlinkParser` middleware like this:

```javascript
const express = require('express');
const { shortlinkParser } = require('./path-to-your-script');

const app = express();

app.get('/shortlink', shortlinkParser);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
```

**3.2.** **Making Requests**

- **Create a Shortlink**: 
  ```
  GET /shortlink?url=http://example.com&title=My%20Example%20Site
  ```

- **Delete a Shortlink**:
  ```
  GET /shortlink?unique_id=12345&delete=1
  ```

- **Edit a Shortlink**:
  ```
  GET /shortlink?unique_id=12345&edit_title=New%20Title&edit_main_id=newid123
  ```

- **Track Clicks**:
  ```
  GET /shortlink?main_id=newid123&clicks=1
  ```

The responses will be in JSON format, providing the relevant data or error messages.

check it out here
https://app.marvelly.com.ng/100daysofMiva/day-6/

GitHub source code 
https://github.com/Marvellye/100daysofMiva/Projects/Day_6-Shortlink_API_CRUD

DevTo
https://dev.to/marvellye/simple-link-shortener-api-without-database-nodejs-l2