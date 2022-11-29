import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar'
import Dropdown from '../components/Dropdown';
import { Credentials } from '../Credentials';
import axios from 'axios';

const Playlist = () => {

    const spotify = Credentials(); 

    const [token, setToken] = useState("")
    const [playlists, setPlaylists] = useState({selectedPlaylist: '', listOfPlaylists: []});
    const [cover, setCover] = useState("")
    const [tracks, setTracks] = useState([])
    const [recommendations, setRecommendations] = useState([])
    const [coverPending, setCoverPending] = useState(false)
    const [recPending, setRecPending] = useState(false)
    const [playlistOutput, setPlaylistOutput] = useState("")
    const [artist, setArtist] = useState("")

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

    let seedArtists = []
    let seedTracks = []

    if(tracks.data){
        
      for(let i = 0; i < 5; i++){
        seedArtists[i] = tracks.data.items[i].track.artists[0].id //need to make these random
      }

      for(let i = 0; i < 5; i++){
        seedTracks[i] = tracks.data.items[i].track.id //need to make these random
      }
    }
    
    const buttonClicked = e => {
      e.preventDefault();
      setCoverPending(true)
      setRecommendations("")
  
      axios(`https://api.spotify.com/v1/playlists/${playlists.selectedPlaylist}/images`, {
        method: 'GET',
        headers: {
          'Authorization' : 'Bearer ' + token
        }
      })
      .then(coverResponse => {
        setCover(coverResponse)
        setCoverPending(false)
      });

      if(playlists.listOfPlaylists){
        for(let i = 0; i < playlists.listOfPlaylists.length; i++){
          if(playlists.listOfPlaylists[i].id === playlists.selectedPlaylist){
            setPlaylistOutput(playlists.listOfPlaylists[i].name)
          }
        }
      }

      axios(`https://api.spotify.com/v1/playlists/${playlists.selectedPlaylist}/tracks`, {
        method: 'GET',
        headers: {
          'Authorization' : 'Bearer ' + token
        }
      })
      .then(trackResponse => {
        setTracks(trackResponse)
      });

      console.log(seedArtists)

      if(seedArtists){
        axios(`https://api.spotify.com/v1/artists/${seedArtists[0]}`, {
          method: 'GET',
          headers: {
            'Authorization' : 'Bearer ' + token
          }
        })
        .then(artistResponse => {
          setArtist(artistResponse)
        });
        console.log(artist.data.genres)
      }
    }

    const btnClicked = e => {
      e.preventDefault()
      setRecPending(true)

      axios('https://api.spotify.com/v1/recommendations', {
        method: 'GET',
        headers: {
          'Authorization' : 'Bearer ' + token
        },
        params: {
          seed_artists: seedArtists, //array of up to 5 seed artist ids
          // seed_genres: "hip-hop, pop", //array of up to 5 seed genre names. still need to figure out getting playlist genres
          seed_genres: "hip-hop",
          seed_tracks: seedTracks, //array of up to 5 seed track ids
        }
      })
      .then(recResponse => {
        setRecommendations(recResponse)
        setRecPending(false)
      });

      // recommendations.data && console.log(recommendations.data.tracks)
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
            <div className="max-w-[80%] mx-auto my-5 flex">
              <div className="">
                {coverPending && <div>Loading...</div> }
                {!coverPending && cover && <img src={cover.data[0].url} alt="Playlist Cover" />}
                {!coverPending && cover && <p>{playlistOutput}</p>}
                {!coverPending && cover && <button className="bg-black text-[2.118vw] px-[3.125vw] p-[0.313vw] rounded-lg text-white" onClick={btnClicked}>Get Recommendations</button>}
                {recPending && <div>Loading...</div> }
                {!recPending && recommendations.data && <h1 className="text-[30px]">List of Recommended Songs</h1>}
                <div className="grid grid-flow-row grid-cols-2">
                  {!recPending && recommendations.data && recommendations.data.tracks.map((rec) => (
                    <div className="flex items-center mb-5 gap-2" key={idx++}>
                      <img src={rec.album.images[0].url} className="w-[100px] h-[100px]" />
                      <p className="">{rec.name} by {rec.artists[0].name}</p>
                    </div>
                  ))}
                </div>
              </div>
              {/* <div className="">
                <button className="bg-black text-white">Download</button>
              </div> */}
            </div>
      </div>
    )
}

export default Playlist