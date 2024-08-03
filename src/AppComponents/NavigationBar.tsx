import { Navbar } from 'react-bootstrap';
import { Link } from "react-router-dom";
import './NavigationBar.css'

export function NavigationBar() {
  return (
    <Navbar id="NavBar">
      <Link id="brand" to="newmusic" >Izzy's Music App</Link>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Link id="button" to="newmusic">Home</Link>
      <Link id="button" to="/artists">Artist</Link>
      <Link id="button" to="/releases">Releases</Link>
    </Navbar>
    
  )
}