import { WSmsgTypes } from '../../helpers/constants.js';

export const AllPlayersReadyMessage = {
  type: WSmsgTypes.ALL_PLAYERS_READY,
  validator: (message) => {
    const content = message.content;
    return content === null;
  },
  handler: (message, setContent) => {
    setContent(message.content); // Empty string
  }
};