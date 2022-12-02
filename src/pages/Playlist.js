import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar'
import Dropdown from '../components/Dropdown';
import { Credentials } from '../Credentials';
import axios from 'axios';
import newPlaylist from '../img/newPlaylist.png'

const Playlist = () => {

  const spotify = Credentials();

  const [token, setToken] = useState("")
  const [playlists, setPlaylists] = useState({ selectedPlaylist: '', listOfPlaylists: [] });
  const [cover, setCover] = useState("")
  const [tracks, setTracks] = useState([])
  const [recommendations, setRecommendations] = useState([])
  const [coverPending, setCoverPending] = useState(false)
  const [recPending, setRecPending] = useState(false)
  const [recLoaded, setRecLoaded] = useState(false)
  const [playlistOutput, setPlaylistOutput] = useState("")
  const [artist1, setArtist1] = useState("")
  const [artist2, setArtist2] = useState("")
  const [artist3, setArtist3] = useState("")
  const [artist4, setArtist4] = useState("")
  const [artist5, setArtist5] = useState("")
  const [user, setUser] = useState("")
  const [seed, setSeed] = useState([])

  function indexOfMax(arr) {
    if (arr.length === 0) {
      return -1;
    }

    var max = arr[0];
    var maxIndex = 0;

    for (var i = 1; i < arr.length; i++) {
      if (arr[i] > max) {
        maxIndex = i;
        max = arr[i];
      }
    }

    return maxIndex;
  }

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
      headers: { 'Authorization': 'Bearer ' + token }
    })
      .then(playlistResponse => {
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
    setCoverPending(true)
    setRecommendations("")
    setRecLoaded(false)

    axios('https://api.spotify.com/v1/me', {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
      .then(userResponse => {
        setUser(userResponse.data.display_name)
      });

    axios(`https://api.spotify.com/v1/playlists/${playlists.selectedPlaylist}/images`, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
      .then(coverResponse => {
        setCover(coverResponse)
        setCoverPending(false)
      });

    if (playlists.listOfPlaylists) {
      for (let i = 0; i < playlists.listOfPlaylists.length; i++) {
        if (playlists.listOfPlaylists[i].id === playlists.selectedPlaylist) {
          setPlaylistOutput(playlists.listOfPlaylists[i].name)
        }
      }
    }

    axios(`https://api.spotify.com/v1/playlists/${playlists.selectedPlaylist}/tracks`, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
      .then(trackResponse => {
        setTracks(trackResponse)
      });
  }

  const btnClicked = e => {
    e.preventDefault()
    setRecPending(true)

    let allArtists = []
    let seedArtists = []
    let seedTracks = []
    let seedGenres = ""
    const playlistLength = tracks.data.items.length;

    if (tracks.data) {

      // get all artists, namely the first one listed on track
      for (let i = 0; i < playlistLength; i++) {
        allArtists[i] = tracks.data.items[i].track.artists[0].id
      }
      allArtists.sort();
      // after sorting, count ocurrences for each
      let arrayCount = Array(playlistLength).fill(0)
      let i = 0, j = 0;
      while (j < playlistLength) {
        while (allArtists[i] == allArtists[j]) {
          arrayCount[i]++;
          j++;
        }
        i = j;
      }
      // now, get and store 5 most ocurring items, return them
      for (let i = 0; i < 5; i++) {
        let idx = indexOfMax(arrayCount);
        seedArtists[i] = allArtists[idx];
        arrayCount[idx] = 0;
      }
      console.log(seedArtists);

      // randomly selecting 5 seedTracks
      for (let i = 0; i < 5; i++) {
        let idx = Math.floor(Math.random() * playlistLength);
        seedTracks[i] = tracks.data.items[idx].track.id;
      }
    }

    let allGenres = Array(25).fill("");
    let genreCount = 0;
    
    let numArtist = [

    `https://api.spotify.com/v1/artists/${seedArtists[0]}`,
    `https://api.spotify.com/v1/artists/${seedArtists[1]}`,
    `https://api.spotify.com/v1/artists/${seedArtists[2]}`,
    `https://api.spotify.com/v1/artists/${seedArtists[3]}`,
    `https://api.spotify.com/v1/artists/${seedArtists[4]}`
    ]

    let a1 = axios.get(numArtist[0], {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + token
      }
      })
    let a2 = axios.get(numArtist[1], {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + token
      }
      })

    let a3 = axios.get(numArtist[2], {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + token
      }
      })
    
    let a4 = axios.get(numArtist[3], {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + token
      }
      })

    let a5 = axios.get(numArtist[4], {
          method: 'GET',
          headers: {
            'Authorization': 'Bearer ' + token
          }
          })    


    axios.all([a1,a2,a3,a4,a5]) . then(
      axios.spread((...allData) => {
        let artista1 = allData[0]
        let artista2 = allData[1]
        let artista3 = allData[2]
        let artista4 = allData[3]
        let artista5 = allData[4]

        //console.log(artista1)
        //console.log(artista2)
        //console.log(artista3)
        //console.log(artista4)
        //console.log(artista5)

        setArtist1(artista1)
        setArtist2(artista2)
        setArtist3(artista3)
        setArtist4(artista4)
        setArtist5(artista5)

      })
    )

    console.log(artist1)
    console.log(artist2)
    console.log(artist3)
    console.log(artist4)
    console.log(artist5)

       
    seedGenres += artist1.data.genres[0]
      for (let i = 1; i < artist1.data.genres.length ; i++) {
        if (artist1.data.genres[i] !== undefined)
          seedGenres += ", " + artist1.data.genres[i] //need to make these random
      }
      
      if(artist1.data.genres.length < 5){
    
        for (let i = 1; i < artist2.data.genres.length ; i++) {
          if (artist2.data.genres[i] !== undefined)
            seedGenres += ", " + artist2.data.genres[i] //need to make these random
        }
      }

      console.log(artist1.data.name)
      console.log(artist2.data.name)
      console.log(artist3.data.name)
      console.log(artist4.data.name)
      console.log(artist5.data.name)
      console.log("seedGenres =", seedGenres); 
    

    // fetch recommendations
    axios('https://api.spotify.com/v1/recommendations', {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + token
      },
      params: {
        seed_artists: seedArtists, //array of up to 5 seed artist ids
        // seed_genres: "hip-hop, pop", //string of up to 5 seed genre names. still need to figure out getting playlist genres
        seed_genres: "pop",
        seed_tracks: seedTracks, //array of up to 5 seed track ids
      }
    })
      .then(recResponse => {
        setRecommendations(recResponse)
        setRecPending(false)
        setRecLoaded(true)
      });
  }

  const download = e => {



    axios(`https://api.spotify.com/v1/users/${user}/playlists`, {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + token
      },
      body: {
        name: "New Playlist",
        public: false,
        collaborative: false,
        description: "New Playlist description"
      }
    })
      .then(console.log("downloaded"))
  }

  let idx = 0;

  return (
    <div className="">
      <Navbar />
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
      <div className="max-w-[80%] mx-auto my-5 flex justify-center bg-white">
        <div className="">
          <div className="flex justify-center">
            <div>
              {coverPending && <div>Loading...</div>}
              {!coverPending && cover && <img src={cover.data[0].url} alt="Playlist Cover" />}
              {!coverPending && cover && <p className="text-center">{playlistOutput}</p>}
            </div>
          </div>
          {!coverPending && cover &&
            <div className="flex justify-center">
              <div className="grid grid-flow-row grid-cols-2 gap-x-96">
                <p>Your Top 5 Genres</p>
                <p>Your Top 5 Artists</p>
              </div>
            </div>}
          <div className="flex justify-center">
            {!coverPending && cover && <button className="bg-black text-[2.118vw] px-[3.125vw] p-[0.313vw] rounded-lg text-white" onClick={btnClicked}>Get Recommendations</button>}
          </div>
          <div className="flex justify-center">
            {recPending && <div>Loading...</div>}
          </div>
        </div>
      </div>
      {recLoaded &&
        <div className="px-[10%] py-5 flex justify-center bg-gray-300">
          <div>
            <div className="flex justify-center">
              {!recPending && recommendations.data && <h1 className="text-[30px]">Here Are Your Recommendations!</h1>}
            </div>
            <div className="flex justify-center">
              <div className="grid grid-flow-row grid-cols-2 gap-x-10">
                {!recPending && recommendations.data && recommendations.data.tracks.map((rec) => (
                  <div className="flex items-center mb-5 gap-2" key={idx++}>
                    {rec.album.images && <img src={rec.album.images[0].url} alt="Playlist Cover" className="w-[100px] h-[100px]" />}
                    <p className="">{rec.name} by {rec.artists[0].name}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center">
              {!recPending && recommendations.data && <img src={newPlaylist} alt="Spotify Pact Playlist" className="w-[250px] h-[300px]" />}
              <div>
                <p>Here's Your Generated Playlist</p>
                {!recPending && recommendations.data && <button className="bg-black text-[2.118vw] px-[3.125vw] p-[0.313vw] rounded-lg text-white" onClick={download}>Listen Now!</button>}
              </div>
            </div>
          </div>
        </div>}
    </div>
  )
}

export default Playlist
