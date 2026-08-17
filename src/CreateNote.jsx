import Header from "./components/Header";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { BASE_URL } from "./lib/config";

const CreateNote = () => {

    const navigate = useNavigate();

    const [searchParams] = useSearchParams();

    const noteId = searchParams.get("id");

    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");



    useEffect(() => {

        if (noteId) {

            const getNote = async () => {

                try {

                    const response = await fetch(
                        `${BASE_URL}/api/notes/${noteId}`
                    );

                    const data = await response.json();

                    if (!response.ok) {
                        alert(data.message);
                        return;
                    }

                    setTitle(data.title);
                    setBody(data.body);

                } catch (error) {

                    console.log("Error:", error);

                }

            };

            getNote();
        }

    }, [noteId]);


    // ADD NOTE
    const addNote = async () => {

        try {

            const response = await fetch(
                "${BASE_URL}/api/notes",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        title: title,
                        body: body
                    })
                }
            );


            const data = await response.json();


            if (!response.ok) {

                alert(data.message);
                return;

            }


            console.log("Note added:", data);

            navigate("/");


        } catch (error) {

            console.log("Error:", error);

        }

    };


    // UPDATE NOTE
    const updateNote = async () => {

        try {

            const response = await fetch(
                `${BASE_URL}/api/notes/${noteId}`,
                {
                    method: "PUT",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        title: title,
                        body: body
                    })
                }
            );


            const data = await response.json();


            if (!response.ok) {

                alert(data.message);
                return;

            }


            console.log("Note updated:", data);

            navigate("/");


        } catch (error) {

            console.log("Error:", error);

        }

    };


    // delte notes 
    const deleteNote = async () => {

        const confirmDelete = window.confirm(
            "You want to delete this note?"
        );


        if (!confirmDelete) {
            return;
        }


        try {

            const response = await fetch(
                `${BASE_URL}/api/notes/${noteId}`,
                {
                    method: "DELETE"
                }
            );


            const data = await response.json();


            if (!response.ok) {

                alert(data.message);
                return;

            }


            console.log("Note deleted:", data);

            navigate("/");


        } catch (error) {

            console.log("Error:", error);

        }

    };


    return (
        <div>

            <Header />


            <nav className="text-[18px] bg-[#F7F7F7] py-4">

                <div className="max-w-[700px] w-full mx-auto hover:text-[#437993]">

                    <Link to="/">
                        Home
                    </Link>

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

                        {!noteId && (

                            <button
                                onClick={addNote}
                                className="bg-[#437993] p-[12px] rounded-[8px] cursor-pointer hover:opacity-[0.9] mt-[12px] text-white"
                            >
                                Add Notes
                            </button>

                        )}


                        {noteId && (

                            <div className="flex justify-between">
                                <button
                                    onClick={updateNote}
                                    className="bg-[#437993] p-[12px] rounded-[8px] cursor-pointer hover:opacity-[0.9] mt-[12px] text-white"
                                >
                                    Update
                                </button>
                                <button
                                    onClick={deleteNote}
                                    className="bg-[#437993] p-[12px] rounded-[8px] cursor-pointer hover:opacity-[0.9] mt-[12px] text-white"
                                >
                                    Delete
                                </button>

                            </div>

                        )}

                    </div>

                </div>

            </main>

        </div>
    );
};

export default CreateNote;