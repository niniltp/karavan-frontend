export const isCurrentPlayer = (id, currentPlayer) => id === currentPlayer?.id;
export const isPlayerSingerFromGameData = (id, gameData) => id === gameData?.turns[gameData?.currentTurn]?.playerId;
export const isPlayerOwner = (id, owner) => id === owner;
export const hasPlayerFoundSongFromGameData = (id, gameData) => gameData?.turns[gameData?.currentTurn]?.guessers?.includes(id);
export const getNameSingerFromRoomData = (room) => {
  const singerId = room?.gameData?.turns[gameData?.currentTurn]?.playerId;
  return room?.players.find(p => p.id === singerId)?.name;
};