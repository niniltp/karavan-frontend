import { useEffect } from "react";
import { Container, Card, Text, Button, ActionIcon, Image } from "@mantine/core"
import classes from "../../../styles/SongCD.module.css";

function SongCD({ src, song, handleClick}) {


  useEffect(() => {
  }, [src, song]);

  return (
    <Container fluid className={classes.wrapper}>
        <ActionIcon onClick={() => handleClick(song)} className={classes.actionIcon} variant="transparent">
          <Image className={classes.actionIconImg} draggable="false" src={src}/>
        </ActionIcon>
        <Text>{song.title} by {song.artist}</Text>
    </Container>
  );
}

export default SongCD;