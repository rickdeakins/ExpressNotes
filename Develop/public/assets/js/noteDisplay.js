function notesDisplay(){fetch('./api/notes').then(response => response.json())
    .then (notes => {const notesList = document.getElementById('notes-list')});
    notesList.innerhtml = ''; // Clear existing notes
    notes.array.forEach(element => {const noteText = document.createElement('li'); 
    noteText.textContent = note.title;
    notesList.appendChild(noteItem);})
    .catch (error => {console.error('Error fetching notes:', error)});}


module.exports = ;

