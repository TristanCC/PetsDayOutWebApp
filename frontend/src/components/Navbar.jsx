import { useState, useEffect } from "react";
import {Link} from 'react-aria-components';

function Navbar() {


    return (
        <>
            <div className="bg-white text-[#121212]">
                <ul className="flex flex-row justify-around h-full items-center">
                    <li><Link href="/">Home</Link></li>
                </ul>
            </div>
        </>
    )
}

export default Navbar