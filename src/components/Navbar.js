import React from 'react'
import {FiMenu} from 'react-icons/fi'
import logo from '../img/spotify-logo.png'
import {Link} from 'react-router-dom'

const Navbar = () => {
    return(
        <nav className="bg-black py-[0.781vw]">
            <ul className="flex items-center gap-[4.668vw] mx-[3.906vw]">
                <img src={logo} alt="Spotify logo" className="w-[4.668vw] h-[4.668vw]"/>
                <li className="text-white text-[1.875vw] ml-auto"><Link to="/">HOME</Link></li>
                <li className="text-white text-[1.875vw]"><Link to="/about">ABOUT</Link></li>
                <li className="text-white text-[1.875vw]"><Link to="/contact">CONTACT US</Link></li>
                <FiMenu color="white" className="w-[3.906vw] h-[3.906vw]"/>
            </ul>
        </nav>
    )
}

export default Navbar