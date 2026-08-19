import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../lib/config";
import toast from "react-hot-toast";

function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    useEffect(()=>{
        const token = localStorage.getItem("token");
        if(token) {
            navigate('/notes')
        }
    },[])

    const login = async (e) => {

        e.preventDefault();

        try {

            const response = await fetch(
                `${BASE_URL}/api/auth/login`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
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

            // Save JWT token
            localStorage.setItem("token", data.token);

            toast.success("Login successful!");

            navigate("/notes");

        } catch (error) {

            console.log("Error:", error);
            toast.error("Something went wrong");

        }
    };

    return (
        <div className="flex justify-center items-center mt-[90px]">

            <form
                onSubmit={login}
                className="w-[350px] flex flex-col gap-[15px] rounded-[10px]"
            >

                <h2 className="text-2xl font-bold text-center">
                    Login
                </h2>

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
                    Login
                </button>

                <p className="text-center">
                    Don't have an account?{" "}

                    <Link
                        to="/signup"
                        className="text-[#437993] font-bold"
                    >
                        Sign Up
                    </Link>
                </p>

            </form>

        </div>
    );
}

export default Login;