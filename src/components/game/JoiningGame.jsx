import { useState } from 'react';
import { useForm } from '@mantine/form';
import { Container, Group, Button, TextInput} from "@mantine/core";
import { roomApi } from '../../api/roomApi.js';
import classes from "../../styles/JoiningGame.module.css";
import { handleError, getErrorUserMessage } from "../../helpers/errorHandler.js";
import { PLAYER_USERNAME_MAX_LENGTH, ErrorCodes } from '../../helpers/constants.js';
import { Logger } from "../../utils/logger.js";

function JoiningGame({roomId, setCurrentPlayer}) {
  const {error, setError} = useState(null);
  const form = useForm({
    initialValues: {
      username: ''
    },
    validate: {
      username: (value) => {
        if (!value) {
          return getErrorUserMessage(ErrorCodes.PLAYER_USERNAME_EMPTY);
        }
          
        if (/[^A-Za-z0-9]+/.test(value)) {
          return getErrorUserMessage(ErrorCodes.PLAYER_USERNAME_BAD_FORMAT);
        }

        if ( value?.length > PLAYER_USERNAME_MAX_LENGTH ) {
          return getErrorUserMessage(ErrorCodes.PLAYER_USERNAME_MAX_LENGTH);
        }
        
        return null;
      }
    }
  });

  const handleSubmit = async (formData) => {
    roomApi.join(roomId, formData.username)
      .then( (player) => {
        setCurrentPlayer({
          ...player,
          roomId: roomId
        });
      })
      .catch((err) => {
        Logger.error(err);
        handleError(err.code);
      });
  }

  return (
    <Container className={classes.wrapper}>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          classNames={{ input: classes.input, label: classes.inputLabel }}
          label="Choose a name"
          placeholder="Name"
          key={form.key('username')}
          {...form.getInputProps('username')}
        />
        <Group justify="center" mt="md">
          <Button type="submit" variant="gradient" gradient={{ from: 'teal', to: 'green', deg: 90 }}>Join room</Button>
        </Group>
      </form>
    </Container>
  );
}

export default JoiningGame;