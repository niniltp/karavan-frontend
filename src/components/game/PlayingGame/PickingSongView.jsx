import { useEffect, useState } from 'react';
import { Container, LoadingOverlay, Group, Stack, Card, Button, TextInput, Text, Title} from "@mantine/core";
import classes from "../../../styles/PickingSongView.module.css";
import { Logger } from "../../../utils/logger.js";
import SongCD from '../common/SongCD.jsx';
import { getRandomArrayFromArray } from '../../../utils/random.js';

function PickingSongView({ gameData, songs }) {
  const [isLoading, setIsLoading] = useState(true);

  const gallery = Object.values(import.meta.glob('@assets/cds/*.{png,jpg,jpeg,PNG,JPEG}', { eager: true, as: 'url' }))
  const CDs = getRandomArrayFromArray(3, gallery);

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
            <SongCD key={song.id} src={CDs[index]} song={song} handleClick={handleSongPicked}  />
          ))}
      </Group>
    </div>
  );
}

export default PickingSongView;