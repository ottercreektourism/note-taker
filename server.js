// requirements
const express = require("express");
const path = require("path");
const fs = require("fs");
const uuid = require("uuid");
const router = require("express").Router();

// create the express server and port
const PORT = process.env.PORT || 8080;
const app = express();

// parse incoming json data
app.use(express.json());

// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));

// make public folder static
app.use(express.static("public"));


// Port listening
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

// GET route for homepage
app.get("/", (req, res) => res.sendFile(__dirname, "./public/index.html"));

// GET route for notes page
app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "./public/notes.html"))
);

// GET for api routes
app.get("/api/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./db/db.json"));
});



// GET for notes on the main page
app.get("/notes", (req, res) => {
  const notes = fs.readFileSync("./db/db.json", "utf-8");
  notes.then((response) => {
    console.log(response);
  });
});


// POST to make new note
app.post("/api/notes", (req, res) => {
  const pathToNotes = JSON.parse(fs.readFileSync("./db/db.json"));
  const makeNewNote = req.body;
  makeNewNote.id = uuid.v1();
  pathToNotes.push(makeNewNote);
  fs.writeFileSync("./db/db.json", JSON.stringify(pathToNotes));
  res.json(pathToNotes);
});

// DELETE for each individual note by id
app.delete("/api/notes/:id", (req, res) => {
  fs.readFile("./db/db.json", "utf8", (err, data) => {
    if (err) {
      console.log("Error");
    }
    const database = JSON.parse(data).filter(
      (note) => note.id !== req.params.id
    );

    fs.writeFile("./db/db.json", JSON.stringify(database), (err) => {
      if (err) {
        return console.log(err);
      }
      console.log("Note was deleted.");
    });
    res.send("Your note was deleted!");
  });
});
