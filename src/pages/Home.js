import React from 'react'
import Navbar from '../components/Navbar'

const Home = () => {
    return(
        <div>
            <Navbar/>
            <div className="bg-gray-400 py-[150px]">
                <h1 className="text-center text-[56px] font-bold mb-[20px]">Welcome to the Spotify Pact</h1>
                <p className="text-center text-[24px]">Making connections with others through music you love</p>
                <div className="flex justify-center mt-[60px]">
                    <button className="bg-black text-[28px] px-10 p-1 rounded-lg text-white">Start!</button>
                </div>
            </div>
            <div className="py-[50px] mx-[50px]">
                <h1 className="text-center text-[56px] font-bold mb-[80px]">What is the Spotify Pact?</h1>
                <div className="grid grid-cols-3 justify-items-center gap-x-[50px] gap-y-[30px]">
                        <img src=""/>
                        <img src=""/>
                        <img src=""/>
                        <p>Our app generates a playlist of music recommendations based on artists and genres you listen to the most, and links you to other Spotify profiles who listen to similar music to you.</p>
                        <p>Just log on to Spotify and select your playlist, and we'll hook you up with new connections and similar music.</p>
                        <p>Using the Spotify Pact, you can listen to more of the music you love, find new favorites with ease, and match yourself with other users, all just with a few clicks.</p>
                </div>
            </div>
            <div className="m-[50px]">
                <h1 className="text-center text-[56px] font-bold mb-[80px]">Have Questions?</h1>
                <form className="flex flex-col">
                    <label>Name</label>
                    <input className="border-2 border-gray-400 mb-[20px]" type="text"></input>
                    <label>Email</label>
                    <input className="border-2 border-gray-400 mb-[20px]" type="email"></input>
                    <label>Name</label>
                    <textarea className="border-2 border-gray-400" rows="5" id="text"></textarea>
                </form>
            </div>
        </div>
    )
}

export default Home