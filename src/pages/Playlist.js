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
    const [tracks, setTracks] = useState([])
    const [recommendations, setRecommendations] = useState([])
    const [isPending, setIsPending] = useState(false)

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
            selectedPlaylist: playlists.selectedPlaylist,
            listOfPlaylists: playlistResponse.data.items
          })
        });
      
    }, [playlists.selectedPlaylist, spotify.ClientId, spotify.ClientSecret])

    const playlistChanged = val => {
      setPlaylists({
        selectedPlaylist: val,
        listOfPlaylists: playlists.listOfPlaylists
      });
    }
    
    const buttonClicked = e => {
      e.preventDefault();
      setIsPending(true)
  
      axios(`https://api.spotify.com/v1/playlists/${playlists.selectedPlaylist}/images`, {
        method: 'GET',
        headers: {
          'Authorization' : 'Bearer ' + token
        }
      })
      .then(coverResponse => {
        setCover(coverResponse)
      });

      axios(`https://api.spotify.com/v1/playlists/${playlists.selectedPlaylist}/tracks`, {
        method: 'GET',
        headers: {
          'Authorization' : 'Bearer ' + token
        }
      })
      .then(trackResponse => {
        setTracks(trackResponse)
      });

      let seedArtists = []
      let seedTracks = []

      if(tracks.data){
        
        for(let i = 0; i < 5; i++){
          seedArtists[i] = tracks.data.items[i].track.artists[0].id
        }

        for(let i = 0; i < 5; i++){
          seedTracks[i] = tracks.data.items[i].track.id
        }
      }

      //track ids
      // for(let i = 0; i < tracks.data.items.length; i++){
      //   console.log(tracks.data.items[i].track.id)
      // }

      // artist ids
      // console.log(tracks.data.items[0].track.artists[0].id)
      
      // for(let i = 0; i < tracks.data.items.length; i++){
      //   for(let j = 0; j < tracks.data.items[i].track.artists.length; j++){
      //     console.log(tracks.data.items[i].track.artists[j].name)
      //   }
      // }

      axios('https://api.spotify.com/v1/recommendations', {
        method: 'GET',
        headers: {
          'Authorization' : 'Bearer ' + token
        },
        params: {
          seed_artists: seedArtists, //array of up to 5 seed artist ids
          seed_genres: "hip-hop, pop", //array of up to 5 seed genre names
          seed_tracks: seedTracks, //array of up to 5 seed track ids
        }
      })
      .then(recResponse => {
        setRecommendations(recResponse)
        setIsPending(false)
      });

      recommendations.data && console.log(recommendations.data.tracks)

    }
    let idx=0;

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
            {isPending && <div>Loading...</div> }
            {!isPending && cover && <img src={cover.data[0].url} alt="Playlist Cover" />}
            {recommendations.data && recommendations.data.tracks.map((rec) => (
              <div key={idx++}>
                <p>{rec.name}</p>
              </div>
            ))}
            {/* <p>{!isPending && recommendations.data && recommendations.data.tracks[0].name}</p> */}
      </div>
    )
}

export default Playlist