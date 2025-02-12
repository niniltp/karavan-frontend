import { RoomStatus } from '../constants.js';
import { Game } from './game.js';
import { Player } from './player.js';

export const Room = {
  validator: (room) => {
    const isValid = typeof room?.room_id === 'string' &&
                    Array.isArray(room?.players) &&
                    (typeof room?.owner === 'string' || room?.owner == null) &&
                    // Game.validator(room?.game) &&
                    typeof room?.room_state === 'string'  // TODO : check if in RoomStatus enum
    return isValid;
  },
  mapFromAPI: (APIroom) => {
    if(!Room.validator(APIroom)) {
      throw new Error('Invalid data for mapping Room object'); // TODO : refactor with error code etc
    }
  
    const room = Room.create(APIroom.room_id, Player.mapArrayFromAPI(APIroom.players), APIroom.owner, Game.mapFromAPI(APIroom.game), APIroom.room_state);

    return room;
  },
  create: (id, players, owner, game, roomStatus=RoomStatus.WAITING) => {
    const room = {
      id: id,
      players: players,
      owner: owner,
      game: game,
      roomStatus: roomStatus
    }
  
    return room;
  }
}