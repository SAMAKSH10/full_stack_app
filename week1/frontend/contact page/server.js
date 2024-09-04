import express from 'express';
import bodyParser from 'body-parser'; // Use import instead of require
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

// __dirname and __filename are not available in ES modules, so we need to define them
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());  // Corrected usage of bodyParser

// Routes
app.post('/submit-form', (req, res) => {
    const formData = req.body;
    console.log('Form data received:', formData);

    // Send a response back to the client
    res.status(200).json({ message: 'Form submitted successfully', data: formData });
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './index.html'));  // Adjust the path if needed
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
