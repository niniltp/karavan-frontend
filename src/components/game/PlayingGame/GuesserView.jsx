import WaitingSongPickingView from "./WaitingSongPickingView.jsx";
import GuessingSongView from "./GuessingSongView.jsx";
import classes from "../../../styles/GuesserView.module.css";
import { GameStatus } from '../../../helpers/constants.js';

function GuesserView( { gameData, roomId, currentPlayer, players } ) {
  return (
    <div className={classes.wrapper} >
      {/* TODO : only for test, remove later */}
      {gameData?.status?.type === "playing_round" ? <WaitingSongPickingView /> : ''} 
      {gameData?.status?.type === GameStatus.PICKING_SONG ? <WaitingSongPickingView /> : ''}
      {gameData?.status?.type === GameStatus.GUESSING_SONG ? <GuessingSongView roomId={roomId} currentPlayer={currentPlayer} players={players} /> : ''}
    </div>
  );
}

export default GuesserView;