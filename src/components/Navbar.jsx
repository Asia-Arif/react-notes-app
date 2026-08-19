import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = ({ filter, setFilter, sortBy, setSortBy }) => {

    const navigate = useNavigate();

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {

        const token = localStorage.getItem("token");

        if (token) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }

    }, []);

    const logout = () => {

        localStorage.removeItem("token");

        setIsLoggedIn(false);

        navigate("/");

    };

    return (
       
            <nav className="relative bg-[#F7F7F7] flex justify-center py-[16px] gap-[40px] flex-wrap px-2">


                <input
                    type="text"
                    placeholder="Filter by"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="bg-white p-2"
                />




                <select
                    title="filter"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-white p-2 cursor-pointer"
                >

                    <option value="default">
                        Sort By
                    </option>

                    <option value="alphabets">
                        Alphabets
                    </option>

                    <option value="edited">
                        Last Edited
                    </option>

                    <option value="created">
                        Recently Created
                    </option>

                </select>


        {isLoggedIn && (
                <button
                    onClick={logout}
                    className="bg-[#437993] absolute right-2 text-white px-4 py-2 rounded-[8px]   self-end cursor-pointer"
                >
                    Logout
                </button>
            )}
                </nav>

    );
};

export default Navbar;