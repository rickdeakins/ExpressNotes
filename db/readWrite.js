//Destructuring assignment for the items in req.body
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
    } else {res.status(500).json('Error in posting note');};