import './App.css';
import { useState, useEffect } from 'react';
import { Album, Artist } from '../Ultilities/MusicTypes';
import { NavigationBar } from './NavigationBar';
import { RoutesElement } from './RoutesElement'

function App() {
  const [loadedAlbums, setLoadedAlbums] = useState<Album[]>([]);
  const [loadedArtists, setLoadedArtists] = useState<Artist[]>([]);
  const [loadingArtist, setLoadingArtist] = useState("");


  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('artists')!);
    if (items) {
        setLoadedArtists(items);
    }
    else { console.log('no artists in local storage')}
  }, []);
  
  return (
    <div className="App">
      <NavigationBar/>
      <RoutesElement 
        setLoadedArtists={setLoadedArtists} 
        setLoadedAlbums={setLoadedAlbums}
        setLoadingArtist={setLoadingArtist}
        loadedArtists={loadedArtists} 
        loadedAlbums={loadedAlbums}
        loadingArtist={loadingArtist}/>
    </div>
  );
}

export default App;
