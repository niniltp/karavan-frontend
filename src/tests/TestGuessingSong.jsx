import { Container, Group, Card, Text } from "@mantine/core";
import GuesserView from '../components/game/PlayingGame/GuesserView.jsx';
import classes from "../styles/PlayingGame.module.css";
import classesContent from "../styles/PlayingGameContent.module.css";
import { GameStatus } from "../helpers/constants.js";
import { Player } from "../helpers/mapping/player.js";
import { Game } from "../helpers/mapping/game.js";
import { WebSocketProvider } from "../websocket/WebSocketContext.jsx";

export default function Test() {
  const roomId = "36862379-e40d-4304-aac9-e00d9b4f556b";
  const owner = "ad4ea9cc-9837-486b-b9d2-909644cf3835";
  const tempTestTimer = "Round 0 - Timer: 7 seconds";
  const currentPlayer = Player.create("ad4ea9cc-9837-486b-b9d2-909644cf3835", "liliuaaaa", true, 0, true);

  const players = [
    currentPlayer,
    Player.create("232a1001-7e32-4fa5-b557-e8a0ec85b96c", "kuy", true, 32668, true),
    Player.create("ce8a59b4-00e7-4875-ba47-e7cf2616c3c5", "malo", false, 1, true),
    Player.create("678fa63a-9bc6-4169-8550-cb21addeb451", "abc", false, 0, true)
  ];

  const gameData = Game.create(
    {
      type: GameStatus.GUESSING_SONG,
      detail: null
    },
    {
      nbRounds: 5,
      turnDuration: 100
    },
    0,
    0,
    [
      [{
        // playerId: "678fa63a-9bc6-4169-8550-cb21addeb451",
        playerId: "ad4ea9cc-9837-486b-b9d2-909644cf3835",
        song: null,
        guessers: [
          "232a1001-7e32-4fa5-b557-e8a0ec85b96c",
          "ce8a59b4-00e7-4875-ba47-e7cf2616c3c5"
        ]
      },
      {
        playerId: "232a1001-7e32-4fa5-b557-e8a0ec85b96c",
        song: null,
        guessers: []
      },
      {
        playerId: "678fa63a-9bc6-4169-8550-cb21addeb451",
        song: null,
        guessers: []
      },
      {
        playerId: "ce8a59b4-00e7-4875-ba47-e7cf2616c3c5",
        song: null,
        guessers: []
      }],
      [{
        playerId: "ad4ea9cc-9837-486b-b9d2-909644cf3835",
        song: null,
        guessers: [
          "232a1001-7e32-4fa5-b557-e8a0ec85b96c",
          "ce8a59b4-00e7-4875-ba47-e7cf2616c3c5"
        ]
      },
      {
        playerId: "232a1001-7e32-4fa5-b557-e8a0ec85b96c",
        song: null,
        guessers: []
      },
      {
        playerId: "678fa63a-9bc6-4169-8550-cb21addeb451",
        song: null,
        guessers: []
      },
      {
        playerId: "ce8a59b4-00e7-4875-ba47-e7cf2616c3c5",
        song: null,
        guessers: []
      }],
      [{
        playerId: "ad4ea9cc-9837-486b-b9d2-909644cf3835",
        song: null,
        guessers: [
          "232a1001-7e32-4fa5-b557-e8a0ec85b96c",
          "ce8a59b4-00e7-4875-ba47-e7cf2616c3c5"
        ]
      },
      {
        playerId: "232a1001-7e32-4fa5-b557-e8a0ec85b96c",
        song: null,
        guessers: []
      },
      {
        playerId: "678fa63a-9bc6-4169-8550-cb21addeb451",
        song: null,
        guessers: []
      },
      {
        playerId: "ce8a59b4-00e7-4875-ba47-e7cf2616c3c5",
        song: null,
        guessers: []
      }]
    ]
  )

  return (
    <WebSocketProvider roomId={roomId} playerId={currentPlayer.id}>
      <Container fluid className={classes.wrapper}>
        <Group className={classes.groupWrapper} grow preventGrowOverflow={false} align="flex-start" justify="center" gap="xl">
          <Card shadow="sm" radius="lg" p="xl" className={classesContent.cardWrapper}>
            <Text fw={700}>Round {gameData.currentRound}</Text>
            <Text>56</Text>
            <GuesserView gameData={gameData} />
          </Card>
        </Group>
      </Container>
    </WebSocketProvider>
  )
}