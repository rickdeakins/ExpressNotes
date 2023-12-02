//Required dependencies
const express = require("express");
const path = require("path");
//require files
const apiRoutes = require("./routes/apiRoutes");

// Initialize Express instance
const app = express();

// Specify the port the Express     server will run
const PORT = process.env.PORT || 3000;

//Middleware - how Express handles data parsing
app.use(express.json()); // Parsing JSON data
app.use(express.urlencoded({ extended: true })); //Handle form submissions and and access form data in Express routes

app.use("/api", apiRoutes);
app.use(express.static("public")); //Serving static files from public directory

//GET route for notes.html page `
app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "./public/notes.html"))
);
// GET route for index.html page
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "./public/index.html"))
);

//Server listener
app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);