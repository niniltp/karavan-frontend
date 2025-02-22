import { useEffect, useState } from 'react';
import { Container, LoadingOverlay, Group, Stack, Card, Button, TextInput, Text, Title} from "@mantine/core";
import Chat from '../common/Chat.jsx';
// import classes from "../../../styles/GuessingSongView.module.css";

function GuessingSongView({ roomId, currentPlayer, players }) {
  // const [isLoading, setIsLoading] = useState(true);

  // if(isLoading) {
  //   return (
  //     <Container fluid className={classes.wrapper}>
  //       <LoadingOverlay visible={isLoading} zIndex={1000} />
  //     </Container>
  //   )
  // }

  return (
    <div /*className={classes.wrapper}*/>
      <Text size="xl" py={10} >Guess the song title !</Text>
      <Chat roomId={roomId} currentPlayer={currentPlayer} players={players} />
    </div>
  );
}

export default GuessingSongView;