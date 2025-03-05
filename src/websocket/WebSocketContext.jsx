import { createContext, useContext, useReducer, useState, useEffect, useMemo, useCallback } from 'react';
import useWebSocket from 'react-use-websocket';
import { createContext as createSelectorContext, useContextSelector } from 'use-context-selector';
import { messageHandlers, messageValidators, messageCreators } from './utils/registry.js';
import { initializeRegistry } from './messageTypesIndex.js';
import { WSmsgTypes, WEBSOCKET_URL } from '../helpers/constants.js';
import { handleError } from '../helpers/errorHandler.js';
import { Logger } from "../utils/logger.js";

// Initialize message type registry
initializeRegistry();

// Helper: Parse an incoming WebSocket message
const parseWSmsg = (message) => {
  const parsedMsg = JSON.parse(message.data);
  
  return {
    type: parsedMsg.type,
    content: parsedMsg.content
  }
}

// Reducer for managing message stores
function wsReducer(state, action) {
  switch (action.type) {
    case 'ADD_MESSAGE': {
      const { messageType, data } = action.payload;
      // Replace for state messages (store only the latest content)
      return {
        ...state,
        [messageType]: data,
      };
    }
    default:
      return state;
  }
}

// Initial state: empty arrays for every message type.
const initialState = {
  [WSmsgTypes.WAITING_PLAYERS]: null,
  [WSmsgTypes.ALL_PLAYERS_READY]: null,
  [WSmsgTypes.PLAYER_READY]: null,
  [WSmsgTypes.CHAT_NEW_MSG]: null,
  [WSmsgTypes.ROOM_STATE]: null,
  [WSmsgTypes.GAME_START]: null,
  [WSmsgTypes.TIMER]: null,
  [WSmsgTypes.TURN_CHANGE]: null
};

// Create the websocket context (for ws actions)
const WebSocketContext = createContext(null);
// Create the websocket context (for ws state)
const WebSocketStateContext = createSelectorContext(null);

export const WebSocketProvider = ({ roomId, playerId, children }) => {
  // Manage messages with a reducer
  const [state, dispatch] = useReducer(wsReducer, initialState);

  // Local state for tracking connection status
  const [localReadyState, setLocalReadyState] = useState(WebSocket.CONNECTING);

  // Build the URL only if both roomId and playerId are provided.
  const socketUrl = roomId && playerId ? `${WEBSOCKET_URL}/${roomId}/${playerId}` : null;
  
  const {
    sendJsonMessage,
    lastMessage,
    readyState
  } = useWebSocket( socketUrl, {
      shouldReconnect: () => true,
      reconnectAttempts: 10,
      reconnectInterval: 3000,
      share: true,
    });

  // Update our local readyState based on the hook's readyState.
  useEffect(() => {
    setLocalReadyState(readyState);
  }, [readyState]);

  // Process incoming messages and update the reducer state
  const processMessage = useCallback((message) => {
    try {
      const parsedData = parseWSmsg(message);

      // Validate the message using the registry.
      const validator = messageValidators.get(parsedData.type);
      if (validator && validator(parsedData)) {
        const msgHandler = messageHandlers.get(parsedData.type);
        if (msgHandler) {
          // Process the message with the custom handler
          msgHandler(parsedData, (value) => {
            dispatch({
              type: 'ADD_MESSAGE',
              payload: { messageType: parsedData.type, data: value },
            });
          });
        } else {
          throw new Error(`No handler for message type ${parsedData.type}`);
        }
      } else {
        Logger.error(parsedData);
        throw new Error(`Invalid message format`);
      }
    } catch (error) {
      Logger.error('[WEBSOCKET] Message processing error:', error);
      handleError(error.code);
    }
  }, []);

  useEffect(() => {
    if (lastMessage !== null) {
      processMessage(lastMessage);
    }
  }, [lastMessage, processMessage]);

  const actionsContextValue = useMemo(() => ({
    sendJsonMessage,
    WSisConnected: localReadyState === WebSocket.OPEN,
    WSconnectionStatus: ['Connecting', 'Open', 'Closing', 'Closed'][localReadyState]
  }), [sendJsonMessage, localReadyState]);

  return (
    <WebSocketContext.Provider value={actionsContextValue}>
      <WebSocketStateContext.Provider value={state}>
      {children}
      </WebSocketStateContext.Provider>
    </WebSocketContext.Provider>
  );
};

export const useWebSocketActions = () => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error('useWebSocketContext must be used within WebSocketProvider');
  }
  return context;
};

export const useWSMessageStore = (messageType) => {
  return useContextSelector(WebSocketStateContext, (state) => state[messageType]);
};