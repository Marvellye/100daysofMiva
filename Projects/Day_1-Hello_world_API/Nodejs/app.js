const express = require('express');
const app = express();

app.get('/hello', (req, res) => {
    res.json({ message: 'Hello, World!' });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
