import { WSmsgTypes } from '../../helpers/constants.js';

export const NoSongPickedMessage = {
  type: WSmsgTypes.NO_SONG_PICKED,
  validator: (message) => {
    return true;
  },
  handler: (message, setContent) => {
    setContent(message.content); // Unused string
  }
};