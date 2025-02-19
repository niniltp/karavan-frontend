import { useEffect, useState } from 'react';
import { Container, LoadingOverlay, Group, Stack, Card, Button, TextInput, Text, Title} from "@mantine/core";
import classes from "../../../styles/PickingSongView.module.css";
import { Logger } from "../../../utils/logger.js";
import SongCD from '../common/SongCD.jsx';
import { getRandomArrayFromArray } from '../../../utils/random.js';
import { SONG_CHOICES_MAX_LENGTH } from '../../../helpers/constants.js';


// TODO : test data
const songs = [
  { id: 1, title: 'Song 1', artist: 'Artist 1'},
  { id: 2, title: 'Song 2', artist: 'Artist 2'},
  { id: 3, title: 'Song 3', artist: 'Artist 3'}
];

function PickingSongView() {
  const [isLoading, setIsLoading] = useState(true);
  const [CDsGallery, setCDsGallery] = useState([]);

  useEffect(() => {
    let images = [];
    fetch("/CDs/images.json")
      .then((res) => res.json())
      .then((files) => {
        files.map((file) => images.push(`/CDs/${file}`));
        setCDsGallery(getRandomArrayFromArray(SONG_CHOICES_MAX_LENGTH, images));
      })
      .catch((err) => console.error("Failed to load images", err));
  }, []);
  

  const handleSongPicked = (song) => {
    // TODO : send to server
    Logger.log(`Picked song: ${song.title} (id: ${song.id})`);
  };

  // Update whole room
  useEffect(() => {
    setIsLoading(false);
  }, []);

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