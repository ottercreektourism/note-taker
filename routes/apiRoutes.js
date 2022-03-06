const router = require('express').Router();
const db = require('../db/db.json');
const fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);


router.get('/notes', (req, res) => {
    const notes = readFile(db, "utf-8");
    notes.then(response => {
        console.log(response);
    })
});

module.exports = router;