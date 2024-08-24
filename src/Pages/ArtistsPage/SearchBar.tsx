import { useState } from 'react';
import { Album, Artist } from '../../Ultilities/MusicTypes';
import { getArtist, sortArtistsByName } from '../../Ultilities/spotify';
import './SearchBar.css'

export function SearchBar(
  props: {
    setLoadedArtists: (al: Artist[]) => void, 
    setLoadedAlbums: (al: Album[]) => void
    loadedArtists: Artist[]
  }) {
  const [searchInput, setSearchInput] = useState("");

  async function artistSearch(input: string) {
    if (input !== undefined && input !== "" && input !== null) {
      let artist: Artist | undefined= await getArtist(input);
      if (artist !== undefined) {
        return await pushArtist(artist)
      }
    }
  }

  async function pushArtist(artist: Artist) {
    let artistArray: Artist[] = props.loadedArtists;
    let newArtistBool = true;
    for (let i = 0; i < artistArray.length; i++) {
      if (artistArray[i].id === artist.id) {
        newArtistBool = false;
      }
    }
    if (newArtistBool === true) {
      artistArray.push(artist);
      sortArtistsByName(artistArray);
      localStorage.setItem("artists", JSON.stringify(artistArray));
      props.setLoadedArtists([...artistArray]);
    }
  }

  function resetButton() {
    (document.getElementById('formElement') as HTMLFormElement)?.reset();
  }
    return (
      <div className="searchBar">
        <form id="formElement">
          <input 
          type="text" 
          placeholder="  Search For Artist" 
          onChange={event => setSearchInput(event.target.value)}
          onKeyDown={event => {
            if (event.key === "Enter") {
              event.preventDefault();
              artistSearch(searchInput);
              setSearchInput("");
              resetButton();
            }
          }}
          />
        </form>
        <div className="searchButton" onClick={() => {
          artistSearch(searchInput);
          setSearchInput("");
          resetButton();
          }}>
          Search
        </div>
      </div>
    )
}