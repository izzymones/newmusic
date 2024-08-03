import './HomePage.css';
import { Artist, Image} from '../../Ultilities/MusicTypes';
import { useEffect, useState } from 'react';

export function HomePage(props: {loadedArtists: Artist[]}) {
  const [randomArtists, setRandomArtists] = useState<Artist[]>([]);
  let interval: NodeJS.Timer;

  function setCarouselPosition() {
    let el = document.getElementById("carousel")!;
    el.scrollLeft = (el.scrollWidth - el.offsetWidth) / 2;
  }
  useEffect(() => {
    if (props.loadedArtists.length !== 0)
      getRandomArtists(props.loadedArtists);
  }, [props.loadedArtists]);

  function mousemovefunction(event: any) {
    let el = document.getElementById("carousel")!;
    let mousePositionValue = (event.clientX / el.offsetWidth);
    clearInterval(interval);
    interval = setInterval(() => el.scrollLeft += (((el.scrollWidth - el.offsetWidth) * mousePositionValue) - el.scrollLeft)/50, 10);
  }
 
  function getRandomArtists(array: Artist[]) {
    let outputArray: Artist[] = [];
    while ((outputArray.length < 9) && (outputArray.length < array.length)) {
      const randomIndex = Math.floor(Math.random() * array.length);
      if (!outputArray.includes(array[randomIndex])) {
        outputArray.push(array[randomIndex]);
      }
    };
    setRandomArtists(outputArray);
};

function checkNullImage(image: Image[]) {
  if (image.length !== 0) {
    return image[0].URL
  } else {
    return 'nullArtist.png';
  };
};

  if (randomArtists.length !== 0) {
    return (
      <div className="HomeDiv">
        <ul className="list" id="carousel" 
        onLoad={setCarouselPosition} 
        onMouseMove={mousemovefunction}>
          {randomArtists.map((artist: Artist) => {
            return (
              <li className="item"><img className="homePageImage" alt="" src={checkNullImage(artist.images)}/></li>
            )
          })}
        </ul>
        <div className="textContainer">
          <div className="homeText"> 
            Izzy's Music App.
          </div>
          <div className="subText"> 
            A spotify-based new music app.
          </div>
        </div>
      </div>
  
    )
  } else {
    return (
      <div className="HomeDiv">
        <ul className="list" id="carousel" 
        onLoad={setCarouselPosition} 
        onMouseMove={mousemovefunction}>
          <li className="item"><img className="homePageImage" alt="" src="Sampha.jpg"/></li>
          <li className="item"><img className="homePageImage" alt="" src='Yeule.jpg'/></li>
          <li className="item"><img className="homePageImage" alt="" src='BillieEilish.jpg'/></li>
          <li className="item"><img className="homePageImage" alt="" src='Smino.jpg'/></li>
          <li className="item"><img className="homePageImage" alt="" src='KaliUchis.jpg'/></li>
          <li className="item"><img className="homePageImage" alt="" src='JapaneseBreakfast.jpg'/></li>
          <li className="item"><img className="homePageImage" alt="" src='JoeyValenceBrae.jpg'/></li>
          <li className="item"><img className="homePageImage" alt="" src='HaruNemuri.jpg'/></li>
          <li className="item"><img className="homePageImage" alt="" src='JADE.jpg'/></li>
        </ul>
        <div className="textContainer">
          <div className="homeText"> 
            Izzy's Music App.
          </div>
          <div className="subText"> 
            A spotify-based new music app.
          </div>
          <div className="content"> 
          Has your favorite artist dropped that new album or released a new single? This app helps you monitor the recent releases of all your favorite artists so you never miss a song.            </div>
        </div>
      </div>
    )
  }
}