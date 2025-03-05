import { WSmsgTypes } from '../../helpers/constants.js';
import { Song } from '../../helpers/mapping/song.js';

export const SingerSongDataMessage = {
  type: WSmsgTypes.SINGER_SONG_DATA,
  validator: (message) => {
    const content = message.content;

    return typeof content.artist === 'string' &&
      typeof content.id === 'number' &&
      typeof content.title === 'string' &&
      typeof content.lyrics === 'string';
  },
  handler: (message, setContent) => {
    const content = Song.mapFromAPI(message.content)
    setContent(content);
  }
};