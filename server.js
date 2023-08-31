const express = require("express");
const notes = require("notes");
const app = express();
const PORT = 3001;

//middleware pointing to public folder
app.use(express.static("public"));
app.get('/', (req, res) => res.send('Navigate to /notes'));

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/notes.html'))
);

app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);