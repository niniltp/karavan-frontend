export const isCurrentPlayer = (id, currentPlayer) => id === currentPlayer?.id;
export const isPlayerSingerFromGameData = (id, gameData) => id === gameData?.rounds[gameData?.currentRound][gameData?.currentTurn]?.playerId;
export const isPlayerOwner = (id, owner) => id === owner;
export const hasPlayerFoundSongFromGameData = (id, gameData) => gameData?.rounds[gameData?.currentRound][gameData?.currentTurn]?.guessers?.includes(id);
export const getNameSingerFromRoomData = (room) => {
  const singerId = room?.gameData?.rounds[gameData?.currentRound][gameData?.currentTurn]?.playerId;
  return room?.players.find(p => p.id === singerId)?.name;
};