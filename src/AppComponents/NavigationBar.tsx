import { Navbar } from 'react-bootstrap';
import { Link } from "react-router-dom";
import './NavigationBar.css'

export function NavigationBar() {
  return (
    <Navbar id="NavBar">
      <img className="bunnyLogo" src="./IzzyLogo.png"/>
      <Link id="brand" to="/" >Izzy's Music App</Link>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Link id="button" to="/"><div className="buttonText">Home</div></Link>
      <Link id="button" to="/artists"><div className="buttonText">Artists</div></Link>
      <Link id="button" to="/releases"><div className="buttonText">Releases</div></Link>
    </Navbar>
    
  )
}