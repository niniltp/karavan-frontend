import { registerMessageType } from './utils/registry.js';
import { ChatMessage } from './messageTypes/chatType.js';
import { PlayersReadyMessage } from './messageTypes/playersReadyType.js';
import { RoomStateMessage } from './messageTypes/roomStateType.js';
import { GameStartMessage } from './messageTypes/gameStartType.js';
import { AllPlayersReadyMessage } from './messageTypes/allPlayersReadyType.js';
import { TimerMessage } from './messageTypes/timerType.js';
import { TurnChangeMessage } from './messageTypes/turnChangeType.js';
import { WaitingPlayersMessage } from './messageTypes/waitingPlayersType.js';

export const initializeRegistry = () => {
  registerMessageType(WaitingPlayersMessage.type, {
    validator: WaitingPlayersMessage.validator,
    handler: WaitingPlayersMessage.handler
  });

  registerMessageType(AllPlayersReadyMessage.type, {
    validator: AllPlayersReadyMessage.validator,
    handler: AllPlayersReadyMessage.handler
  });

  registerMessageType(PlayersReadyMessage.type, {
    validator: PlayersReadyMessage.validator,
    handler: PlayersReadyMessage.handler
  });

  registerMessageType(ChatMessage.type, {
    validator: ChatMessage.validator,
    handler: ChatMessage.handler
  });

  registerMessageType(RoomStateMessage.type, {
    validator: RoomStateMessage.validator,
    handler: RoomStateMessage.handler
  });

  registerMessageType(GameStartMessage.type, {
    validator: GameStartMessage.validator,
    handler: GameStartMessage.handler
  });

  registerMessageType(TimerMessage.type, {
    validator: TimerMessage.validator,
    handler: TimerMessage.handler
  });

  registerMessageType(TurnChangeMessage.type, {
    validator: TurnChangeMessage.validator,
    handler: TurnChangeMessage.handler
  });
};