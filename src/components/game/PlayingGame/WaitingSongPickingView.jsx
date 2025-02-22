import { Container, Loader, Stack, Text } from "@mantine/core";
// import classes from "../../../styles/WaitingSongPickingView.module.css";

function WaitingSongPickingView() {
  return (
    <div /*className={classes.wrapper}*/>
      <Stack gap="lg" align="center" >
        <Loader />
        <Text>Waiting for the singer to pick a song...</Text>
      </Stack>
    </div>
  );
}

export default WaitingSongPickingView;