import { apiClient } from "../helpers/apiClient.js";
import { Player } from "../helpers/mapping/player.js";
import { Logger } from "../utils/logger.js";

export const playerApi = {
  getPlayerById: async (playerId) => { // TODO : remove this and API endpoint if not used
    const response = await apiClient.get(`/player/${roomId}/${playerId}`);
    const player = Player.mapFromAPI(response);
    
    Logger.log(`Player ${playerId} data from ${roomId} retrieved`);
    return player;
  },
  getPlayerBySession: async (roomId) => { // TODO : check if works
    const response = await apiClient.get(`/player/${roomId}`, true);
    const player = Player.mapFromAPI(response);

    Logger.log(`Player ${player.id} data from ${roomId} retrieved from session`);
    return player;
  }
}