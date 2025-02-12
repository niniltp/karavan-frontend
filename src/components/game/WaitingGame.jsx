import { useState, useEffect } from "react"
import { useMantineTheme, Group, Stack, Container, Avatar, Text, Title, Button, LoadingOverlay, ActionIcon} from "@mantine/core";
import { useLocation, useParams} from "react-router-dom";
import { roomApi } from '../../api/roomApi.js';
import { CheckIcon, Cross2Icon } from "@radix-ui/react-icons";
import { FaCrown } from "react-icons/fa";
import classes from "../../styles/WaitingGame.module.css";
import { useWebSocketContext }  from '../../websocket/WebSocketContext.jsx';
import { WSmsgTypes, RoomStatus, } from '../../helpers/constants.js';
import { handleError } from "../../helpers/errorHandler.js";
import { Logger } from "../../utils/logger.js";

const AVATAR_IMG = "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-8.png";

function WaitingGame({ currentPlayer, setCurrentPlayer, setRoomStatus}) {
  const { state } = useLocation();
  const params = useParams();
  const roomId = params?.roomId;

  const [room, setRoom] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const isCurrentPlayer = (id) => id === currentPlayer?.id;
  const isPlayerReady = (id) => room.players.find(p => p.id === id)?.ready;
  const isPlayerOwner = (id) => id === room.owner;

  const { sendJsonMessage, WSstores, WSisConnected } = useWebSocketContext();

  const theme = useMantineTheme();

  const handleReadyButton = () => {
    roomApi
      .setPlayerReady(roomId, currentPlayer?.name, !currentPlayer?.ready)  // TODO : replace name by cookie in header
      .then(() => {
        setCurrentPlayer((prev) => ({...prev, ready: !prev.ready }));
      })
      .catch((err) => {
        Logger.error(err);
        handleError(err.code);

      });
  }

  const handleStartButton = () => {
    roomApi
      .start(roomId)
      .then(() => {
        setRoomStatus(RoomStatus.PLAYING);
      })
      .catch((err) => {
        Logger.error(err);
        handleError(err.code);
      });
  }

  const handleRemoveButton = (playerId) => {  
    roomApi
      .removePlayer(roomId, playerId)
      .catch((err) => {
        Logger.error(err);
        handleError(err.code);
      });
  }

  // Start game
  useEffect(() => {
    if(WSstores?.game_start !== null) {
      setRoomStatus(RoomStatus.PLAYING);
    }
  }, [WSstores?.game_start]);
  
  // Update whole room
  useEffect(() => {
    if(WSstores[WSmsgTypes.ROOM_STATE] !== null) {
      setRoom(WSstores[WSmsgTypes.ROOM_STATE]);
    } else {
      roomApi.getById(roomId)
      .then(setRoom)
      .catch((err) => {
        Logger.error(err);
        handleError(err.code);
      })
      .finally(() => setIsLoading(false));
    }
  }, [WSstores?.room_state]);

  // Update players state (ready/unready)
  useEffect(() => {
    if(WSstores[WSmsgTypes.PLAYER_READY] !== null) {
      const updatedPlayerId = WSstores[WSmsgTypes.PLAYER_READY].playerName;
      const updatedReadyState = WSstores[WSmsgTypes.PLAYER_READY].ready;

      const newPlayersState = room?.players?.map((player) => {
        if(player.name === updatedPlayerId) {
          return {...player, ready: updatedReadyState }
        } else return player;
      });

      setRoom((prev) => {
        return {
          ...prev,
          players: newPlayersState
        }
      });
    }
  }, [WSstores[WSmsgTypes.PLAYER_READY]]);

  return (
    <Container className={classes.wrapper}>
      { isLoading ? 
        <LoadingOverlay visible={isLoading} /> : 
        <Container>
          <Title order={3} pb="1rem">Welcome to your private karaoke room !</Title>
          <Stack
            p="1rem"
            align="stretch"
            justify="center"
            gap="md"
            className={classes.listPlayers}
          >
            {/* List of players in room */}
            {room.players.map(player => (
              <Group wrap="nowrap" key={player.id} justify="flex-start" classeName={classes.temp} >
                {/* Show icon only if player is ready */}
                <CheckIcon className={isPlayerReady(player.id) ? '' : classes.hidden} style={{ width: 20, height: 20 }}/>
                <Group wrap="nowrap" justify="space-between" 
                  className={isCurrentPlayer(player.id) ? classes.currentPlayer : classes.otherPlayer}>
                  <Group wrap="nowrap">
                    <Avatar
                    src={AVATAR_IMG}
                    radius="xl"
                    />
                    <Text truncate="end" size="sm" fw={500} className={classes.namePlayer}>{player.name}</Text>
                    {/* Show icon only if player is owner */}
                    <FaCrown className={isPlayerOwner(player.id) ? '' : classes.hidden} style={{ width: 18, height: 18, paddingBottom: 2, color: theme.colors.yellow[4] }}/>
                  </Group>
                  {/* Show Ready button only if its the current player AND responsive behavior */}
                  {isCurrentPlayer(player.id) ? <Button onClick={handleReadyButton} visibleFrom="xs" variant="gradient" size="xs" gradient={{ from: 'teal', to: 'green', deg: 90 }}>Ready</Button> : ""}
                </Group>
                {/* Show remove button only if current player is owner AND owner cannot be removed */}
                <ActionIcon onClick={() => {handleRemoveButton(player.id)}} className={isPlayerOwner(currentPlayer.id) && player.id !== room.owner ? '' : classes.hidden} variant="subtle" color="red" size="sm" radius="md" aria-label="Remove">
                  <Cross2Icon style={{ width: 15, height: 15 }}/> 
                </ActionIcon>
              </Group>
              ))}
              <Group justify="center" >
                {/* Show Ready button only if player is current player AND responsive behavior */}
                <Group justify="center" hiddenFrom="xs">
                  <Button onClick={handleReadyButton} 
                    variant="gradient" size="sm" gradient={{ from: 'teal', to: 'green', deg: 90 }}>Ready</Button>
                </Group>
                {/* Show Start button only if current player is owner */}
                {isPlayerOwner(currentPlayer.id) ? 
                  <Group justify="center" >
                    <Button onClick={handleStartButton} 
                      variant="gradient" size="sm" gradient={{ from: 'yellow', to: 'orange', deg: 124 }}>Start game</Button>
                  </Group> : ""}
              </Group>
          </Stack>
        </Container>
      }   
    </Container>
  );
}

export default WaitingGame;