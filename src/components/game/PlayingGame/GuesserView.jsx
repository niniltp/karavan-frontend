import { useEffect, useState } from 'react';
import { Container, LoadingOverlay, Group, Stack, Card, Button, TextInput, Text, Title} from "@mantine/core";
// import classes from "../../../styles/GuesserView.module.css";

function GuesserView() {
  const [isLoading, setIsLoading] = useState(true);
  
  // Update whole room
  useEffect(() => {
    setIsLoading(false);
  }, []);

  return (
    <div /*className={classes.wrapper}*/>
      <Title order={5}>Guesser view</Title>
      
    </div>
  );
}

export default GuesserView;