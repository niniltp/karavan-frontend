import { useState, useEffect } from 'react'
import { useForm } from '@mantine/form';
import { Container, Title, Button, TextInput} from "@mantine/core";
import { useNavigate } from 'react-router-dom';
import { roomApi } from '../../api/roomApi.js';
import { handleError } from '../../helpers/errorHandler.js';
import { Logger } from "../../utils/logger.js";

function CreateGameRoom() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [hasFetched, setHasFetched] = useState(false);
  const [data, setData] = useState({}); // TODO: define if need to custom room

  const handleSubmit = async (formData) => {
    roomApi.create(formData)
      .then( (room) => {
        Logger.log(`New room created (id: ${room.id})`);
        navigate(`/room/${room.id}`);
      })
      .catch((err) => {
        Logger.error(err);
        handleError(err.code);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  useEffect(() => {
    if(hasFetched) {
      return;
    }

    setHasFetched(true);
    if(isLoading) {
      handleSubmit(data);
    }
  }, []);

  // TODO : To complete if need to custom room
  // return (
  //   <Container>
  //     <form onSubmit={form.onSubmit(handleSubmit)}>
  //         <Button onClick={handleSubmit}>Create room</Button>
  //     </form>
  //   </Container>
  // );
  return;
}

export default CreateGameRoom;