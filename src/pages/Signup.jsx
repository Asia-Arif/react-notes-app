import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../lib/config";
import toast from "react-hot-toast";

function Signup() {

    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(()=>{
            const token = localStorage.getItem("token");
            if(token) {
                navigate('/notes')
            }
        },[])

    const signup = async (e) => {

        e.preventDefault();

        console.log("Signup button clicked");

        try {

            const response = await fetch(
                `${BASE_URL}/api/auth/signup`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        username,
                        email,
                        password
                    })
                }
            );

            const data = await response.json();

            console.log("Response:", data);

            if (!response.ok) {
                toast.error(data.message);
                return;
            }

            toast.success("Signup successful!");

            navigate("/login");

        } catch (error) {

            console.log("Error:", error);
            toast.error("Something went wrong");

        }
    };

    return (
        <div className="flex justify-center items-center mt-[90px]">

            <form
                onSubmit={signup}
                className="w-[350px] flex flex-col gap-[15px] rounded-[10px]"
            >

                <h2 className="text-2xl font-bold text-center">
                    Sign Up
                </h2>

                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="border p-[12px] rounded-[8px]"
                />

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border p-[12px] rounded-[8px]"
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border p-[12px] rounded-[8px]"
                />

                <button
                    type="submit"
                    className="bg-[#437993] p-[12px] rounded-[8px] text-white cursor-pointer hover:opacity-[0.9]"
                >
                    Sign Up
                </button>

                <p className="text-center">
                    Already have an account?{" "}

                    <Link
                        to="/"
                        className="text-[#437993] font-bold"
                    >
                        Login
                    </Link>
                </p>

            </form>

        </div>
    );
}

export default Signup;