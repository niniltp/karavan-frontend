import { useMantineTheme, Group, Stack, Card, Container, Avatar, Text, Title, Button, LoadingOverlay, ActionIcon} from "@mantine/core";
import clsx from "clsx";
import { FaCrown } from "react-icons/fa";
import { GiMicrophone } from "react-icons/gi";
import classes from "../../../styles/PlayersList.module.css";
import { useEffect, useState } from "react";
import { isCurrentPlayer, isPlayerSingerFromGameData, isPlayerOwner, hasPlayerFoundSongFromGameData} from '../../../helpers/gameHelpers.js';

const AVATAR_IMG = "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-8.png";

// TODO : correct duplicate users in orderedPlayers array
const orderPlayers = (players, orderIds) => {
  const playerMap = {};

  // Create a map of player IDs to player objects
  for (const player of players) {
    playerMap[player.id] = player;
  }
  const orderedPlayers = [];
  // Build the ordered players array based on the order IDs
  for (const playerTurn of orderIds) {
    if (playerTurn.playerId in playerMap) {
      orderedPlayers.push(playerMap[playerTurn.playerId]);
    }
  }

  return orderedPlayers.slice(0, players.length); // TODO: only to correct duplicate users in orderedPlayers array
  // return orderedPlayers;
}

function PlayersList({ owner, players, currentPlayer, gameData}) {
  const theme = useMantineTheme();
  const [orderedPlayers, setOrderedPlayers] = useState([]);

  // const isCurrentPlayer = (id) => id === currentPlayer?.id;
  // const isPlayerSinger = (id) => id === gameData.turns[gameData.currentTurn].playerId;
  // const isPlayerOwner = (id) => id === owner;
  // const hasFoundSong = (id) => gameData.turns[gameData.currentTurn].guessers.includes(id);

  useEffect(() => {
    setOrderedPlayers(orderPlayers(players, gameData.turns));
  }, [gameData]);

  if(!owner || !players || !currentPlayer || !gameData) {
    return; // TODO : handle error or loading state
  }

  return (
    <Card shadow="md" radius="lg" p="md" className={classes.wrapper}>
      <Title order={4}>Players list</Title>
      <Stack
        // p="0.6rem 0.2rem"
        pt="1rem"
        align="stretch"
        justify="center"
        gap="xs"
        className={classes.listPlayers}
      >
        {orderedPlayers.map((player) => (
          <Group wrap="nowrap" key={player.id} justify="flex-start" >
            <GiMicrophone className={isPlayerSingerFromGameData(player.id, gameData) ? '' : classes.hidden} style={{ width: 40, height: 40 }}/>
            <div className={clsx(classes.playerRow, isCurrentPlayer(player.id, currentPlayer) && classes.currentPlayer, hasPlayerFoundSongFromGameData(player.id, gameData) && classes.hasFoundSong)}>
              <Group wrap="nowrap" justify="space-between">
                <Group wrap="nowrap">
                  <Avatar
                  src={AVATAR_IMG}
                  radius="xl"
                  />
                  <Text truncate="end" size="sm" className={classes.namePlayer}>{player.name} {isCurrentPlayer(player.id, currentPlayer) ? " (You) " : ''}</Text>
                  {/* Show icon only if player is owner */}
                  <FaCrown className={isPlayerOwner(player.id, owner) ? '' : classes.hidden} style={{ width: 18, height: 18, paddingBottom: 2, color: theme.colors.yellow[4] }}/>
                </Group>
              </Group>
              <Text align="right" size="sm" fw={500} className={classes.scorePlayer}>{player.score}</Text>
            </div>
          </Group>
        ))}
      </Stack>
    </Card>
  );
}

export default PlayersList;