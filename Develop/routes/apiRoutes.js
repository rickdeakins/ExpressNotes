const express = require('express');
const router = express.Router();

//GET route for /api/notes to read the `db.json` file and return all saved notes as JSON.
router.get('/api/notes', async (req, res) => {
    try {const data = await readFromFile('./db/db.json', 'utf8'); const parsedNotes = JSON.parse(data);res.json(parsedNotes);
     } catch (err) {console.error(err);res.status(500).json({ error: 'Internal Server Error' });}});
   
//POST route for /api/notes to receive a new note to save on the request body, add it to the `db.json` file, and then return the new note to the user.
router.post('/api/notes', (req, res) => {
console.info(`${req.method} request received to add a note.`); })// Log that a POST request was received
   
module.exports = router;