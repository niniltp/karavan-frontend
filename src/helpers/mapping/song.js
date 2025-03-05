export const Song = {
  validator: (song) => {
    const isValid = typeof song?.id === 'number' &&
                    typeof song?.title === 'string' &&
                    typeof song?.artist === 'string';
    return isValid;
  },
  mapFromAPI: (APIsong) => {
    if(!Song.validator(APIsong)) {
      throw new Error('Invalid data for mapping Song object'); // TODO : refactor with error code etc
    }

    let song;
  
    if(Object.hasOwn(APIsong, 'lyrics')) {
      song = Song.create(APIsong.id, APIsong.artist, APIsong.title, APIsong.lyrics);
    } else {
      song = Song.create(APIsong.id, APIsong.artist, APIsong.title);
    }

    return song;
  },
  mapArrayFromAPI: (APIsongs) => {
    const songs = [];

    APIsongs?.forEach( (APIsong) => {
      const song = Song.mapFromAPI(APIsong);
      songs.push(song);
    })

    return songs;
  },
  create: (id, artist, title, lyrics='') => {
    const song = {
      id: id,
      artist: artist,
      title: title,
      lyrics: lyrics
    }
  
    return song;
  }
}