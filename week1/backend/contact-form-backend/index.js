const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());


app.use(express.static(path.join(__dirname, '../../frontend/contact page/dist')));


app.get('/api', (req, res) => {
  res.json({ message: 'Hello from the backend!' });
});


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/contact page/dist/index.html'));
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
