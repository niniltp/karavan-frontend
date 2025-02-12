import { Button, Container, Image, SimpleGrid, Text, Title } from "@mantine/core";
import { Link } from "react-router-dom";
import image from "../../assets/error404.svg";
import classes from "../../styles/Error404.module.css";

export default function Error404Page() {
  return (
    <Container className={classes.root}>
        <div>
          <Image src={image} pr="5rem" pl="5rem"/>
          <Title className={classes.title}>Something is not right...</Title>
          <Text c="dimmed" size="lg">
            The page you are trying to open does not exist. You may have mistyped the address, or the
            page has been moved to another URL. If you think this is an error, please contact the support team.
          </Text>
          <Link to="/">
            <Button variant="outline" size="md" mt="xl" className={classes.control}>
              Get back to home page
            </Button>
          </Link>
        </div>
    </Container>
  );
}