const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors()); // Allow frontend requests
app.use(express.json());
app.use(express.static("public"));

app.get("/api/elements", (req, res) => {
    fs.readFile(path.join(__dirname, "data/elements.json"), "utf8", (err, data) => {
        if (err) {
            console.error("Error reading elements.json:", err);
            return res.status(500).json({ error: "Internal Server Error" });
        }
        res.json(JSON.parse(data));
    });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

