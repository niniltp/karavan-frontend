import { WSmsgTypes } from '../../helpers/constants.js';

export const ChatMessage = {
  type: WSmsgTypes.CHAT_NEW_MSG,
  validator: (message) => {
    const content = message.content;

    return typeof content.content === 'string' &&
      typeof content.sender === 'string' &&
      typeof content.timestamp === 'string';
  },
  handler: (message, setChat) => {
    const content = {
      sender: message.content.sender,
      content: message.content.content,
      timestamp: message.content.timestamp
    }
    setChat(prev => [...prev, content]);
  }
};