import { useEffect } from "react";
import { Container, Card, Text, Button, ActionIcon, Image, BackgroundImage } from "@mantine/core"
import classes from "../../../styles/SongCD.module.css";
// import cd0 from "../../../assets/CDs/cd_0.png";
import { getRandomArrayFromArray } from '../../../utils/random.js';

function SongCD({ src, song, handleClick}) {


  useEffect(() => {
  }, [src, song]);

  return (
    <Container fluid className={classes.wrapper}>
      {/* <Card shadow="sm" radius="lg" p="md"> */}
        {/* <Button onClick={() => handleClick(song)}>Pick song</Button> */}
        <ActionIcon onClick={() => handleClick(song)} className={classes.actionIcon} variant="transparent">
          <Image className={classes.actionIconImg} draggable="false" src={src}/>
        </ActionIcon>
        <Text>{song.title} by {song.artist}</Text>
      {/* </Card> */}
    </Container>
  );
}

export default SongCD;