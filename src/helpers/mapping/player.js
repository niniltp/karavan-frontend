export const Player = {
  validator: (player) => {
    const isValid = typeof player?.id === 'string' &&
                    typeof player?.name === 'string' &&
                    typeof player?.ready === 'boolean' &&
                    typeof player?.score === 'number' &&
                    typeof player?.connected === 'boolean'

    return isValid;
  },
  mapFromAPI: (APIplayer) => {
    if(!Player.validator(APIplayer)) {
      throw new Error('Invalid data for mapping Player object'); // TODO : refactor with error code etc
    }
  
    const player = Player.create(APIplayer.id, APIplayer.name, APIplayer.ready, APIplayer.score, APIplayer.connected);
    return player;
  },
  mapArrayFromAPI: (APIplayers) => {
    const players = [];

    APIplayers?.forEach( (APIplayer) => {
      const player = Player.mapFromAPI(APIplayer);
      players.push(player);
    })

    return players;
  },
  create: (id, name, ready=false, score=0, connected=false) => {
    const player = {
      id: id,
      name: name,
      ready: ready,
      score: score,
      connected: connected
    }
  
    return player;
  },
  createWithRoom: (id, name, ready=false, score=0, connected=false, roomId) => {
    const player = Player.create(id, name, ready, score, connected);
  
    const playerWithRoom = {
      ...player,
      roomId: roomId
    }
  
    return playerWithRoom;
  }
}