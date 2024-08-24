class Image {
    height: number;
    width: number;
    URL: string;
    constructor(image: any) {
      this.height = image.height;
      this.width = image.width;
      this.URL = image.url;
    };
  };
  
class Album {
  id: string;
  name: string;
  albumType: string;
  artists: string[];
  releaseDate: Date;
  images: Image[];
  totalTracks: number;
  uri: string;
  backgroundColor: string;
  constructor(albumObject: any, backgroundColor: string) {
    this.id = albumObject.id;
    this.name = albumObject.name;
    this.artists = albumObject.artists.map((a: any) => a.name);
    this.releaseDate = albumObject.release_date;
    this.images = albumObject.images.map((im: any) => new Image(im));
    if (albumObject.album_type === 'single') {
      this.albumType = "Single";
    } else if (albumObject.album_type === 'album') {
      this.albumType = "Album";
    } else {
      this.albumType = "Unknown";
    }
    this.uri = albumObject.uri;
    this.totalTracks = albumObject.total_tracks;
    this.backgroundColor = backgroundColor;
  };
};

class Artist {
  id: string;
  name: string;
  uri: string;
  externalURL: string;
  genres: string[];
  images: Image[];
  backgroundColor: string;
  constructor(artistObject: any, backgroundColor: string) {
    this.id = artistObject.id;
    this.name = artistObject.name;
    this.uri = artistObject.uri;
    this.externalURL = artistObject.external_urls.spotify;
    this.genres = artistObject.genres;
    this.images = artistObject.images.map((im: any) => new Image(im));
    this.backgroundColor = backgroundColor;
  };
};

export { Image, Album, Artist };