const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();


app.use(cors());
// The express.json() middleware parses incoming requests with JSON payloads
app.use(express.json());

let dishData;

// Read the data from the file
fs.readFile('../server/data.json', 'utf8', (err, data) => {
  if (err) {
    console.log('Error reading the data file', err);
  } else {
    // JSON.parse() converts the JSON string into a JavaScript object
    dishData = JSON.parse(data);
  }
});

app.post('/order', (req, res) => {
  const { dish } = req.body;

  // Check if the dishData object is defined and if the specific dish exists in the data
  if (dishData && dishData[dish]) {
    res.json({ success: true, message: "Your order is getting prepared!" });
  } else {
    res.json({ success: false, message: 'Sorry, the dish is not available at the moment.' });
  }
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});

