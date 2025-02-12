import { WSmsgTypes } from '../../helpers/constants.js';
import { Player } from '../../helpers/mapping/player.js';

export const RoomStateMessage = {
  type: WSmsgTypes.ROOM_STATE,
  validator: (message) => {
    const content = message.content;
    return typeof content.room_id === 'string' &&
      typeof content.owner === 'string' &&
      Array.isArray(content.players);
  },
  handler: (message, setRoomState) => {
    const content = {
      roomId: message.content.roomId,
      owner: message.content.owner,
      players: Player.mapArrayFromAPI(message.content.players)
    }
    setRoomState(content);
  }
};