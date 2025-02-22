// import classes from "../../../styles/TimerGame.module.css";
import { useWSMessageStore }  from '../../../websocket/WebSocketContext.jsx';
import { WSmsgTypes } from '../../../helpers/constants.js';
import { Text } from '@mantine/core'

function TimerGame() {

  const localWSstores = {
    timer: null
  };

  localWSstores.timer = useWSMessageStore(WSmsgTypes.TIMER);

  return (
    <div /*className={classes.wrapper}*/>
      <Text>{localWSstores.timer?.remainingTime}</Text>
    </div>
  );
}

export default TimerGame;