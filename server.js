var express = require("express");
var path = require("path");
var notes = require("./db/db.json")
var fs = require("fs")
console.log(notes)
    // Sets up the Express App
    // =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'))


// Routes
// =============================================================
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/notes.html"))
})

app.get("/api/notes", (req, res) => {
    res.json(notes)
})
app.post("/api/notes", (req, res) => {
    var newNote = req.body
    if (notes.length === 0) {
        newNote.id = 1
    } else {
        newNote.id = notes[notes.length - 1].id + 1
    }
    console.log(req.body)
    notes.push(newNote)
    fs.writeFile('./db/db.json', JSON.stringify(notes), err => {
        if (err) throw err
        res.sendStatus(200)
    })
})
app.delete("/api/notes/:id", (req, res) => {
        var id = req.params.id
        notes = notes.filter(note => note.id !== parseInt(id))
        console.log(notes)
        fs.writeFile('./db/db.json', JSON.stringify(notes), err => {
            if (err) throw err
            res.sendStatus(200)
        })
    })
    // Starts the server to begin listening
    // =============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});