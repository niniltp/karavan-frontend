import { Container, Group, Title, Button} from "@mantine/core";
import { Link } from 'react-router-dom';
import { notifications } from '@mantine/notifications';
import classes from "../../styles/Home.module.css";

function Home() {
  return (
    <Container className={classes.wrapper}>
      <Title order={2} size="xl" pb="1rem">Try to guess the song your friends are singing</Title>
      <Group justify="center" mt="md">
        <Link to="/new">
          <Button variant="gradient" gradient={{ from: 'teal', to: 'green', deg: 90 }}>Let's sinnnnng !</Button>
        </Link>
      </Group>
    </Container>
  );
}

export default Home;