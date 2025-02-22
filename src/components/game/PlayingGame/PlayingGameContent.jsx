import { useEffect, useState } from 'react';
import { Container, LoadingOverlay, Group, Stack, Card, Button, TextInput, Text, Title} from "@mantine/core";
import classes from "../../../styles/PlayingGameContent.module.css";
import SingerView from './SingerView.jsx';
import GuesserView from './GuesserView.jsx';
import TimerGame from '../common/TimerGame.jsx';
import { isPlayerSingerFromGameData } from '../../../helpers/gameHelpers.js';
import { useWSMessageStore } from '../../../websocket/WebSocketContext.jsx';

function PlayingGameContent({ currentPlayer, gameData, roomId, players }) {
  // const [gameStatus, setGameStatus] = useState(null);

  // useEffect(() => {
  //   setGameStatus(gameData?.status?.type);
  // }, [gameStatus]);

  return (
    <Card shadow="sm" radius="lg" p="xl" className={classes.cardWrapper}>
      <Text fw={700}>Round {gameData.currentRound}</Text>
      <TimerGame />
      {isPlayerSingerFromGameData(currentPlayer.id, gameData) ? <SingerView gameData={gameData} /> : <GuesserView gameData={gameData} roomId={roomId} currentPlayer={currentPlayer} players={players} />}
    </Card>
  );
}

export default PlayingGameContent;