import { WSmsgTypes } from '../../helpers/constants.js';

export const TimerMessage = {
  type: WSmsgTypes.TIMER,
  validator: (message) => {
    const content = message.content;
    return typeof content.content === 'string'
  },
  handler: (message, setTimer) => {
    setTimer(message.content.content);
  }
};