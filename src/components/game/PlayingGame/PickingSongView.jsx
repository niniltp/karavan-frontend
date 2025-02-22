import { useEffect, useState } from 'react';
import { Container, LoadingOverlay, Group, Stack, Card, Button, TextInput, Text, Title} from "@mantine/core";
import classes from "../../../styles/PickingSongView.module.css";
import { Logger } from "../../../utils/logger.js";
import SongCD from '../common/SongCD.jsx';
import { getRandomArrayFromArray } from '../../../utils/random.js';
import { SONG_CHOICES_MAX_LENGTH, WSmsgTypes } from '../../../helpers/constants.js';
import { useWSMessageStore } from '../../../websocket/WebSocketContext.jsx';

function PickingSongView() {
  const [isLoading, setIsLoading] = useState(true);
  const [songs, setSongs] = useState([]);
  const [CDsGallery, setCDsGallery] = useState([]);

  const localWSstores = {
    songChoices: null
  };
  // Retrieve song choices from WS message
  localWSstores.songChoices = useWSMessageStore(WSmsgTypes.SONG_CHOICES);

  // Load and pick random CD images
  useEffect(() => {
    let images = [];
    fetch("/CDs/images.json")
      .then((res) => res.json())
      .then((files) => {
        files.map((file) => images.push(`/CDs/${file}`));
        setCDsGallery(getRandomArrayFromArray(SONG_CHOICES_MAX_LENGTH, images));
      })
      .catch((err) => {
        throw new Error("Error loading CD images", err); // TODO: refactor with error code etc
      });
  }, []);
  

  const handleSongPicked = (song) => {
    // TODO : send to server
    Logger.log(`Picked song: ${song.title} (id: ${song.id})`);
  };

  useEffect(() => {
    if(localWSstores.songChoices.songs.length > 0) {
      setSongs(localWSstores.songChoices.songs);
      setIsLoading(false);
    } else {
      throw new Error("[WEBSOCKET] Missing song choices"); // TODO: refactor with error code etc
    }
  }, [localWSstores.songChoices]);

  // if(isLoading) {
  //   return (
  //     <Container fluid className={classes.wrapper}>
  //       <LoadingOverlay visible={isLoading} zIndex={1000} />
  //     </Container>
  //   )
  // }

  return (
    <div /*className={classes.wrapper}*/>
      <Stack gap="xl">
        <Text fw={700} >It's your turn to sing. Pick a song !</Text>
        <Group className={classes.groupWrapper} grow justify="space-between" align="center">
            {songs.map((song, index) => (
              <SongCD key={song.id} src={CDsGallery[index]} song={song} handleClick={handleSongPicked}  />
            ))}
        </Group>
      </Stack>
    </div>
  );
}

export default PickingSongView;