import express from "express";
import cors from "cors";

const app = express();

const PORT = 5000;

app.use(cors());
app.use(express.json());
let notes = [];

//get notes 
app.get("/api/notes", (req, res) => {
    res.json(notes);
});

// GET single note
app.get("/api/notes/:id", (req, res) => {
    const note = notes.find((note) => note.id === req.params.id);

    if (!note) {
        return res.status(404).json({
            message: "Note not found"
        });
    }

    res.json(note);
});

// CREATE a new note
app.post("/api/notes", (req, res) => {
    const { title, body } = req.body;

    if (!title || !body) {
        return res.status(400).json({
            message: "Title and body are required"
        });
    }

    const newNote = {
        id: crypto.randomUUID(),
        title,
        body,
        createdAt: Date.now(),
        updatedAt: Date.now()
    };

    notes.push(newNote);

    res.status(201).json(newNote);
});

// Edit notes using PUT
app.put("/api/notes/:id", (req, res) => {
    const { title, body } = req.body;

    const noteIndex = notes.findIndex(
        (note) => note.id === req.params.id
    );

    if (noteIndex === -1) {
        return res.status(404).json({
            message: "Note not found"
        });
    }

    notes[noteIndex] = {
        ...notes[noteIndex],
        title,
        body,
        updatedAt: Date.now()
    };

    res.json(notes[noteIndex]);
});

// DELETE a note
app.delete("/api/notes/:id", (req, res) => {
    const noteExists = notes.some(
        (note) => note.id === req.params.id
    );

    if (!noteExists) {
        return res.status(404).json({
            message: "Note not found"
        });
    }

    notes = notes.filter(
        (note) => note.id !== req.params.id
    );

    res.json({
        message: "Note deleted successfully"
    });
});


// comment app.listen while pushing to github
// app.listen(PORT, () => {
//     console.log(`Server running on http://localhost:${PORT}`);
// });

// uncomment the export
module.exports = app;