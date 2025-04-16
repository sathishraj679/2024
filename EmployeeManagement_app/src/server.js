const express = require('express');
const connectDB = require('./config/db');
const path = require('path');
const itemRoutes = require('./routes/itemRoutes');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'views')));
app.use('/api/items', itemRoutes);

connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
