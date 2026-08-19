import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {

    

    return (

        <header className="bg-[#437993] flex flex-col text-white p-[11px] ps-[20px] md:ps-[80px] lg:ps-[150px]">

            <h1 className="font-bold text-[36px]">
                Notes App
            </h1>

            <p className="font-light">
                Take Notes and never forget
            </p>

            

        </header>

    );
};

export default Header;