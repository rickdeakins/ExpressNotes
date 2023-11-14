//GET route for notes.html page
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, './public/notes.html')));
// GET route for index.html page
app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'public/index.html')));
