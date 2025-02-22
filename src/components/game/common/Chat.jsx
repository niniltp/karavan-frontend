import { useState, useEffect } from 'react';
import { useForm } from '@mantine/form';
import { Container, LoadingOverlay, ScrollArea, Avatar, Card, Group, Button, Textarea, Stack, Text, Paper } from "@mantine/core";
// import { roomApi } from '../../api/roomApi.js';
import classes from "../../../styles/Chat.module.css";
import { handleError, getErrorUserMessage } from "../../../helpers/errorHandler.js";
import { ErrorCodes, CHAT_MAX_LENGTH, WSmsgTypes } from '../../../helpers/constants.js';
import { Logger } from "../../../utils/logger.js";
import { AVATAR_IMG } from '../../../helpers/constants.js';
import { useWSMessageStore } from '../../../websocket/WebSocketContext.jsx';
import { chatApi } from '../../../api/chatApi.js';

const getPlayerNameFromId = (id, players) => {
  return players.find((player) => player.id === id)?.name || 'Unknown';
}

function Chat({ roomId, currentPlayer, players }) {
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const localWSstores = {
    chatMessages: null
  };
  // Retrieve song choices from WS message
  localWSstores.chatMessages = useWSMessageStore(WSmsgTypes.CHAT_NEW_MSG);

  const form = useForm({
    initialValues: {
      message: ''
    },
    validate: {
      message: (value) => {
        if (!value) {
          return getErrorUserMessage(ErrorCodes.CHAT_EMPTY_MSG);
        }

        if (value?.length > CHAT_MAX_LENGTH) {
          return getErrorUserMessage(ErrorCodes.CHAT_MAX_LENGTH);
        }
        
        return null;
      }
    }
  });

  const handleSubmit = async (formData) => {
    chatApi.send(roomId, currentPlayer.id, formData.message) // TODO : check sanitize input user
    .catch( (err) => {
      Logger.error(err);
      handleError(err.code);
    });
  }

  useEffect(() => {
    chatApi.getHistory(roomId)
     .then(setChatHistory)
     .catch((err) => {
        Logger.error(err);
        handleError(err.code);
      })
      .finally(() => {
        setIsLoading(false);
      });;
  }, []);

  useEffect(() => {
    if(localWSstores.chatMessages) {
      const senderName = getPlayerNameFromId(localWSstores.chatMessages.senderId, players);
      setChatHistory([
        ...chatHistory,
        {
          senderId: localWSstores.chatMessages.senderId,
          senderName: senderName,
          content: localWSstores.chatMessages.content
        }]);
      Logger.log(`[WEBSOCKET] New message received from ${senderName}`);
    }
  }, [localWSstores.chatMessages]);

  // const TESTmsg = [
  //   {sender: 'someone', content: 'Hello'},
  //   {sender: 'potatoe', content: 'Salut'},
  //   {sender: 'someone', content: 'hi !'},
  //   {sender: 'inconnu', content: 'Reprehenderit enim exercitation aute in consectetur. Proident in laborum cupidatat non elit id proident laborum minim. Incididunt aute occaecat sunt velit veniam deserunt fugiat sunt eu aliqua cupidatat laboris nisi id. Ullamco occaecat est elit consequat. Sit amet voluptate qui non excepteur adipisicing eiusmod nostrud cillum Lorem laboris qui ex. Consequat irure fugiat incididunt est.'},
  //   {sender: 'inconnu', content: 'Reprehenderit enim exercitation aute in consectetur. Proident in laborum cupidatat non elit id proident laborum minim. Incididunt aute occaecat sunt velit veniam deserunt fugiat sunt eu aliqua cupidatat laboris nisi id. Ullamco occaecat est elit consequat. Sit amet voluptate qui non excepteur adipisicing eiusmod nostrud cillum Lorem laboris qui ex. Consequat irure fugiat incididunt est.'},
  //   {sender: 'inconnu', content: 'Reprehenderit enim exercitation aute in consectetur. Proident in laborum cupidatat non elit id proident laborum minim. Incididunt aute occaecat sunt velit veniam deserunt fugiat sunt eu aliqua cupidatat laboris nisi id. Ullamco occaecat est elit consequat. Sit amet voluptate qui non excepteur adipisicing eiusmod nostrud cillum Lorem laboris qui ex. Consequat irure fugiat incididunt est.'},
  //   {sender: 'someone', content: 'Ad laboris magna cillum est sunt incididunt non aute aliqua. !'}
  // ]

  return (
    <Card radius="lg" className={classes.wrapper}>
      <ScrollArea h={500} offsetScrollbars scrollbarSize={14} scrollHideDelay={500}>
        <LoadingOverlay visible={isLoading} zIndex={1000} />
        <Stack ta="justify" align="flex-start" justify="flex-end" gap="xs" p={10} >
          {chatHistory.map((message, index) => {
            return (
              <div key={index} >
                <Text fw={500} size="sm" pl={60} variant="gradient" gradient={{ from: 'blue', to: 'grape', deg: 347 }}>{message.senderName}</Text>
                <Group wrap="nowrap">
                  <Avatar
                  src={AVATAR_IMG}
                  radius="xl"
                  />
                  <Paper className={classes.chatMessage} shadow="md" radius="xl" pt="sm" pr="lg" pb="sm" pl="lg">
                    <Text>{message.content}</Text>
                  </Paper>
                </Group>
              </div>
            )
          })}
        </Stack>
      </ScrollArea>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Group justify="center" mt="md">
          <Textarea
            radius="lg"
            placeholder="Song title"
            autosize
            maxRows={5}
            className={classes.chatInput}
            key={form.key('message')}
            {...form.getInputProps('message')}
          />
          <Button radius="xl" type="submit" variant="gradient" gradient={{ from: 'teal', to: 'green', deg: 90 }}>Send</Button>
        </Group>
      </form>
    </Card>
  );
}

export default Chat;