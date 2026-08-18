import "dotenv/config"; 
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import Note from "./models/Note.js";

const app = express();

const PORT = 5000;

//connection
const MONGO_URI = process.env.MONGO_URI;
mongoose.connect(MONGO_URI)
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((error) => {
        console.error("MongoDB connection failed:", error);
    });

app.use(cors());
app.use(express.json());


//get notes 
app.get("/api/notes", async (req, res) => {
    try {
        const notes = await Note.find();

        res.json(notes);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});
// GET single note
app.get("/api/notes/:id", async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).json({
                message: "Note not found"
            });
        }
        res.json(note);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

// CREATE a new note
app.post("/api/notes", async (req, res) => {
    try {
        const { title, body } = req.body;

        if (!title || !body) {
            return res.status(400).json({
                message: "Title and body are required"
            });
        }

        const newNote = new Note({
            title,
            body
        });

        const savedNote = await newNote.save();

        res.status(201).json(savedNote);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

// Edit notes using PUT
app.put("/api/notes/:id", async (req, res) => {
    try {
        const { title, body } = req.body;

        const updatedNote = await Note.findByIdAndUpdate(
            req.params.id,
            {
                title,
                body
            },
            {
                new: true,
                runValidators: true
            }
        );

        if (!updatedNote) {
            return res.status(404).json({
                message: "Note not found"
            });
        }

        res.json(updatedNote);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

// DELETE a note
app.delete("/api/notes/:id", async (req, res) => {
    try {
        const deletedNote = await Note.findByIdAndDelete(
            req.params.id
        );
        if (!deletedNote) {
            return res.status(404).json({
                message: "Note not found"
            });
        }

        res.json({
            message: "Note deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});


// comment app.listen while pushing to github
// app.listen(PORT, () => {
//     console.log(`Server running on http://localhost:${PORT}`);
// });

// uncomment the export
// module.exports = app;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});