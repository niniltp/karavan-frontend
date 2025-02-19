// import classes from "../../../styles/TimerGame.module.css";
import { useWSMessageStore }  from '../../../websocket/WebSocketContext.jsx';
import { WSmsgTypes } from '../../../helpers/constants.js';

function TimerGame({tempTestTimer}) {

  const localWSstores = {
    timer: null
  };
  // TODO : only for test, to be removed
  tempTestTimer ? localWSstores.timer = tempTestTimer : localWSstores.timer = useWSMessageStore(WSmsgTypes.TIMER);

  return (
    <div /*className={classes.wrapper}*/>
      {localWSstores.timer}
    </div>
  );
}

export default TimerGame;