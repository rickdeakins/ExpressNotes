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
// apiRouter.post("/notes", (req, res) => {
//   console.info(`${req.method} request received to add a note.`);
//   let newNote = req.body;
//   newNote.id = uuidv1();
//   readAndAppend(newNote, path.join(__dirname, "../db/db.json"));
//   res.json(newNote);
// }); // Log that a POST request was received

// apiRouter.delete("/notes/:id", async (req, res) => {
//   try {
//     const noteId = req.params.id;

//     // Read the existing notes from the db.json file
//     const data = await readFromFile(
//       path.join(__dirname, "../db/db.json"),
//       "utf8"
//     );
//     const parsedNotes = JSON.parse(data);

//     // Find the index of the note with the matching ID
//     const noteIndex = parsedNotes.findIndex((note) => note.id === noteId);

//     if (noteIndex === -1) {
//       return res.status(404).json({ error: "Note not found" });
//     }

//     // Remove the note from the array
//     parsedNotes.splice(noteIndex, 1);

//     // Write the updated array of notes back to the db.json file
//     await writeToFile(
//       path.join(__dirname, "../db/db.json"),
//       JSON.stringify(parsedNotes)
//     );

//     // Note successfully deleted
//     res.json({ message: "Note deleted successfully" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

module.exports = apiRouter;
