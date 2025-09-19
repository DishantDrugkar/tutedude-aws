const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON
app.use(express.json());

// Test route
app.get('/', (req, res) => {
    res.send('Express Frontend is running!');
});

// Example: call Flask backend
const fetch = require('node-fetch'); // npm install node-fetch@2
app.get('/flask-test', async (req, res) => {
    try {
        const response = await fetch('http://16.171.38.194:5000');
        const data = await response.text();
        res.send(data);
    } catch (err) {
        res.send('Error connecting to Flask backend: ' + err);
    }
});

app.listen(port, () => {
    console.log(`Express app listening at http://localhost:${port}`);
});    