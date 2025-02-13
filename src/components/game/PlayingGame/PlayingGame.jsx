import { useEffect, useState } from 'react';
import { Container, LoadingOverlay, Group, Stack, Button, TextInput, Text, Title} from "@mantine/core";
import { roomApi } from '../../../api/roomApi.js';
import { useWebSocketContext }  from '../../../websocket/WebSocketContext.jsx';
import { WSmsgTypes } from '../../../helpers/constants.js';
import PlayersList from './PlayersList.jsx';
import PlayingGameContent from './PlayingGameContent.jsx';
import classes from "../../../styles/PlayingGame.module.css";
import { handleError } from '../../../helpers/errorHandler.js';
import { Logger } from "../../../utils/logger.js";

function PlayingGame({ roomId, currentPlayer }) {
  const [room, setRoom] = useState(null);
  const [isLoadingRoom, setIsLoadingRoom] = useState(true);
  // const [timer, setTimer] = useState(0);
  const [timer, setTimer] = useState("");

  const { WSstores } = useWebSocketContext();

  const updateGameTurn = (round, turn) => {
    setRoom({
      ...room,
      game: {
       ...room.game,
        currentTurn: turn,
        currentRound: round
      }
    })
  }

  // Update whole room
  useEffect(() => {
    // if(WSstores[WSmsgTypes.ROOM_STATE] !== null) {
    //   setRoom(WSstores[WSmsgTypes.ROOM_STATE]);
    //   setIsLoadingRoom(false);
    // } else {
      roomApi.getById(roomId)
      .then((r) => {
        setRoom(r);
      })
      .catch((err) => {
        Logger.error(err);
        handleError(err.code);
      })
      .finally(() => setIsLoadingRoom(false));
    // }
  }, [WSstores[WSmsgTypes.ROOM_STATE]]);

  useEffect(() => {
    if(WSstores[WSmsgTypes.TIMER]) {
      setTimer(WSstores[WSmsgTypes.TIMER]);
    }
  }, [WSstores[WSmsgTypes.TIMER]]);

  useEffect(() => {
    if(WSstores[WSmsgTypes.TURN_CHANGE]) {
      updateGameTurn(WSstores[WSmsgTypes.TURN_CHANGE].round, WSstores[WSmsgTypes.TURN_CHANGE].turn);
    }
  }, [WSstores[WSmsgTypes.TURN_CHANGE]]);
  
  if(isLoadingRoom) {
    return (
      <Container fluid className={classes.wrapper}>
        <LoadingOverlay visible={isLoadingRoom} zIndex={1000} />
    </Container>
    )
  }

  return (
    <Container fluid className={classes.wrapper}>
      <Group grow preventGrowOverflow={false} align="flex-start" justify="center" gap="xl">
        <PlayersList owner={room?.owner} players={room?.players} currentPlayer={currentPlayer} gameData={room?.game}/>
        <PlayingGameContent timer={timer} players={room?.players} currentPlayer={currentPlayer} gameData={room?.game} />
      </Group>
    </Container>
  );
}

export default PlayingGame;