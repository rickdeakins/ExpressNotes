//const express = require("express");
const path = require("path");
const uuidv1 = require("uuid/v1");
const apiRouter = require("express").Router();
const { readFromFile, writeToFile, readAndAppend } = require("../utils/helper");

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
apiRouter.post("/notes", (req, res) => {
  console.info(`${req.method} request received to add a note.`);
  let newNote = req.body;
  newNote.id = uuidv1();
  readAndAppend(newNote, path.join(__dirname, "../db/db.json"));
  res.json(newNote);
}); // Log that a POST request was received

module.exports = apiRouter;
