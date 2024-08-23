const express = require('express');
const cors = require('cors');
const path = require('path');
const { takeScreenshot, clearScreenshots } = require('./libs/screenshot'); // Import the functions

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3000;

// Serve static files from the "public" directory
app.use('/public', express.static(path.join(__dirname, 'public')));

// Use the screenshot function in the /screenshot route
app.get('/screenshot', takeScreenshot);

// Use the clearScreenshots function in the /clear route
app.get('/screenshot/clear', clearScreenshots);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
