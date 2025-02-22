import { apiClient } from "../helpers/apiClient.js";
import { ChatMessage } from "../helpers/mapping/chatMessage.js";
import { Logger } from "../utils/logger.js";

export const chatApi = {
    getHistory: async (roomId) => { // TODO : remove this and API endpoint if not used
      Logger.log(`Retrieving chat history from room ${roomId}...`);
      const response = await apiClient.get(`/chat/${roomId}`);
      const chatHistory = ChatMessage.mapArrayFromAPI(response.messages);
      
      return chatHistory;
    },
  send: async (roomId, senderId, content) => {
    Logger.log(`User ${senderId} sending a new chat message ...`);
    const message = ChatMessage.createForAPI(senderId, content);
    const response = await apiClient.post(`/chat`, { room_id: roomId, message: message });
    
    return response;
  }
}