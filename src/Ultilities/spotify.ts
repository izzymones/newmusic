import { Album, Artist } from './MusicTypes';
import { FastAverageColor } from 'fast-average-color';

 
const clientId = "1428a54cde744da8898c1a6743c7c53a";
const clientSecret = "4e4971ac59f444f3a71b143deaa35b98";

class Parameters {
    method: string;
    headers: {
        'Content-Type': string;
        Authorization?: string;
    };
    body?: string;
    constructor(
        method: string, 
        headers: {
            'Content-Type': string;
            Authorization?: string;
        }, 
        body?: string) {
        this.method = method;
        this.headers = headers;
        this.body = body;
    }
}

export async function getAccessToken() {
    const params = new Parameters(
        'POST', 
        {'Content-Type': 'application/x-www-form-urlencoded'}, 
        'grant_type=client_credentials&client_id=' + clientId + '&client_secret=' + clientSecret);
    return await fetch('https://accounts.spotify.com/api/token', params)
        .then(result => {return result.json()})
        .then(result => { return result.access_token });
};

export function setUpParam(accessToken: string) {
    const searchParams = new Parameters(
        'GET', 
        {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + accessToken}
    )
    return searchParams;
};

export async function fetchArtistID(searchInput: string, searchParams: Parameters) {
    return await fetch('https://api.spotify.com/v1/search?q=' + searchInput + '&type=artist', searchParams)
        .then(response => response.json())
        .then(data => { 
            return data.artists.items[0].id});
};

export async function fetchAlbums(artistID: string, searchParams: Parameters) {
    const albums = await fetch('https://api.spotify.com/v1/artists/' + artistID + '/albums?include_groups=album,single&market=US&limit=50', searchParams)
    .then(response => response.json())
    .then(data => { 
        return data.items});
    return albums;
};

export async function fetchArtist(searchInput: string, searchParams: Parameters) {
    const artist = await fetch('https://api.spotify.com/v1/search?q=' + searchInput + '&type=artist', searchParams)
        .then(response => response.json())
        .then(data => { 
            return data.artists.items[0]});
    return artist;
};

async function buildAlbums(albums: any) {
    const albumsList: Album[] = await Promise.all(albums.map(async (album: any) => {
        album = await getAverageColor(album.images[0].url)
        .then(backgroundColor => {return new Album(album, backgroundColor)});
        return album;
    }));
    return albumsList;
};

function sortAlbumsByDate(albums: Album[]) {
    albums.sort(function(a,b){
        return new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime();
        });
    return albums
};

export function sortArtistsByName(artistArray: Artist[]) {
    artistArray.sort((a, b) => a.name.localeCompare(b.name))
};

export async function getArtistsAlbumsRefresh(artistArray: Artist[], setLoadingArtist: (al: string) => void) {
    let accessToken = await getAccessToken();
    let searchParams = setUpParam(accessToken);
    let albumArray: Album[] = [];
    for (let i = 0; i < artistArray.length; i++) {
        setLoadingArtist(artistArray[i].name)
        let unloadedAlbums = await fetchAlbums(artistArray[i].id, searchParams);
        albumArray = albumArray.concat(unloadedAlbums);
    };
    let builtAlbums = await buildAlbums(albumArray);
    setLoadingArtist("");
    return sortAlbumsByDate(builtAlbums);
};

export async function getArtist(searchInput: string) {
    let accessToken = await getAccessToken();
    let searchParams = setUpParam(accessToken);
    let artist = await fetchArtist(searchInput, searchParams);
    let backgroundColor = "2a2a2a"
    if (artist.images.length !== 0) {
        backgroundColor = await getAverageColor(artist.images[0].url)
    }
    if (artist !== undefined) {
        return new Artist(artist, backgroundColor);
    };
};

async function getAverageColor(imageURL: string) {
    const fac = new FastAverageColor();
    const color = (await fac.getColorAsync(imageURL)).rgb;
    const colorArray: string[] = color.split(',');
    let colorNumArray: number[] = [];
    colorNumArray[0] = Number(colorArray[0].slice(4));
    colorNumArray[1] = Number(colorArray[1]);
    colorNumArray[2] = Number(colorArray[2].substring(0, colorArray[2].length - 1));
    const scalar: number = 2;
    const averageValue: number = (colorNumArray[0] + colorNumArray[1] + colorNumArray[2])/3;
    for (let i = 0; i < 2; i++) {
        colorNumArray[i] = colorNumArray[i] + scalar * (colorNumArray[i] - averageValue);
    };
    return `rgb(${colorNumArray.toString()})`;
  };
