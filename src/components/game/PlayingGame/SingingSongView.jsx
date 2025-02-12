import { useEffect, useState } from 'react';
import { Container, LoadingOverlay, Group, Stack, Card, Button, TextInput, Text, Title} from "@mantine/core";
// import classes from "../../../styles/SingingSongView.module.css";
import { Logger } from "../../../utils/logger.js";

function SingingSongView({ title, artist, lyrics, src}) {
  // const [isLoading, setIsLoading] = useState(true);


  // Update whole room
  useEffect(() => {
    // setIsLoading(false);
  }, []);

  return (
    <div /*className={classes.wrapper}*/>
      <Title order={5}>Sing the song !</Title>

    </div>
  );
}

export default SingingSongView;