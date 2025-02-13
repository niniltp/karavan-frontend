import { useEffect, useState } from 'react';
import { Container, LoadingOverlay, Group, Stack, Card, Button, TextInput, Text, Title} from "@mantine/core";
import classes from "../../../styles/SingerView.module.css";
import { GameStatus } from '../../../helpers/constants.js';
import PickingSongView from './PickingSongView.jsx';
import SingingSongView from './SingingSongView.jsx';
import { Logger } from '../../../utils/logger.js';

// TODO : test data
const songs = [
  { id: 1, title: 'Song 1', artist: 'Artist 1'},
  { id: 2, title: 'Song 2', artist: 'Artist 2'},
  { id: 3, title: 'Song 3', artist: 'Artist 3'}
];

function SingerView({ gameData }) {
  const [isLoading, setIsLoading] = useState(true);
  
  // Update whole room
  useEffect(() => {
    Logger.log("Game status changed");
  }, [gameData?.status?.type]);

  return (
    <div className={classes.wrapper}>
      <Title order={5}>Singer view</Title>
      {gameData?.status?.type === GameStatus.CHOOSING_SONG ? <PickingSongView gameData={gameData} songs={songs} /> : ''}
      {gameData?.status?.type === GameStatus.PLAYING_ROUND ? <SingingSongView /> : ''}
    </div>
  );
}

export default SingerView;