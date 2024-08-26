const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');
const qrCode = require('qrcode');
const { v4: uuidv4 } = require('uuid');

const publicDir = path.join(__dirname, '../public');
const dbDir = path.join(__dirname, '../db');
const shortlinkFile = path.join(dbDir, 'shortlink.json');

// Ensure public directory exists
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir);
}
// Ensure db directory exists
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir);
}

// Load existing shortlinks
const loadShortlinks = () => {
  try {
    if (fs.existsSync(shortlinkFile)) {
      const data = fs.readFileSync(shortlinkFile, 'utf8');
      return data ? JSON.parse(data) : [];
    }
    return [];
  } catch (error) {
    console.error('Error loading shortlinks:', error);
    fs.writeFileSync(shortlinkFile, '[]');
    return [];
  }
};

// Save shortlink data
const saveShortlinks = (shortlinks) => {
  fs.writeFileSync(shortlinkFile, JSON.stringify(shortlinks, null, 2));
};

// Generate random numbers
const generateRandomNumber = () => Math.floor(Math.random() * 1000000);

// Helper function to format dates
const formatDate = (date) => {
  const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
    timeZone: 'Africa/Lagos', // Nigerian time zone
  };

  return new Date(date)
    .toLocaleString('en-GB', options)
    .replace(/\//g, '-')
    .replace(/, /g, ' ');
};


