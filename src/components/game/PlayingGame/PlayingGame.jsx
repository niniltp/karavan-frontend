import { useEffect, useState } from 'react';
import { Container, LoadingOverlay, Group, Stack, Button, TextInput, Text, Title} from "@mantine/core";
import { roomApi } from '../../../api/roomApi.js';
import { useWSMessageStore }  from '../../../websocket/WebSocketContext.jsx';
import { WSmsgTypes, GameStatus } from '../../../helpers/constants.js';
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
    turnChange: null,
    roundChange: null,
    noSongPicked: null
  };
  
  localWSstores.roomState = useWSMessageStore(WSmsgTypes.ROOM_STATE);
  localWSstores.turnChange = useWSMessageStore(WSmsgTypes.TURN_CHANGE);
  localWSstores.roundChange = useWSMessageStore(WSmsgTypes.ROUND_CHANGE);
  localWSstores.noSongPicked = useWSMessageStore(WSmsgTypes.NO_SONG_PICKED);

  const updateGameStatus = (gameStatus) => {
    if(room && gameStatus) {  // Check if exists in constants
      setRoom({
        ...room,
        game: {
          ...room.game,
          status: {
            ...room.game.status,
            type: gameStatus
          }
        }
      });
      Logger.log(`Game status updated to ${gameStatus}`);
    }
  }

  const updateGameRoundTurn = (round, turn) => {
    setRoom({
      ...room,
      game: {
       ...room.game,
        currentTurn: turn,
        currentRound: round
      }
    })
  }

  // Update whole room when room state changes
  useEffect(() => {
    roomApi.getById(roomId)
    .then((r) => {
      setRoom(r);
      Logger.log(`New room state`);
    })
    .catch((err) => {
      Logger.error(err);
      handleError(err.code);
    })
    .finally(() => setIsLoadingRoom(false));
  }, [localWSstores.roomState]);

  useEffect(() => {
    if(localWSstores.turnChange) {
      updateGameRoundTurn(localWSstores.turnChange.round, localWSstores.turnChange.turn);
      updateGameStatus(GameStatus.PICKING_SONG); // TODO: update when new phase WS msg received
      Logger.log(`New turn : Round ${localWSstores.turnChange.round} | Turn ${localWSstores.turnChange.turn}`);
    }
  }, [localWSstores.turnChange]);

  useEffect(() => {
    if(localWSstores.roundChange) {
      updateGameRoundTurn(localWSstores.roundChange.round, localWSstores.roundChange.turn);
      updateGameStatus(GameStatus.PICKING_SONG); // TODO: update when new phase WS msg received
      Logger.log(`New round : Round ${localWSstores.roundChange.round} | Turn ${localWSstores.roundChange.turn}`);
    }
  }, [localWSstores.roundChange]);

  // Update game status when no song was picked by singer
  useEffect(() => {
    if(localWSstores.noSongPicked) {
      updateGameStatus(GameStatus.GUESSING_SONG); // TODO: update when new phase WS msg received
      Logger.log("No song picked from singer !");
    }
  }, [localWSstores.noSongPicked]);
  
  if(isLoadingRoom) {
    return (
      <Container fluid className={classes.wrapper}>
        <LoadingOverlay visible={isLoadingRoom} zIndex={1000} />
      </Container>
    )
  }

  return (
    <Container fluid className={classes.wrapper}>
      <Group className={classes.groupWrapper} grow preventGrowOverflow={false} align="flex-start" justify="center" gap="xl">
        <PlayersList owner={room?.owner} players={room?.players} currentPlayer={currentPlayer} gameData={room?.game}/>
        <PlayingGameContent currentPlayer={currentPlayer} gameData={room?.game} roomId={roomId} players={room?.players} />
      </Group>
    </Container>
  );
}

export default PlayingGame;