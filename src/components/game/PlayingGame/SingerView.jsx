import { useEffect, useState } from 'react';
import { Container, LoadingOverlay, Group, Stack, Card, Button, TextInput, Text, Title} from "@mantine/core";
import classes from "../../../styles/SingerView.module.css";
import { GameStatus } from '../../../helpers/constants.js';
import PickingSongView from './PickingSongView.jsx';
import SingingSongView from './SingingSongView.jsx';
import { Logger } from '../../../utils/logger.js';

function SingerView({ gameData }) {
  const [isLoading, setIsLoading] = useState(true);
  
  // Update whole room
  useEffect(() => {
    Logger.log("Game status changed");
  }, [gameData?.status?.type]);

  return (
    <div className={classes.wrapper}>
      {gameData?.status?.type === GameStatus.CHOOSING_SONG ? <PickingSongView /> : ''}
      {gameData?.status?.type === GameStatus.PLAYING_ROUND ? <SingingSongView /> : ''}
    </div>
  );
}

export default SingerView;