import { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import useWebSocket from 'react-use-websocket';
import { messageHandlers, messageValidators, messageCreators } from './utils/registry.js';
import { initializeRegistry } from './messageTypesIndex.js';
import { WSmsgTypes, WEBSOCKET_URL } from '../helpers/constants.js';
import { handleError } from '../helpers/errorHandler.js';
import { Logger } from "../utils/logger.js";

// Initialize message type registry
initializeRegistry();

const WebSocketContext = createContext(null);
  
const parseWSmsg = (message) => {
  const parsedMsg = JSON.parse(message.data);
  const content = parsedMsg?.content != "" ? JSON.parse(parsedMsg?.content) : null;

  return {
    type: parsedMsg.type,
    content: content
  }
}

export const WebSocketProvider = ({ roomId, playerId, children }) => {
  // const [messageStores, setMessageStores] = useState([])
  const [messagesStores, setMessageStores] = useState({
    [WSmsgTypes.CHAT_NEW_MSG]: [], // TODO : check if keep all history or only last message
    [WSmsgTypes.ROOM_STATE]: null,
    [WSmsgTypes.PLAYER_READY]: null,
    [WSmsgTypes.GAME_START]: null,
    [WSmsgTypes.ALL_PLAYERS_READY]: null
  });
  
  const { sendJsonMessage, lastMessage, readyState } = useWebSocket(
    roomId && playerId ? 
      `${WEBSOCKET_URL}/${roomId}/${playerId}`
      : null,
    {
      shouldReconnect: (closeEvent) => true,
      reconnectAttempts: 10,
      reconnectInterval: 3000,
      share: true,
      filter: (message) => {
        try {
          const parsedData = parseWSmsg(message);
          const validator = messageValidators.get(parsedData.type);
          return validator ? validator(parsedData) : false;
        } catch {
          return false;
        }
      }
    }
  );

  const processMessage = useCallback((message) => {
    try {
      const parsedData = parseWSmsg(message);
      const msgHandler = messageHandlers.get(parsedData.type);

      if (msgHandler) {
        setMessageStores(prev => {
          const newState = { ...prev }; // Keep the other msg stores intact
          msgHandler(parsedData, (value) => {
            newState[parsedData.type] = value; // Only change the specific message store
          });
          return newState;
        });
      }
    } catch (error) {
      Logger.error('[WEBSOCKET] Message processing error:', error);
      handleError(error.code);
    }
  }, []);

  useEffect(() => {
    if (lastMessage) processMessage(lastMessage);
  }, [lastMessage, processMessage]);

  const value = useMemo(() => ({
    sendJsonMessage,
    WSstores: messagesStores,
    WSisConnected: readyState === WebSocket.OPEN,
    WSconnectionStatus: ['Connecting', 'Open', 'Closing', 'Closed'][readyState]
  }), [sendJsonMessage, messagesStores, readyState]);

  return (
    <WebSocketContext.Provider value={value}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocketContext = () => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error('useWebSocketContext must be used within WebSocketProvider');
  }
  return context;
};