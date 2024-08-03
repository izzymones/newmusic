import { Album, Artist } from '../Ultilities/MusicTypes';
import { HomePage } from '../Pages/HomePage/HomePage';
import { ArtistsPage } from '../Pages/ArtistsPage/ArtistsPage'
import { ReleasesPage } from '../Pages/ReleasesPage/ReleasesPage'
import { Route, Routes } from 'react-router-dom'

export function RoutesElement(
  props: {
    setLoadedArtists: (al: Artist[]) => void, 
    setLoadedAlbums: (al: Album[]) => void, 
    loadedArtists: Artist[], 
    loadedAlbums: Album[]
  }) {
  return (
  <Routes>
    <Route path="/">
      <Route path="newmusic" element={<HomePage 
      loadedArtists={props.loadedArtists}/>} />
      <Route path="artists" element={<ArtistsPage 
      setLoadedArtists={props.setLoadedArtists} 
      setLoadedAlbums={props.setLoadedAlbums} 
      loadedArtists={props.loadedArtists}/>} />
      <Route path="releases" element={<ReleasesPage 
      loadedAlbums={props.loadedAlbums} 
      loadedArtists={props.loadedArtists}
      setLoadedAlbums={props.setLoadedAlbums}/>} />
    </Route>
  </Routes>
  )
}