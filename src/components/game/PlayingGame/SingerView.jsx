import { useEffect, useState } from 'react';
import { Container, LoadingOverlay, Group, Stack, Card, Button, TextInput, Text, Title} from "@mantine/core";
import classes from "../../../styles/SingerView.module.css";
import { GamePhase } from '../../../helpers/constants.js';
import PickingSongView from './PickingSongView.jsx';
import SingingSongView from './SingingSongView.jsx';


function SingerView({ roomId, gameData }) {
  return (
    <div className={classes.wrapper}>
      {gameData?.status?.type === GamePhase.PICKING_SONG ? <PickingSongView roomId={roomId} /> : ''}
      {gameData?.status?.type === GamePhase.GUESSING_SONG ? <SingingSongView /> : ''}
    </div>
  );
}

export default SingerView;