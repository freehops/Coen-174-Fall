import React from 'react'
import Navbar from '../components/Navbar'
import boygirl from '../img/pexels-ron-lach-9654034.jpg'
import phone from '../img/pexels-cottonbro-5077407.jpg'
import manwoman from '../img/pexels-pavel-danilyuk-8001234.jpg'
import {Credentials} from "../Credentials"

const REDIRECT_URI = "https://freehops.github.io/Coen-174-Fall/"
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
const RESPONSE_TYPE = "token"
const spotify = Credentials()

const Home = () => {
    return(
        <div className="">
            <Navbar/>
            <div className="bg-gray-400 py-[11.719vw]">
                <h1 className="text-center text-[4.375vw] font-bold mb-[1.563vw]">Welcome to the Spotify Pact</h1>
                <p className="text-center text-[1.875vw]">Making connections with others through music you love</p>
                <div className="flex justify-center mt-[4.668vw]">
                    <button className="bg-black text-[2.118vw] px-[3.125vw] p-[0.313vw] rounded-lg text-white">
                    <a href={`${AUTH_ENDPOINT}?client_id=${spotify.ClientId}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>Start!</a>
                    </button>
                </div>
            </div>
            <div className="py-[3.906vw] mx-[3.906vw]">
                <h1 className="text-center text-[4.375vw] font-bold mb-[6.25vw]">What is the Spotify Pact?</h1>
                <div className="grid grid-cols-3 justify-items-center gap-x-[3.906vw] gap-y-[2.334vw]">
                        <img className="w-[27.5vw] h-[16.25vw]" src={boygirl} alt="boy and girl"/>
                        <img className="w-[27.5vw] h-[16.25vw]" src={phone} alt="phone"/>
                        <img className="w-[27.5vw] h-[16.25vw]" src={manwoman} alt="man and woman"/>
                        <p className="text-[1.875vw]">Our app generates a playlist of music recommendations based on artists and genres you listen to the most, and links you to other Spotify profiles who listen to similar music to you.</p>
                        <p className="text-[1.875vw]">Just log on to Spotify and select your playlist, and we'll hook you up with new connections and similar music.</p>
                        <p className="text-[1.875vw]">Using the Spotify Pact, you can listen to more of the music you love, find new favorites with ease, and match yourself with other users, all just with a few clicks.</p>
                </div>
            </div>
            <div className="m-[3.906vw]">
                <h1 className="text-center text-[4.375vw] font-bold mb-[2.334vw]">Have Questions?</h1>
                <form className="flex flex-col">
                    <label className="text-[1.875vw]">Name</label>
                    <input className="border-2 border-gray-400 mb-[1.563vw] text-[1.875vw]" type="text"></input>
                    <label className="text-[1.875vw]">Email</label>
                    <input className="border-2 border-gray-400 mb-[1.563vw] text-[1.875vw]" type="email"></input>
                    <label className="text-[1.875vw]">Message</label>
                    <textarea className="border-2 border-gray-400 text-[1.875vw]" rows="5" id="text"></textarea>
                    <div className="flex justify-center mt-[2.5vw]">
                        <button className="bg-black text-[2.118vw] px-[3.125vw] p-[0.313vw] rounded-lg text-white">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Home
