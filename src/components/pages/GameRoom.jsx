import { useState, useEffect } from "react"
import { Group, Stack, Container, Avatar, Text, Title, Button, LoadingOverlay} from "@mantine/core";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { roomApi } from '../../api/roomApi.js';
import { playerApi } from '../../api/playerApi.js';
import WaitingGame from "../game/WaitingGame.jsx";
import JoiningGame from "../game/JoiningGame.jsx";
import PlayingGame from "../game/PlayingGame/PlayingGame.jsx";
import Error404Page from "./Error404Page.jsx";
import Cookies from "js-cookie";
import classes from "../../styles/GameRoom.module.css";
import { WebSocketProvider }  from '../../websocket/WebSocketContext.jsx';
import { RoomStatus } from "../../helpers/constants.js";
import LeaderBoardGame from "../game/LeaderboardGame.jsx";
import { handleError } from "../../helpers/errorHandler.js";
import { Logger } from "../../utils/logger.js";

const SESSION_COOKIE_NAME = "player_cookie";

const useFetchPlayer = (roomId) => {
  const [currentPlayer, setCurrentPlayer] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // const getSessionCookie = () => {
  //   Logger.log(`Cookie: ${Cookies.get(SESSION_COOKIE_NAME)}`);
  //   return Cookies.get(SESSION_COOKIE_NAME);
  // };

  const isPlayerMissingInfo = () => {
    return currentPlayer == null || currentPlayer.name == null || currentPlayer.id == null || 
      currentPlayer.ready == null || currentPlayer.connected == null || currentPlayer.roomId == null;
  }

  useEffect(() => {
    if (!roomId) return { currentPlayer, isLoading, error };

    // If cookie exists but player state is missing, fetch player info from server
    // if(getSessionCookie()) {
      if(isPlayerMissingInfo()) {
        // Retrieve user data from session
        playerApi.getPlayerBySession(roomId)
          .then((player) => {
              setCurrentPlayer({
                ...player,
                // session: getSessionCookie(),
                roomId: roomId
              });
          })
          .catch((err) => {
            Logger.error(err);
            setError(err);  // TODO : not used yet
            handleError(err.code);
          })
          .finally(() => {
            setIsLoading(false);
          }) 
      }
    // }
  }, [roomId]);

  return { currentPlayer, isLoading, error};
}

function GameRoom() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const params = useParams();
  const roomId = params?.roomId;

  const [room, setRoom] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPlayer, setCurrentPlayer] = useState(null);
  const [error, setError] = useState(null); // TODO : change ?
  const [roomStatus, setRoomStatus] = useState(RoomStatus.WAITING); // TODO : temp

  const { loadedPlayer, isLoadingPlayer, errorPlayer } = useFetchPlayer(roomId);

  useEffect(() => {
    if(state?.room) {    // TODO : Check si nécessaire
      setRoom(state.room);
      setIsLoading(false);
    } else {
      roomApi.getById(roomId)
        .then(setRoom)
        .catch((err) => {
          Logger.error(err);
          setError(err);
          handleError(err.code);
        })
        .finally(() => setIsLoading(false));
    }

    if(loadedPlayer != null) {
      setCurrentPlayer(loadedPlayer);
    }
  }, [roomStatus]);

  useEffect(() => {
    // TODO : change according to error code
    if(error) {
      navigate('/');
    }
  }, [error]);

  if(isLoading || isLoadingPlayer) {
    return <LoadingOverlay active={true} />
  }

  if(currentPlayer == null || currentPlayer?.roomId != roomId) { // TODO : refactor condition in new function
    return (
      <Container size="xl" className={classes.wrapper}>
        <JoiningGame roomId={room?.id} setCurrentPlayer={setCurrentPlayer}/>
      </Container>
    )
  }
  // TODO : setRoomStatus is TEMP
  return (
    <Container fluid className={classes.wrapper}>
      <WebSocketProvider roomId={roomId} playerId={currentPlayer.id}>
        {room?.roomStatus === RoomStatus.WAITING ? <WaitingGame currentPlayer={currentPlayer}
                                                      setCurrentPlayer={setCurrentPlayer} 
                                                      setRoomStatus={setRoomStatus}
                                                      /> : ''}
        {room?.roomStatus === RoomStatus.PLAYING ? <PlayingGame roomId={roomId}
                                                      currentPlayer={currentPlayer}
                                                      /> : ''}
        {room?.roomStatus === RoomStatus.FINISHED ? <LeaderBoardGame 
                                                      /> : ''}
      </WebSocketProvider>
    </Container>
  )
}

export default GameRoom;