//Required dependencies
const express = require('express');
const path = require('path');
const fs = require('fs');
const util = require('util');
const { v4: uuidv4 } = require('uuid');

// Initialize Express instance
const app = express();

// Promise version of fs.readFile
const readFromFile = util.promisify(fs.readFile);

// Specify the port the Express server will run
const PORT = 3000;

//Middleware - how Express handles data parsing 
app.use(express.static('public')); //Serving static files from public directory
app.use(express.json()); //Parsing JSON data
app.use(express.urlencoded({ extended: true })); //Handle form submissions and and access form data in Express routes

//api folder
//GET route for /api/notes to read the `db.json` file and return all saved notes as JSON.
app.get('/api/notes', async (req, res) => {
 try {const data = await readFromFile('./db/db.json', 'utf8'); const parsedNotes = JSON.parse(data);res.json(parsedNotes);
  } catch (err) {console.error(err);res.status(500).json({ error: 'Internal Server Error' });}});

//POST route for /api/notes to receive a new note to save on the request body, add it to the `db.json` file, and then return the new note to the user.
app.post('/api/notes', (req, res) => {
console.info(`${req.method} request received to add a note.`); // Log that a POST request was received


//html folder
//GET route for notes.html page
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, './public/notes.html')));
// GET route for index.html page
app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'public/index.html')));


//db folder read/write
// Destructuring assignment for the items in req.body
const { title, text } = req.body;

// If all the required properties are present
if (title && text) {
  const newNoteAdded = {
    title,
    text,
    id: uuidv4()
  };

  fs.readFile('./db/db.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const parsedNotes = JSON.parse(data);
      parsedNotes.push(newNoteAdded);

  fs.writeFile('./db/db.json', JSON.stringify(parsedNotes, null, 4), (writeErr) => {
    if (writeErr) {
      console.error(writeErr, 'Error in updating notes.');
    } else {console.info('Successfully updated notes!');}});

    const response = {status: 'success', body: newNoteAdded,};
    console.log(response); res.status(201).json(response);}});
    } else {res.status(500).json('Error in posting note');}});

//readAndAppend for data to display on the page -see BCS example as well as stuMiniProj28    

//Server listener
app.listen(PORT, () => console.log(`Example app listening at http://localhost:${PORT}`));