const express = require("express");
const fs = require('fs');
const path = require("path");
const {v4: uuidv4} = require("uuid"); //generate unique ids
const app = express();
const PORT = process.env.PORT || 3001;
const cors = require('cors');

//middleware
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static("public"));
app.use(cors());
//routes
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public/index.html')));

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/notes.html'))
);

app.get('/notes', (req, res) => {
    const notesData = JSON.parse(fs.readFileSync(path.join(__dirname, 'db.json')));
    res.json(notesData);
  });

//   app.get("/api/notes", function(req, res) {
//     let db = fs.readFileSync("./db/db.json", "utf8");
//     db = JSON.parse(db);
//     res.json(db);
// });

  app.post('/notes', (req, res) => {
    const newNote = req.body;
    newNote.id = uuidv4(); // Generate a unique ID for the new note
    const notesData = JSON.parse(fs.readFileSync(path.join(__dirname, 'db.json')));
    notesData.push(newNote);
    fs.writeFileSync(path.join(__dirname, 'db.json'), JSON.stringify(notesData));
    res.json(newNote);
  });

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);