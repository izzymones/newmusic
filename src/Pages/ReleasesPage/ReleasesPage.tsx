import { AlbumDisplay } from './AlbumDisplay'
import { Album, Artist } from '../../Ultilities/MusicTypes';

export function ReleasesPage(props: {loadedAlbums: Album[], loadedArtists: Artist[], setLoadedAlbums: (al: Album[]) => void}) {
  return (
    <AlbumDisplay albums={props.loadedAlbums} artists={props.loadedArtists} setLoadedAlbums={props.setLoadedAlbums}/>
  )
}