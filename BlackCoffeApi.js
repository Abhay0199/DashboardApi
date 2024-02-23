const express = require("express");
const app = express();
const mongoose = require('mongoose');
const data = require('./BlackCoffeData.js').data; // Import data here

// Middleware
app.use(express.json());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.header("Access-Control-Allow-Credentials", true);
    next();
});

const port = 2410;
app.listen(port, () => console.log("Listening on port:", port));

// Define MongoDB Schema
const dataSchema = new mongoose.Schema({
    end_year: String,
    intensity: Number,
    sector: String,
    topic: String,
    insight: String,
    url: String,
    region: String,
    start_year: String,
    impact: String,
    added: String,
    published: String,
    country: String,
    relevance: Number,
    pestle: String,
    source: String,
    title: String,
    likelihood: Number
});

// Create MongoDB Model
const Data = mongoose.model('Data', dataSchema);

// Connect to MongoDB Atlas
const url = 'mongodb+srv://abhay199901:95emhqrTAODX3tCt@cluster0.0hnwemf.mongodb.net/BlackCoffeData?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(async () => {
        console.log("Connected to MongoDB");

        // Insert the data into the database
        try {
            await Data.insertMany(data); // Use async/await to ensure proper insertion
            console.log("Data inserted successfully");
        } catch (err) {
            console.error("Error inserting data:", err);
        }
    })
    .catch(err => console.error("Error connecting to MongoDB:", err));

// Define Route to Fetch Data
app.get("/data", async function (req, res) {
    try {
        const docs = await Data.find({}).exec();
        console.log(docs);
        res.send(docs);
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).send("Internal Server Error");
    }
});
