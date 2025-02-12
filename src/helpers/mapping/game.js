export const Game = {
  validator: (game) => {
    const isValid = typeof game?.status?.type === 'string' && // TODO : check if in GameStatus enum
                    // game?.status?.detail == null ||  // Type of detail depends on game status
                    typeof game?.config?.num_rounds === 'number' &&
                    typeof game?.config?.round_duration === 'number' &&
                    typeof game?.current_round === 'number' &&
                    Array.isArray(game?.rounds) // TODO : change when API updated
                    typeof game?.current_turn === 'number' // TODO : change when API updated
                    // Array.isArray(game?.turns); // TODO : change when API updated

    return isValid;
  },
  mapFromAPI: (APIgame) => {
    if(!Game.validator(APIgame)) {
      throw new Error('Invalid data for mapping Game object'); // TODO : refactor with error code etc
    }
  
    const game = Game.create({
        type: APIgame.status?.type,
        detail: APIgame.status?.detail,
      },
      {
        nbRounds: APIgame.config?.num_rounds,
        turnDuration: APIgame.config?.round_duration
      },
      APIgame.current_round,
      APIgame.current_turn,
      Game.mapTurnFromAPI(APIgame.rounds)); // TODO : rename to 'turns' when API updated
    return game;
  },
  mapTurnFromAPI: (APITurns) => {
    const turns = [];

    APITurns?.forEach((APIturn) => {
      const turn = {
        playerId: APIturn.player_id,
        song: APIturn.song,
        guessers: APIturn.guessers
      }
      turns.push(turn);
    });
    
    return turns;
  },
  create: (status, config, currentRound=0, currentTurn=0, turns=[]) => {
    const game = {
      status: status,
      config: config,
      currentRound: currentRound,
      currentTurn: currentTurn,
      turns: turns
    }
  
    return game;
  }
}