import { GamePhase, WSmsgTypes } from '../../helpers/constants.js';

export const TurnEndedPrematurelydMessage = {
  type: WSmsgTypes.TURN_ENDED_PREMATURELY,
  validator: (message) => {
    const content = message.content;
    return typeof content.content === 'string';
  },
  handler: (message, setContent) => {
    setContent(message.content);
  }
};