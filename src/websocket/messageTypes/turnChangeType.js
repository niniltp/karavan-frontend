import { WSmsgTypes } from '../../helpers/constants.js';

export const TurnChangeMessage = {
  type: WSmsgTypes.TURN_CHANGE,
  validator: (message) => {
    const content = message.content;
    return typeof content.round === 'number' &&
      typeof content.turn === 'number';
  },
  handler: (message, setContentState) => {
    const content = {
      round: message.content.round,
      turn: message.content.turn
    }
    setContentState(content);
  }
};