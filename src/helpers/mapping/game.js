export const Game = {
  validator: (game) => {
    const isValid = typeof game?.status?.type === 'string' && // TODO : check if in GamePhase enum
                    // game?.status?.detail == null ||  // Type of detail depends on game status
                    typeof game?.config?.num_rounds === 'number' &&
                    typeof game?.config?.turn_duration === 'number' &&
                    typeof game?.current_round === 'number' &&
                    typeof game?.current_turn === 'number'
                    Array.isArray(game?.rounds)

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
        turnDuration: APIgame.config?.turn_duration
      },
      APIgame.current_round,
      APIgame.current_turn,
      Game.mapRoundsFromAPI(APIgame.rounds));

    return game;
  },
  mapRoundsFromAPI: (APIRounds) => {
    const rounds = [];

    APIRounds?.forEach((APIround) => {
      const round = [];
      APIround?.forEach((APIturn) => {
        const turn = {
          playerId: APIturn.player_id,
          song: APIturn.song,
          guessers: APIturn.guessers
        }
        round.push(turn);
      });
      rounds.push(round);
    });

    return rounds;
  },
  create: (status, config, currentRound=0, currentTurn=0, rounds=[]) => {
    const game = {
      status: status,
      config: config,
      currentRound: currentRound,
      currentTurn: currentTurn,
      rounds: rounds
    }
  
    return game;
  }
}