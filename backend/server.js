import "dotenv/config";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import Note from "./models/Note.js";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "./models/User.js";

const app = express();

const PORT = 5000;


const authMiddleware = (req, res, next) => {
    try {

        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                message: "Unauthorized"
            });
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.userId = decoded.userId;

        next();

    } catch (error) {

        return res.status(401).json({
            message: "Invalid or expired token"
        });

    }
};

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

// SIGNUP
app.post("/api/auth/signup", async (req, res) => {
    try {

        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({
                message: "Username, email and password are required"
            });
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "Email already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            username,
            email,
            password: hashedPassword
        });

        await user.save();

        res.status(201).json({
            message: "Signup successful"
        });

    } catch (error) {

        console.log("Signup Error:", error);

        res.status(500).json({
            message: error.message
        });

    }
});


// LOGIN
app.post("/api/auth/login", async (req, res) => {
    try {

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required"
            });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        const isPasswordCorrect = await bcrypt.compare(
            password,
            user.password
        );

        if (!isPasswordCorrect) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        const token = jwt.sign(
            {
                userId: user._id
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );

        res.json({
            message: "Login successful",
            token
        });

    } catch (error) {

        console.log("Login Error:", error);

        res.status(500).json({
            message: error.message
        });

    }
});


//get notes 
app.get("/api/notes", authMiddleware, async (req, res) => {
    try {

        const notes = await Note.find({
            user: req.userId
        });

        res.json(notes);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
});
// GET single note
app.get("/api/notes/:id", authMiddleware, async (req, res) => {
    try {

        const note = await Note.findOne({
            _id: req.params.id,
            user: req.userId
        });

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
app.post("/api/notes", authMiddleware, async (req, res) => {
    try {
        const { title, body } = req.body;

        if (!title || !body) {
            return res.status(400).json({
                message: "Title and body are required"
            });
        }

        const newNote = new Note({
            title,
            body,
            user: req.userId
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
app.put("/api/notes/:id", authMiddleware, async (req, res) => {
    try {
        const { title, body } = req.body;

        const updatedNote = await Note.findOneAndUpdate(
            {
                _id: req.params.id,
                user: req.userId
            },
            {
                title,
                body
            },
            {
                returnDocument: "after",
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
app.delete("/api/notes/:id", authMiddleware, async (req, res) => {
    try {
        const deletedNote = await Note.findOneAndDelete({
            _id: req.params.id,
            user: req.userId
        });
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