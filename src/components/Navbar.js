import React from 'react'
import {FiMenu} from 'react-icons/fi'
import logo from '../img/spotify-logo.png'

const Navbar = () => {
    return(
        <div className="bg-black py-[0.781vw]">
            <div className="flex items-center gap-[4.668vw] mx-[3.906vw]">
                <img src={logo} className="w-[4.668vw] h-[4.668vw]"/>
                <p className="text-white text-[1.875vw] ml-auto"><a href="/">HOME</a></p>
                <p className="text-white text-[1.875vw]"><a href="/about">ABOUT</a></p>
                <p className="text-white text-[1.875vw]"><a href="/contact">CONTACT US</a></p>
                <FiMenu color="white" className="w-[3.906vw] h-[3.906vw]"/>
            </div>
        </div>
    )
}

export default Navbar