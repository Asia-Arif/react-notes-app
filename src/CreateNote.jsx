import Header from "./components/Header";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const CreateNote = () => {

    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");

    const addNote = () => {

        // if (!title.trim() || !body.trim()) {
        //     alert("Please enter title and body");
        //     return;
        // }

        const notes = JSON.parse(localStorage.getItem("notes")) || [];

        const newNote = {
            id: crypto.randomUUID(),
            title: title,
            body: body,
            createdAt: Date.now(),
            updatedAt: Date.now()
        };

        notes.push(newNote);

        localStorage.setItem("notes", JSON.stringify(notes));

        history.push("/");
    };

    return (
        <div>

            <Header />

            <nav className="text-[18px] bg-[#F7F7F7] py-4">
                <div className="max-w-[700px] w-full mx-auto hover:text-[#437993]">
                    <Link to="/">Home</Link>
                </div>
            </nav>

            <main className="flex flex-col gap-[16px] mt-[16px]">

                <div className="flex justify-center flex-col gap-[16px]">

                    <input
                        type="text"
                        placeholder="Type Your Notes Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="bg-[#F7F7F7] p-3 w-full max-w-[700px] text-[20px] mx-auto"
                    />

                    <textarea
                        placeholder="Type Your Notes Body"
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        className="bg-[#F7F7F7] p-[12px] max-w-[700px] w-full text-[20px] mx-auto"
                    ></textarea>

                    <div className="max-w-[700px] w-full mx-auto">

                        <button
                            onClick={addNote}
                            className="bg-[#437993] p-[12px] rounded-[8px] cursor-pointer hover:opacity-[0.9] mt-[12px] text-white"
                        >
                            Add Notes
                        </button>

                    </div>

                </div>

            </main>

        </div>
    );
};

export default CreateNote;