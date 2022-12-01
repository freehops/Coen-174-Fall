import React, {useState, useEffect} from 'react'
import logo from '../img/logo.png'
import {Link} from 'react-router-dom'
import {Credentials} from "../Credentials"

const Navbar = () => {

    const REDIRECT_URI = "http://localhost:3000/"
    const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
    const RESPONSE_TYPE = "token"
    const spotify = Credentials()

    const [token, setToken] = useState("")

    useEffect(() => {
        const hash = window.location.hash
        let token = window.localStorage.getItem("token")

        if (!token && hash) {
            token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]

            window.location.hash = ""
            window.localStorage.setItem("token", token)
        }

        setToken(token)
    }, [])

    const logout = () => {
        setToken("")
        window.localStorage.removeItem("token")
    }

    return(
        <nav className="bg-black py-[0.781vw]">
            <ul className="flex items-center gap-[4.668vw] mx-[3.906vw]">
                <img src={logo} alt="Spotify logo" className="w-[4.668vw] h-[4.668vw]"/>
                <li className="text-white text-[1.875vw] ml-auto"><Link to="/">HOME</Link></li>
                <li className="text-white text-[1.875vw]"><Link to="/about">ABOUT</Link></li>
                <li className="text-white text-[1.875vw]"><Link to="/contact">CONTACT US</Link></li>
                {!token ?
                    <button className="bg-white text-black text-[2.118vw] px-[3.125vw] p-[0.313vw] rounded-lg">
                        <a href={`${AUTH_ENDPOINT}?client_id=${spotify.ClientId}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>Login</a>
                    </button>
                    : <button className="bg-white text-black text-[2.118vw] px-[3.125vw] p-[0.313vw] rounded-lg" onClick={logout}><Link to="/">Logout</Link></button>}
                {/* <FiMenu color="white" className="w-[3.906vw] h-[3.906vw]"/> */}
            </ul>
        </nav>
    )
}

export default Navbar