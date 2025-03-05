/** OTHER **/
export const PLAYER_USERNAME_MAX_LENGTH = 10;
export const SONG_CHOICES_MAX_LENGTH = 3;
export const CHAT_MAX_LENGTH = 500;

export const API_URL = import.meta.env.VITE_API_BASE_URL;

/** TODO: temp **/
export const AVATAR_IMG = "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-8.png";

/** ROOM **/
export const RoomStatus = {
  PLAYING: "playing",
  WAITING: "waiting",
  FINISHED: "finished"
};

/** GAME **/
export const GamePhase = {
  // INITIALIZED: "initialized",
  // WAITING_PLAYERS: "waiting_players",
  // WAITING_OWNER: "waiting_owner",
  PICKING_SONG: "picking_song",
  GUESSING_SONG: "guessing_song",
  SCOREBOARD: "scoreboard"
};

/** WEBSOCKET **/
// export const WEBSOCKET_ENDPOINT = '/ws';
// export const WEBSOCKET_URL = `ws://${SERVER_IP}:${SERVER_PORT}${WEBSOCKET_ENDPOINT}`;
export const WEBSOCKET_URL = import.meta.env.VITE_API_BASE_WS;

export const WSmsgTypes = {
  WAITING_PLAYERS: "waiting_for_players",
  ALL_PLAYERS_READY: "all_players_ready",
  PLAYER_READY: "player_ready",
  CHAT_NEW_MSG: "new_message",
  ROOM_STATE: "room_state",
  GAME_START: "game_start",
  GAME_PHASE_CHANGE: "phase_change",
  TIMER: "timer",
  TURN_ENDED_PREMATURELY: "turn_ended_prematurely",
  TURN_CHANGE: "turn_change",
  ROUND_CHANGE: "round_change", // TODO
  SONG_CHOICES: "pick_song",
  NO_SONG_PICKED: "no_song_chosen",
  SINGER_SONG_DATA: "singer_song_data"
};

// export const GamePhases = {
//   PICKING_SONG: "picking_song",
//   GUESSING_SONG: "guessing_song",
//   SCOREBOARD: "scoreboard"
// }

/** ERRORS **/
export const ErrorCodes = {
  PLAYER_NOT_FOUND: 101,
  PLAYER_USERNAME_EMPTY: 102,
  PLAYER_USERNAME_BAD_FORMAT: 103,
  PLAYER_USERNAME_MAX_LENGTH: 104,
  PLAYER_USERNAME_EXISTS_IN_ROOM: 105,
  ROOM_NOT_FOUND: 201,
  ROOM_FULL: 202,
  ROOM_STARTING_ALL_PLAYERS_NOT_READY: 203,
  PLAYER_READY_NOT_IN_ROOM: 204,
  PLAYER_NOT_OWNER: 205,
  CHAT_MAX_LENGTH: 306,
  CHAT_EMPTY_MSG: 307,
  UNAUTHORIZED_ACTION: 400, // Generic error code for unauthorized actions
  UNKNOWN_ERROR: 1 // Generic error code
};

export const ErrorUserMessages = {
  [ErrorCodes.PLAYER_USERNAME_EMPTY]: 'You cannot have an empty name you weirdo !',
  [ErrorCodes.PLAYER_USERNAME_BAD_FORMAT]: 'Your username can only contain letters or numbers.',
  [ErrorCodes.PLAYER_USERNAME_MAX_LENGTH]: 'Sorry, due to a shortage of characters, please use a shorter name.',
  [ErrorCodes.PLAYER_USERNAME_EXISTS_IN_ROOM]: 'Do you have an evil doppelganger ? ...or maybe YOU are the evil doppelganger. Either way, your name (and identity) has already been taken. Have you ever wondered if you were not unique ?',
  [ErrorCodes.ROOM_NOT_FOUND]: 'Oh sweetie, are you lost ? The place you are trying to go does not exist... maybe someone gave you the wrong address. Have you wondered why ?',
  [ErrorCodes.ROOM_FULL]: 'Sorry lonely soul, seems like there is no more room for you here.',
  [ErrorCodes.ROOM_STARTING_ALL_PLAYERS_NOT_READY]: 'Wait, were you trying to start playing without waiting for your friends ? That\'s not very nice.',
  [ErrorCodes.PLAYER_NOT_OWNER]: 'Sorry peasant, you are not the Ruler of this realm.',
  [ErrorCodes.CHAT_MAX_LENGTH]: 'Wow, got that much things to say ?',
  [ErrorCodes.CHAT_EMPTY_MSG]: '...hello ? Did you say something ?',
  [ErrorCodes.UNAUTHORIZED_ACTION]: 'Trying to break the rules ? Maybe you should go to school instead.',
  [ErrorCodes.UNKNOWN_ERROR]: 'An unexpected error occurred. Please try again later or contact the support team.'
}

export const NotificationTypes = {
  SUCCESS: 0,
  ERROR: 1,
  WARNING: 2,
  INFO: 3
}

export const NotificationTitles = {
  [NotificationTypes.SUCCESS]: 'Yay !',
  [NotificationTypes.ERROR]: 'Oh no ! Something went wrong...',
  [NotificationTypes.WARNING]: 'Careful there...',
  [NotificationTypes.INFO]: 'Breaking news !',
}
