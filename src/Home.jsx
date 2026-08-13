import Header from "./components/Header";
import Navbar from "./components/Navbar";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Home = () => {

    const navigate = useNavigate()

    const [notes] = useState(
        JSON.parse(localStorage.getItem("notes")) || []
    );

    const createNote = () => {
        navigate('/create')
    };

    return (
        <div>

            <Header />

            <Navbar />

            <button
                onClick={createNote}
                className="bg-[#437993] p-[20px] rounded-[8px] text-white cursor-pointer fixed bottom-6 right-6 hover:opacity-[0.9]"
            >
                Create New Note
            </button>

            <div className="flex flex-col justify-center items-center mt-[30px] px-[10px]">

                {notes.map((note) => (

                    <div
                        key={note.id}
                        className="bg-[#F7F7F7] p-5 mb-4 rounded-[5px] max-w-[700px] w-full cursor-pointer"
                    >

                        <p className="text-[20px] ">
                            {note.title}
                        </p>

                        <p className="mt-2">
                            {note.body}
                        </p>

                        <p className="mt-2 text-sm text-gray-500">
                            {new Date(note.createdAt).toLocaleTimeString(
                                "en-US",
                                {
                                    year: "numeric",
                                    month: "numeric",
                                    day: "numeric",
                                    hour: "numeric",
                                    minute: "2-digit",
                                    hour12: true
                                }
                            )}
                        </p>

                    </div>

                ))}

            </div>

        </div>
    );
};

export default Home;