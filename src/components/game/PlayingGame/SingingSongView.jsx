import { useEffect, useState } from 'react';
import { Container, LoadingOverlay, Group, Stack, Card, Button, TextInput, Text, Title} from "@mantine/core";
import classes from "../../../styles/SingingSongView.module.css";
import { Logger } from "../../../utils/logger.js";

const cleanTextLineBreaks = (text) => {
  let newText = text.replace(/\n{2,}/g, '\n');
  return newText;
}

function SingingSongView({ title, artist, lyrics, src}) {
  // const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // setIsLoading(false);
  }, []);

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