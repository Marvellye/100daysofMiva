const express = require('express');
const path = require('path');
const { shortlinkParser } = require('./libs/shortlink.js');

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3000;

// Serve static files from the "public" directory
app.use('/public', express.static(path.join(__dirname, 'public')));


//Shortlink 
app.get('/shortlink', shortlinkParser);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
