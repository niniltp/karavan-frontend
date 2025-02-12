import { WSmsgTypes } from '../../helpers/constants.js';

export const PlayersReadyMessage = {
  type: WSmsgTypes.PLAYER_READY,
  validator: (message) => {
    const content = message.content;
    return typeof content.player_name === 'string' &&
      typeof content.ready === 'boolean';
  },
  handler: (message, setPlayerState) => {
    const content = {
      playerName: message.content.player_name,
      ready: message.content.ready
    }
    setPlayerState(content);
  }
};