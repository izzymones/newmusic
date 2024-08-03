import { SearchBar } from './SearchBar';
import { ArtistDisplay } from './ArtistDisplay';
import { Album, Artist } from '../../Ultilities/MusicTypes';

export function ArtistsPage(
  props: {
    setLoadedArtists: (al: Artist[]) => void, 
    setLoadedAlbums: (al: Album[]) => void, 
    loadedArtists: Artist[]}) {
  return (
    <div className="artistsDiv">
      <SearchBar
        setLoadedArtists={props.setLoadedArtists} 
        setLoadedAlbums={props.setLoadedAlbums} 
        loadedArtists={props.loadedArtists}/>
      <ArtistDisplay 
        loadedArtists={props.loadedArtists} 
        setLoadedArtists={props.setLoadedArtists}
        setLoadedAlbums={props.setLoadedAlbums}/>
    </div>
  )
}