// Shortlink parser middleware function
const shortlinkParser = async (req, res) => {
  const { url, title, main_id, clicks, unique_id, delete: deleteFlag, edit_title, edit_long_url, edit_main_id } = req.query;

  console.log(`Received query params: url=${url}, title=${title}, main_id=${main_id}, clicks=${clicks}, unique_id=${unique_id}, deleteFlag=${deleteFlag}, edit_title=${edit_title}, edit_long_url=${edit_long_url}, edit_main_id=${edit_main_id}`);

  // Convert unique_id to string for consistent comparison
  const uniqueIdStr = unique_id ? String(unique_id) : null;

  // Handle the case where delete=1 is passed
  if (uniqueIdStr && deleteFlag === '1') {
    let shortlinks = loadShortlinks();
    const initialLength = shortlinks.length;
    shortlinks = shortlinks.filter(link => String(link.unique_id) !== uniqueIdStr);

    if (shortlinks.length < initialLength) {
      // Delete the old QR code file if it exists
      const qrFileName = `${uniqueIdStr}.png`;
      const qrFilePath = path.join(publicDir, qrFileName);
      if (fs.existsSync(qrFilePath)) {
        fs.unlinkSync(qrFilePath);
      }

      saveShortlinks(shortlinks);
      return res.json({ message: 'Shortlink deleted successfully' });
    } else {
      return res.status(404).json({ error: 'Shortlink not found' });
    }
  }

  // Handle the case where delete=2 is passed to reset clicks
  if (uniqueIdStr && deleteFlag === '2') {
    let shortlinks = loadShortlinks();
    const linkIndex = shortlinks.findIndex(link => String(link.unique_id) === uniqueIdStr);

    if (linkIndex !== -1) {
      shortlinks[linkIndex].clicks = 0;
      saveShortlinks(shortlinks);
      return res.json({ message: 'Clicks reset successfully' });
    } else {
      return res.status(404).json({ error: 'Shortlink not found' });
    }
  }

  // Handle the case where unique_id is provided for editing
  if (uniqueIdStr) {
    let shortlinks = loadShortlinks();
    const linkIndex = shortlinks.findIndex(link => String(link.unique_id) === uniqueIdStr);

    if (linkIndex !== -1) {
      const updatedLink = shortlinks[linkIndex];

      // If edit_main_id is different, delete the old QR code and generate a new one
      if (edit_main_id && edit_main_id !== updatedLink.main_id) {
        const oldQrFileName = `${updatedLink.unique_id}.png`;
        const oldQrFilePath = path.join(publicDir, oldQrFileName);
        if (fs.existsSync(oldQrFilePath)) {
          fs.unlinkSync(oldQrFilePath);
        }

        // Update the short_url with the new main_id
        updatedLink.main_id = edit_main_id;
        updatedLink.short_url = `https://sl.free.nf/${edit_main_id}`;
      }

      // Update other details
      updatedLink.title = edit_title || updatedLink.title;
      updatedLink.long_url = edit_long_url ? decodeURIComponent(edit_long_url) : updatedLink.long_url;
      updatedLink.edited_at = formatDate(new Date());

      // Generate new QR code
      const newQrFileName = `${updatedLink.unique_id}.png`;
      const newQrFilePath = path.join(publicDir, newQrFileName);
      const qrCodeUrl = `https://cherie.marvelly.com.ng/public/${newQrFileName}`;
      await qrCode.toFile(newQrFilePath, updatedLink.short_url);
      updatedLink.qr_code = qrCodeUrl;

      saveShortlinks(shortlinks);
      return res.json(updatedLink);
    } else {
      return res.status(404).json({ error: 'Shortlink not found' });
    }
  }

  // Handle the case where main_id is provided for link tracking
  if (main_id && clicks === '1') {
    const shortlinks = loadShortlinks();
    const foundLink = shortlinks.find(link => link.main_id === main_id);

    if (foundLink) {
      // Increment the clicks count by 1
      foundLink.clicks += 1;
      saveShortlinks(shortlinks);
      return res.json(foundLink);
    } else {
      return res.status(404).json({ error: 'Shortlink not found' });
    }
  }
  
  // Handle the case where main_id is provided for link tracking
  if (main_id) {
    const shortlinks = loadShortlinks();
    const foundLink = shortlinks.find(link => link.main_id === main_id);

    if (foundLink) {
      // Increment the clicks count by 1
      //foundLink.clicks += 1;
      //saveShortlinks(shortlinks);
      return res.json(foundLink);
    } else {
      return res.status(404).json({ error: 'Shortlink not found' });
    }
  }
  

  // If neither url nor main_id is provided, return an error message
  if (!url) {
    return res.status(400).json({ error: 'Please pass a URL and title or a main_id' });
  }

  try {
    // Decode the URL to handle any URL encoding issues
    const decodedUrl = decodeURIComponent(url);

    let originalTitle = 'New Shortlink'; // Default title if fetching fails

    try {
      // Attempt to fetch the original page title
      const { data } = await axios.get(decodedUrl);
      const $ = cheerio.load(data);
      const fetchedTitle = $('title').text();
      if (fetchedTitle) {
        originalTitle = fetchedTitle;
      }
    } catch (fetchError) {
      console.error('Error fetching original title:', fetchError.message);
    }

    // Generate unique IDs
    const mainId = uuidv4().slice(0, 6);
    const uniqueId = generateRandomNumber();

    // Create the short URL
    const shortUrl = `https://sl.free.nf/${mainId}`;

    // Generate QR code for the shortened URL and save as PNG
    const qrFileName = `${uniqueId}.png`;
    const qrFilePath = path.join(publicDir, qrFileName);
    const qrCodeUrl = `https://cherie.marvelly.com.ng/public/${qrFileName}`;
    await qrCode.toFile(qrFilePath, shortUrl);

    // Load existing shortlinks and add the new one
    const shortlinks = loadShortlinks();
    const newShortlink = {
      id: shortlinks.length + 1,
      clicks: 0,
      unique_id: uniqueId,
      main_id: mainId,
      title: title || 'Untitled',
      original_title: originalTitle,
      short_url: shortUrl,
      long_url: decodedUrl,
      qr_code: qrCodeUrl,
      timestamp: formatDate(new Date()),
    };
    shortlinks.push(newShortlink);
    saveShortlinks(shortlinks);

    // Respond with the newly created shortlink data
    res.json(newShortlink);
  } catch (error) {
    console.error('Error creating shortlink:', error);
    res.status(500).json({ error: 'Failed to create shortlink' });
  }
};

module.exports = {
  shortlinkParser,
};
