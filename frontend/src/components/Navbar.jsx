import { useState, useEffect } from "react";

function Navbar() {


    return (
        <>
            <div className="bg-white text-[#121212]">
                <ul className="flex flex-row justify-around h-full items-center">
                    <a className="transition-colors hover:bg-neutral-200 font-semibold text-xl pt-6 pb-6 flex-1 text-center" href="/">
                        <li>Home</li>
                    </a>
                    <a className="transition-colors hover:bg-neutral-200 font-semibold text-xl pt-6 pb-6 flex-1 text-center" href="/about">
                        <li>About</li>
                    </a>
                    <a className="transition-colors hover:bg-neutral-200 font-semibold text-xl pt-6 pb-6 flex-1 text-center" href="/contact">
                        <li>Contact</li>
                    </a>
                </ul>
            </div>
        </>
    )
}

export default Navbar