import { Artist, Album, Image } from '../../Ultilities/MusicTypes';
import { getArtistsAlbums } from '../../Ultilities/spotify';
import './ArtistDisplay.css';

export function ArtistDisplay(props: {loadedArtists: Artist[], setLoadedArtists: (al: Artist[]) => void, setLoadedAlbums: (al: Album[]) => void}) {
  function checkNullImage(image: Image[]) {
    if (image.length !== 0) {
      return image[0].URL
    } else {
      return 'nullArtist.png';
    };
  };

  async function albumSearch(artistArray: Artist[]) {
    let albums: Album[] = await getArtistsAlbums(artistArray);
    props.setLoadedAlbums(albums);
  };

  return (
    <div className="grid">
      {props.loadedArtists.map( (artist: Artist) => {
        return (
          <div style={{backgroundColor: artist.backgroundColor}}  id="card">      
            <div className="artistImageContainer">
              <img className="artistImage" alt="" src={checkNullImage(artist.images)}/>
            </div>
            <div className="artistInfo">
              <div className="artistTitle">
                  {artist.name}              
              </div>
              <div className="buttonContainer">
                <div
                
                  className="removeButton"
                  onClick={() => {
                    let artistArray = props.loadedArtists;
                    artistArray.splice(artistArray.indexOf(artist),1);
                    localStorage.setItem("artists", JSON.stringify(artistArray));
                    props.setLoadedArtists([...artistArray]);
                    albumSearch(artistArray);
                  }}>
                    Remove
                </div> 
              </div>             
            </div>
          </div>
        )
      })}
    </div>   
  )
}