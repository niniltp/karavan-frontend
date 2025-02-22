import { WSmsgTypes, GameStatus } from '../../helpers/constants.js';

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
      currentGameStatus: message.content.current_phase === "picking_song" ? GameStatus.PICKING_SONG : GameStatus.GUESSING_SONG,
      remainingTime: message.content.remaining_time,
      round: message.content.round,
      turn: message.content.turn
    }
    setTimer(content);
  }
};