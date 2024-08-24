import { Album, Artist } from '../../Ultilities/MusicTypes';
import { getArtistsAlbumsRefresh } from '../../Ultilities/spotify';
import { useState } from 'react';
import './AlbumDisplay.css';



export function AlbumDisplay(
  props: {
    albums: Album[], 
    artists: Artist[],
    loadingArtist: string, 
    setLoadedAlbums: (al: Album[]) => void
    setLoadingArtist: (al: string) => void}) {
  const [isLoading, setIsLoading] = useState(false);

  async function refreshPage() {
    setIsLoading(true);
    const albums = await getArtistsAlbumsRefresh(props.artists, props.setLoadingArtist);
    setIsLoading(false);
    return albums;
  }

  if (isLoading === false) {
    if (props.albums.length !== 0) {
      return (
        <div>
          <div className="refreshButton" onClick={async () => {
            props.setLoadedAlbums(await refreshPage());
          }}>
            Refresh
          </div>
          <div className="grid">
            {props.albums.map( (album: Album) => {
              return (
                <div style={{backgroundColor: album.backgroundColor}} id="card">
                  <div className="albumImageContainer">
                    <img className="albumImage" alt="" src={album.images[0].URL}/>
                  </div>
                  <div className="albumInfoContainer">
                    <div className="albumInfo">
                      <div className="albumTitle">
                        {album.name}
                      </div>
                      <div className="albumArtistName">
                        {album.artists[0]}              
                      </div>
                      <div className="albumDate">
                        {album.releaseDate.toString()}              
                      </div>
                      <div className="albumType">
                        {album.albumType}              
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>   
        </div>
      )
    } else if (props.artists.length !== 0) {
      return (
        <div className="refreshButton" onClick={async () => {
          props.setLoadedAlbums(await refreshPage());
        }}>
          Refresh
        </div>
      )
    } else {
      return (
        <div className="noArtistMessageContainer">
          <div className="noArtistMessage">
            Please enter an artist.
          </div>
        </div>

      )
    }
  } else {
    return (
      <div>
        <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
        <div className="loadingArtist"> Loading: {props.loadingArtist}</div>
      </div>
    )
  }
}