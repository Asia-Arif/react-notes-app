import Header from "../components/Header";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { BASE_URL } from "../lib/config";

const Home = () => {

    const navigate = useNavigate();


    const [notes, setNotes] = useState([]);

    const [filter, setFilter] = useState("");

    const [sortBy, setSortBy] = useState("default");




    // GET NOTES FROM BACKEND
  useEffect(() => {

    const getNotes = async () => {

        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/");
            return;
        }

        try {

            const response = await fetch(
                `${BASE_URL}/api/notes`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const data = await response.json();

            if (!response.ok) {

                console.log(data.message);

                if (response.status === 401) {
                    localStorage.removeItem("token");
                    navigate("/");
                }

                return;
            }

            setNotes(data);

        } catch (error) {

            console.log("Error:", error);

        }

    };

    getNotes();

}, [navigate]);


    const createNote = () => {

        navigate("/create");

    };


    const openNote = (id) => {

        navigate(`/create?id=${id}`);

    };

    // useEffect(() => {

    //     if(filter.trim() === '') return;

    //     const filteredNotes = notes.filter((note) =>

    //         note.title.toLowerCase().includes(
    //             filter.toLowerCase()
    //         ) || note.body.toLowerCase().includes(
    //             filter.toLowerCase()
    //         )

    //     );
    //     setNotes(filteredNotes)
    // }, [filter])



    // useEffect(() => {
    //     console.log(sortBy)
    //     const sortedNotes = [...notes].sort((a, b) => {

    //         if (sortBy === "alphabets") {

    //             return a.title.localeCompare(b.title);

    //         }


    //         if (sortBy === "edited") {

    //             return b.updatedAt - a.updatedAt;

    //         }



    //         return b.createdAt - a.createdAt;


    //     });

    //     setNotes(sortedNotes)
    // }, [sortBy])





    const displayNotes = [...notes]
        .filter((note) =>
            note.title.toLowerCase().includes(filter.toLowerCase()) ||
            note.body.toLowerCase().includes(filter.toLowerCase())
        )
        .sort((a, b) => {

            if (sortBy === "alphabets") {
                return a.title.localeCompare(b.title);
            }

            if (sortBy === "edited") {
                return new Date(b.updatedAt) - new Date(a.updatedAt);
            }

            if (sortBy === "created") {
                return new Date(b.createdAt) - new Date(a.createdAt);
            }

            return 0;
        });


    return (

        <div>

            <Navbar
                filter={filter}
                setFilter={setFilter}
                sortBy={sortBy}
                setSortBy={setSortBy}
            />


            <button
                onClick={createNote}
                className="bg-[#437993] p-[20px] rounded-[8px] text-white cursor-pointer fixed bottom-6 right-6 hover:opacity-[0.9]"
            >
                Create New Note
            </button>
            <div className="flex flex-col justify-center items-center mt-[30px] px-[10px]">

                {displayNotes.map((note) => (
                    <div
                        key={note._id}
                        onClick={() => openNote(note._id)}
                        className="bg-[#F7F7F7] p-5 mb-4 rounded-[5px] max-w-[700px] w-full cursor-pointer"
                    >

                        <p className="text-[20px]">
                            {note.title}
                        </p>
                        <p className="mt-2">
                            {note.body}
                        </p>
                        <p className="mt-2 text-sm text-gray-500">
                            {new Date(
                                note.createdAt
                            ).toLocaleTimeString(
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