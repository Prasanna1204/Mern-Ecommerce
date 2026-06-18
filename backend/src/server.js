import express from "express";
import dotenv from "dotenv";
import ConnectDB from "./config/db.js";
dotenv.config();
ConnectDB();

const app = express();

app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});

