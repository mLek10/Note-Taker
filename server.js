const express = require("express");
const fs = require('fs');
const path = require("path");
const {v4: uuidv4} = require("uuid"); //generate unique ids
const app = express();
const PORT = process.env.PORT || 3001;
// const notesData = JSON.parse(fs.readFileSync('db.json', 'utf-8'));

//middleware
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static("public"));

//routes
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, 'public','notes.html'))
);
app.get('/api/notes', (req, res) => {
  const notesData = fs.readFileSync(path.join(__dirname, 'db.json'), 'utf-8');
  const parsedData = JSON.parse(notesData);
  res.json(parsedData);
});

  app.post('/api/notes', (req, res) => {
    const newNote = req.body;
    newNote.id = uuidv4(); // Generate a unique ID for the new note
    const filePath = path.join(__dirname, '\db.json');
    const notesData = JSON.parse(fs.readFileSync(filePath));
    notesData.push(newNote);
    fs.writeFileSync(path.join(__dirname, '\db.json'), JSON.stringify(notesData));
    res.json(newNote);
  });

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);