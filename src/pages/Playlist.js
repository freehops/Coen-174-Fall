import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar'
import Dropdown from '../components/Dropdown';
import Listbox from '../Listbox';
import Detail from '../Detail';
import { Credentials } from '../Credentials';
import axios from 'axios';

const Playlist = () => {

    const spotify = Credentials(); 

    const [token, setToken] = useState("")
    const [playlists, setPlaylists] = useState({selectedPlaylist: '', listOfPlaylists: []});
    const [cover, setCover] = useState("")

    useEffect(() => {
      const hash = window.location.hash
      let token = window.localStorage.getItem("token")

      if (!token && hash) {
          token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]
          window.location.hash = ""
          window.localStorage.setItem("token", token)
        }

      setToken(token)

      axios('https://api.spotify.com/v1/me/playlists', {
          method: 'GET',
          headers: { 'Authorization' : 'Bearer ' + token}
        })
        .then (playlistResponse => {        
          setPlaylists({
            selctedPlaylist: playlists.selectedPlaylist,
            listOfPlaylists: playlistResponse.data.items
          })
        });
    }, [playlists.selectedPlaylist])

    const playlistChanged = val => {
      console.log(val);
      setPlaylists({
        selectedPlaylist: val,
        listOfPlaylists: playlists.listOfPlaylists
      });
    }
    
    const buttonClicked = e => {
      e.preventDefault();
  
      axios(`https://api.spotify.com/v1/playlists/${playlists.selectedPlaylist}/images`, {
        method: 'GET',
        headers: {
          'Authorization' : 'Bearer ' + token
        }
      })
      .then(coverResponse => {
        console.log(coverResponse)
        setCover(coverResponse)
      });
    }

    return(
        <div className="">
            <Navbar/>
            <div className="bg-black bg-opacity-90 py-[3.906vw] px-[3.906vw]">
              <h1 className="text-white text-[4.375vw] font-bold mb-[1.563vw]">Time to Submit Your Playlist</h1>
              <form className="flex items-center gap-10" onSubmit={buttonClicked}>
                <Dropdown
                  options={playlists.listOfPlaylists} 
                  selectedValue={playlists.selectedPlaylist} 
                  changed={playlistChanged}
                />
                <button className="bg-white text-[2.118vw] px-[3.125vw] p-[0.313vw] rounded-lg text-black" type={"submit"}>Submit</button>
              </form>
            </div>
      </div>
    )
}

export default Playlist