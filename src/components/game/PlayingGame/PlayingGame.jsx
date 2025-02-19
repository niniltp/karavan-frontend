import { useEffect, useState } from 'react';
import { Container, LoadingOverlay, Group, Stack, Button, TextInput, Text, Title} from "@mantine/core";
import { roomApi } from '../../../api/roomApi.js';
import { useWSMessageStore }  from '../../../websocket/WebSocketContext.jsx';
import { WSmsgTypes } from '../../../helpers/constants.js';
import PlayersList from './PlayersList.jsx';
import PlayingGameContent from './PlayingGameContent.jsx';
import classes from "../../../styles/PlayingGame.module.css";
import { handleError } from '../../../helpers/errorHandler.js';
import { Logger } from "../../../utils/logger.js";

function PlayingGame({ roomId, currentPlayer }) {
  const [room, setRoom] = useState(null);
  const [isLoadingRoom, setIsLoadingRoom] = useState(true);

  const localWSstores = {
    roomState: null,
    turnChange: null
  };
  
  localWSstores.roomState = useWSMessageStore(WSmsgTypes.ROOM_STATE);
  localWSstores.turnChange = useWSMessageStore(WSmsgTypes.TURN_CHANGE);

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
    // if(localWSstores.roomState !== null) {
    //   setRoom(localWSstores.roomState);
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
  }, [localWSstores.roomState]);

  useEffect(() => {
    if(localWSstores.turnChange) {
      updateGameTurn(localWSstores.turnChange.round, localWSstores.turnChange.turn);
    }
  }, [localWSstores.turnChange]);
  
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
        <PlayingGameContent currentPlayer={currentPlayer} gameData={room?.game} />
      </Group>
    </Container>
  );
}

export default PlayingGame;