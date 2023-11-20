//Required dependencies
const express = require("express");

//require files
const apiRoutes = require("./Develop/routes/apiRoutes");
const htmlRoutes = require("./Develop/routes/htmlRoutes");

// Initialize Express instance
const app = express();

// Specify the port the Express     server will run
const PORT = process.env.PORT || 3001;

//Middleware - how Express handles data parsing
app.use(express.json()); //Parsing JSON data
app.use(express.urlencoded({ extended: true })); //Handle form submissions and and access form data in Express routes

app.use("/api", apiRoutes);
app.use("/", htmlRoutes);
app.use(express.static("public")); //Serving static files from public directory

//Server listener
app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);
