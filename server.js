//Required dependencies
const express = require("express");
const path = require("path");
const fs = require("fs");
const util = require("util");
const { v4: uuidv4 } = require("uuid");

// Initialize Express instance
const app = express();

// Promise version of fs.readFile
const readFromFile = util.promisify(fs.readFile);

// Specify the port the Express server will run
const PORT = process.env.PORT || 3001;

//require files
const apiRoutes = require("./Develop/routes/apiRoutes");
const htmlRoutes = require("./Develop/routes/htmlRoutes");

//Middleware - how Express handles data parsing
app.use(express.static("public")); //Serving static files from public directory
app.use(express.json()); //Parsing JSON data
app.use(express.urlencoded({ extended: true })); //Handle form submissions and and access form data in Express routes

app.use("/api", apiRoutes);
app.use("/", htmlRoutes);

//Server listener
app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);
