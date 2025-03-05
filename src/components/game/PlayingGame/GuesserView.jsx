import WaitingSongPickingView from "./WaitingSongPickingView.jsx";
import GuessingSongView from "./GuessingSongView.jsx";
import classes from "../../../styles/GuesserView.module.css";
import { GamePhase } from '../../../helpers/constants.js';

function GuesserView( { gameData, roomId, currentPlayer, players } ) {
  return (
    <div className={classes.wrapper} >
      {gameData?.status?.type === GamePhase.PICKING_SONG ? <WaitingSongPickingView /> : ''}
      {gameData?.status?.type === GamePhase.GUESSING_SONG ? <GuessingSongView roomId={roomId} currentPlayer={currentPlayer} players={players} /> : ''}
    </div>
  );
}

export default GuesserView;