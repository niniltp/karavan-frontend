import { WSmsgTypes, GamePhase } from '../../helpers/constants.js';

export const TimerMessage = {
  type: WSmsgTypes.TIMER,
  validator: (message) => {
    const content = message.content;
    return typeof content.current_phase === 'string' &&
        typeof content.remaining_time === 'number' &&
        typeof content.round === 'number' &&
        typeof content.turn === 'number';
  },
  handler: (message, setTimer) => {
    const content = {
      currentGamePhase: message.content.current_phase === "picking_song" ? GamePhase.PICKING_SONG : GamePhase.GUESSING_SONG,
      remainingTime: message.content.remaining_time,
      round: message.content.round,
      turn: message.content.turn
    }
    setTimer(content);
  }
};