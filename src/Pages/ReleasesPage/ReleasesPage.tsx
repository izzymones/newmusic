import { AlbumDisplay } from './AlbumDisplay'
import { Album, Artist } from '../../Ultilities/MusicTypes';

export function ReleasesPage(
  props: {
    loadedAlbums: Album[], 
    loadedArtists: Artist[], 
    loadingArtist: string, 
    setLoadedAlbums: (al: Album[]) => void
    setLoadingArtist: (al: string) => void
  }) {
  return (
    <AlbumDisplay 
    albums={props.loadedAlbums} 
    artists={props.loadedArtists} 
    loadingArtist={props.loadingArtist} 
    setLoadedAlbums={props.setLoadedAlbums}
    setLoadingArtist={props.setLoadingArtist}/>
  )
}