import { registerMessageType } from './utils/registry.js';
import { ChatMessage } from './messageTypes/chatType.js';
import { PlayersReadyMessage } from './messageTypes/playersReadyType.js';
import { RoomStateMessage } from './messageTypes/roomStateType.js';
import { GameStartMessage } from './messageTypes/gameStartType.js';
import { GamePhaseChangeMessage } from './messageTypes/gamePhaseChangeType.js';
import { AllPlayersReadyMessage } from './messageTypes/allPlayersReadyType.js';
import { TimerMessage } from './messageTypes/timerType.js';
import { TurnEndedPrematurelydMessage } from './messageTypes/turnEndedPrematurelyType.js';
import { TurnChangeMessage } from './messageTypes/turnChangeType.js';
import { WaitingPlayersMessage } from './messageTypes/waitingPlayersType.js';
import { SongChoicesMessage } from './messageTypes/songChoicesType.js';
import { NoSongPickedMessage } from './messageTypes/noSongPickedType.js';
import { RoundChangeMessage } from './messageTypes/roundChangeType.js';
import { SingerSongDataMessage } from './messageTypes/singerSongDataType.js';

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

  registerMessageType(GamePhaseChangeMessage.type, {
    validator: GamePhaseChangeMessage.validator,
    handler: GamePhaseChangeMessage.handler
  });

  registerMessageType(TimerMessage.type, {
    validator: TimerMessage.validator,
    handler: TimerMessage.handler
  });

  registerMessageType(TurnEndedPrematurelydMessage.type, {
    validator: TurnEndedPrematurelydMessage.validator,
    handler: TurnEndedPrematurelydMessage.handler
  });

  registerMessageType(RoundChangeMessage.type, {
    validator: RoundChangeMessage.validator,
    handler: RoundChangeMessage.handler
  });

  registerMessageType(TurnChangeMessage.type, {
    validator: TurnChangeMessage.validator,
    handler: TurnChangeMessage.handler
  });

  registerMessageType(SongChoicesMessage.type, {
    validator: SongChoicesMessage.validator,
    handler: SongChoicesMessage.handler
  });

  registerMessageType(NoSongPickedMessage.type, {
    validator: NoSongPickedMessage.validator,
    handler: NoSongPickedMessage.handler
  });

  registerMessageType(SingerSongDataMessage.type, {
    validator: SingerSongDataMessage.validator,
    handler: SingerSongDataMessage.handler
  });
};