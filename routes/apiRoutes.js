//const express = require("express");
const path = require("path");
const uuidv1 = require("uuid/v1");
const apiRouter = require("express").Router();
const { readFromFile, writeToFile, readAndAppend } = require("../utils/helper");
const fs = require('fs');

//GET route for /api/notes to read the `db.json` file and return all saved notes as JSON.
apiRouter.get("/notes", async (req, res) => {
  try {
    console.log("pwd = ", __dirname);
    const data = await readFromFile(
      path.join(__dirname, "../db/db.json"),
      "utf8"
    );
    console.log("data = ", data);
    const parsedNotes = JSON.parse(data);
    res.json(parsedNotes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//POST route for /api/notes to receive a new note to save on the request body, add it to the `db.json` file, and then return the new note to the user.
// apiRouter.post("/notes", (req, res) => {
//   console.info(`${req.method} request received to add a note.`);
//   let newNote = req.body;
//   newNote.id = uuidv1();
//   readAndAppend(newNote, path.join(__dirname, "../db/db.json"));
// }); // Log that a POST request was received


apiRouter.post("/notes", async (req, res) => {
  try {
    console.info(`${req.method} request received to add a note.`);
    let newNote = req.body;
    newNote.id = uuidv1();
    await readAndAppend(newNote, path.join(__dirname, "../db/db.json"));

    // Read the updated notes from the file
    const updatedData = await readFromFile(
      path.join(__dirname, "../db/db.json"),
      "utf8"
    );

    // Parse the updated notes and send it back in the response
    const updatedNotes = JSON.parse(updatedData);
    res.json(updatedNotes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});





module.exports = apiRouter;