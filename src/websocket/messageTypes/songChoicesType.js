import { WSmsgTypes } from '../../helpers/constants.js';
import { Song } from '../../helpers/mapping/song.js';

export const SongChoicesMessage = {
  type: WSmsgTypes.SONG_CHOICES,
  validator: (message) => {
    const content = message.content;
    return Array.isArray(content);
  },
  handler: (message, setContent) => {
    const content = {
      type: message.type,
      songs: Song.mapArrayFromAPI(message.content)
    }
    setContent(content);
  }
};