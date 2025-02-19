import { useEffect, useState } from 'react';
import { Container, LoadingOverlay, Group, Stack, Card, Button, TextInput, Text, Title} from "@mantine/core";
import classes from "../../../styles/PlayingGameContent.module.css";
import SingerView from './SingerView.jsx';
import GuesserView from './GuesserView.jsx';
import TimerGame from '../common/TimerGame.jsx';
import { isPlayerSingerFromGameData } from '../../../helpers/gameHelpers.js';

function PlayingGameContent({ tempTestTimer, currentPlayer, gameData }) {
  const [gameStatus, setGameStatus] = useState(null);
  
  // Update whole room
  useEffect(() => {
    setGameStatus(gameData?.status?.type);
  }, [gameStatus]);

  return (
    <Card shadow="sm" radius="lg" p="md" className={classes.wrapper}>
      <Title order={4}>Game</Title>
      <TimerGame tempTestTimer={tempTestTimer} />
      {isPlayerSingerFromGameData(currentPlayer.id, gameData) ? <SingerView gameData={gameData} /> : <GuesserView />}
    </Card>
  );
}

export default PlayingGameContent;