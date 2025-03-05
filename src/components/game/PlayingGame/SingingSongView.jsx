import { useEffect, useState } from 'react';
import { Container, LoadingOverlay, Group, Stack, Card, Button, TextInput, Text, Title} from "@mantine/core";
import classes from "../../../styles/SingingSongView.module.css";
import { Logger } from "../../../utils/logger.js";
import { useWSMessageStore }  from '../../../websocket/WebSocketContext.jsx';
import { WSmsgTypes } from '../../../helpers/constants.js';

const cleanTextLineBreaks = (text) => {
  let newText = text.replace(/\n{2,}/g, '\n');
  return newText;
}

function SingingSongView() {
  const [isLoading, setIsLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [lyrics, setLyrics] = useState('');

  const localWSstores = {
    songData: null
  };
  
  localWSstores.songData = useWSMessageStore(WSmsgTypes.SINGER_SONG_DATA);
  
  // // Update whole room
  // useEffect(() => {
  //   Logger.log("Game status changed");
  // }, [gameData?.status?.type]);

  useEffect(() => {
    if(localWSstores.songData) {
      Logger.log("Received song data:", localWSstores.songData);
      setTitle(localWSstores.songData.title);
      setArtist(localWSstores.songData.artist);
      setLyrics(localWSstores.songData.lyrics);
      setIsLoading(false);
    }
  }, [localWSstores.songData])


  return (
    <Container className={classes.wrapper}>
      <Title order={5}>{title}</Title>
      <Text fs="italic">{artist}</Text>
      <Stack mt={20} gap="xs">
        {lyrics && cleanTextLineBreaks(lyrics).split('\n').map(function(item, index) {
              return (
                <Text key = {index} className={classes.lyricLine}>
                  {item}
                  <br/>
                </Text>
              )
          })}
      </Stack>
    </Container>
  );
}

export default SingingSongView;