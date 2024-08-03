import { Album, Artist } from '../../Ultilities/MusicTypes';
import './AlbumDisplay.css';
import { getArtistsAlbums } from '../../Ultilities/spotify';


export function AlbumDisplay(props: {albums: Album[], artists: Artist[], setLoadedAlbums: (al: Album[]) => void}) {
  if (props.albums.length !== 0) {
    return (
      <div>
        <div className="refreshButton" onClick={async () => {
          props.setLoadedAlbums(await getArtistsAlbums(props.artists));
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
        props.setLoadedAlbums(await getArtistsAlbums(props.artists));
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
}