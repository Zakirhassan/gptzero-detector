const express = require("express");
// import express from "express"; // ES6
const cors = require("cors");
const axios = require("axios");
// require('dotenv').config();  

const app = express();

 
app.use(cors());
app.use(express.json()); 

 app.post("/api/analyze", async (req, res) => {
  const { text } = req.body;

  
  const options = {
    method: 'POST',
    url: 'https://api.gptzero.me/v2/predict/text',  
    headers: {
      'x-api-key': '', 
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    data: {
      document: text, 
      version: '', 
      multilingual: false 
    }
  };

  try {
    const { data } = await axios.request(options);
  
    res.json({ result: data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to detect AI content." });
  }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
