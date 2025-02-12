import { WSmsgTypes } from '../../helpers/constants.js';

export const GameStartMessage = {
  type: WSmsgTypes.GAME_START,
  validator: (message) => {
    const content = message.content;
    return typeof content.content === 'string'
  },
  handler: (message, setGameStart) => {
    setGameStart(message.content);
  }
};