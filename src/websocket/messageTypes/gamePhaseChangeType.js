import { GamePhase, WSmsgTypes } from '../../helpers/constants.js';

export const GamePhaseChangeMessage = {
  type: WSmsgTypes.GAME_PHASE_CHANGE,
  validator: (message) => {
    const content = message.content;
    return typeof content.phase === 'string' && Object.values(GamePhase).includes(content.phase);
  },
  handler: (message, setContent) => {
    setContent(message.content);
  }
};