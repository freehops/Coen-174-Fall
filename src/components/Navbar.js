import React from 'react'
import {FiMenu} from 'react-icons/fi'
import logo from '../img/spotify-logo.png'

const Navbar = () => {
    return(
        <div className="bg-black pt-[10px] pb-[10px]">
            <div className="flex items-center gap-[60px] ml-[50px] mr-[50px]">
                <img src={logo} className="w-[60px] h-[60px]"/>
                <p className="text-white ml-auto"><a href="/">HOME</a></p>
                <p className="text-white"><a href="/about">ABOUT</a></p>
                <p className="text-white"><a href="/contact">CONTACT US</a></p>
                <FiMenu color="white" className="w-[50px] h-[50px]"/>
            </div>
        </div>
    )
}

export default Navbar