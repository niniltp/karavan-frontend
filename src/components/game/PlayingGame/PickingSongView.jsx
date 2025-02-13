import { useEffect, useState } from 'react';
import { Container, LoadingOverlay, Group, Stack, Card, Button, TextInput, Text, Title} from "@mantine/core";
import classes from "../../../styles/PickingSongView.module.css";
import { Logger } from "../../../utils/logger.js";
import SongCD from '../common/SongCD.jsx';
import { getRandomArrayFromArray } from '../../../utils/random.js';

function PickingSongView({ gameData, songs }) {
  const [isLoading, setIsLoading] = useState(true);

  // const gallery = Object.values(import.meta.glob('@assets/cd_*.{png,jpg,jpeg,PNG,JPEG}', { eager: true, query: '?url', import: 'default' }))
  const [CDsGallery, setCDsGallery] = useState([]);

  useEffect(() => {
    let images = [];
    fetch("/CDs/images.json")
      .then((res) => res.json())
      .then((files) => {
        files.map((file) => images.push(`/CDs/${file}`));
        setCDsGallery(getRandomArrayFromArray(3, images));
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
      <Title order={5}>Pick a song</Title>
      <Group className={classes.groupWrapper} grow justify="space-between" align="center">
          {songs.map((song, index) => (
            <SongCD key={song.id} src={CDsGallery[index]} song={song} handleClick={handleSongPicked}  />
          ))}
      </Group>
    </div>
  );
}

export default PickingSongView;