const router = require('express').Router();
const db = require('../db/db.json');
const fs = require('fs');
const util = require('util');
const uuid = require('uuid');
const { response } = require('express');
// const readFile = util.promisify(fs.readFile);
// const writeFile = util.promisify(fs.writeFile);


router.get('/notes', (req, res) => {
    const notes = fs.readFileSync(db, "utf-8");
    notes.then(response => {
        console.log(response);
    })
});

router.get('/api/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'));
});

router.post('/api/notes', (req, res) => {
    const pathToNotes = json.parse(fs.readFileSync('../db/db.json'));
    const makeNewNote = req.body;
    makeNewNote.id = uuid.v1();
    pathToNotes.push(makeNewNote);
    fs.writeFileSync('../db/db.json', json.stringify(pathToNotes));
    res.json(pathToNotes);
});

module.exports = router;