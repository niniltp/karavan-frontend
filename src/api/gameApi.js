import { apiClient } from "../helpers/apiClient.js";
import { Player } from "../helpers/mapping/player.js";
import { Room } from "../helpers/mapping/room.js";
import { Logger } from "../utils/logger.js";

export const gameApi = {
  start: async (roomId) => {
    Logger.log(`Game starting in room ${roomId}...`);

    const response = await apiClient.post(`/game`, { room_id: roomId }, true);
    return response;
  },
  postSongChoice: async (roomId, songId) => {
    Logger.log(`Sending song choice with id ${songId} in room ${roomId}...`);

    const response = await apiClient.post(`/picksong`, { room_id: roomId, song_id: songId }, true);
    return response;
  }
}