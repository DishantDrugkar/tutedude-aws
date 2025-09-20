const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

// Backend URL will come from ECS environment variable
const BACKEND_URL = process.env.BACKEND_URL || "http://16.171.37.29:5000";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.post('/submit', async (req, res) => {
    const { name, email } = req.body;
    try {
        const response = await axios.post(`${BACKEND_URL}/submit`, { name, email });
        res.send(response.data);
    } catch (err) {
        console.error("Error submitting to backend:", err.message);
        res.send(`Error connecting to backend: ${err.message}`);
    }
});

app.listen(PORT, () => {
    console.log(`Express server running at http://0.0.0.0:${PORT}`);
    console.log(`Using Backend URL: ${BACKEND_URL}`);
});