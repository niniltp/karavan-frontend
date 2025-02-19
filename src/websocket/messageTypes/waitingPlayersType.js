import { WSmsgTypes } from '../../helpers/constants.js';

export const WaitingPlayersMessage = {
  type: WSmsgTypes.WAITING_PLAYERS,
  validator: (message) => {
    const content = message.content;
    return  Array.isArray(content);
  },
  handler: (message, setContent) => {
    setContent(message.content); // Empty string
  }
};