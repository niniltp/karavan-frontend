import { useEffect, useState } from 'react';
import { Loader, Stack, Text} from "@mantine/core";
import classes from "../../../styles/GuesserView.module.css";

function GuesserView() {
  const [isLoading, setIsLoading] = useState(true);
  
  // Update whole room
  useEffect(() => {
    setIsLoading(false);
  }, []);

  return (
    <div className={classes.wrapper} >
      <Stack gap="lg" align="center" >
        <Loader />
        <Text>Waiting for the singer to pick a song...</Text>
      </Stack>
    </div>
  );
}

export default GuesserView;