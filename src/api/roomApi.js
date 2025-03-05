import { apiClient } from "../helpers/apiClient.js";
import { Player } from "../helpers/mapping/player.js";
import { Room } from "../helpers/mapping/room.js";
import { Logger } from "../utils/logger.js";

export const roomApi = {
  create: async (data) => {
    Logger.log(`Creating new room...`);

    const response = await apiClient.post('/room');
    const room = {
      id: await response.success
    };
    return room;
  },
  getById: async (roomId) => {
    Logger.log(`Retrieving room ${roomId} data...`);

    const response = await apiClient.get(`/room/${roomId}`);
    const room = Room.mapFromAPI(response);

    return room;
  },
  join: async (roomId, playerName) => {
    Logger.log(`User ${playerName} joining the room ${roomId}...`);

    const response = await apiClient.post(`/room/join`, { room_id: roomId, player_name: playerName });
    const player = Player.mapFromAPI(response);

    return player;
  },
  // start: async (roomId) => {
  //   Logger.log(`Game starting in room ${roomId}...`);

  //   const response = await apiClient.post(`/game`, { room_id: roomId }, true);
  //   return response;
  // },
  removePlayer: async (roomId, playerId) => { // TODO : implement + server must check if cookie of player performing action is owner
    Logger.log(`Removing user ${playerId} from room ${roomId}...`);

    const response = await apiClient.delete(`/room/join`, { room_id: roomId, player_id: playerId}, true);
    return response;
  },
  setPlayerReady: async (roomId, player, ready) => {
    Logger.log(`Sending player ${player} status ${ready ? 'ready' : 'not ready'} to server...`);

    const response = await apiClient.post(`/room/ready`, { room_id: roomId, player_name: player, ready: ready }, true);
    return response;
  }
}