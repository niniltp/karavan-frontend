import { Container, Group, Card, Title, Text } from "@mantine/core";
import PlayersList from '../components/game/PlayingGame/PlayersList.jsx';
import PlayingGameContent from '../components/game/PlayingGame/PlayingGameContent.jsx';
import classes from "../styles/PlayingGame.module.css";
import { GamePhase } from "../helpers/constants.js";
import { Player } from "../helpers/mapping/player.js";
import { Game } from "../helpers/mapping/game.js";
import TimerGame from '../components/game/common/TimerGame.jsx';
import SingingSongView from '../components/game/PlayingGame/SingingSongView.jsx';

export default function Test() {
  const title = "Just the way you are";
  const artist = "Bruno Mars";
  const lyrics = "Oh her eyes her eyes\nMake the stars look like they\'re not shining.\nHer hair , her hair\nfalls perfectly without her trying\nShe\'s so beautiful and I tell her every day\n\n\n\nI know, I know\n\nWhen I compliment her she wont believe me\n\nAnd it\'s so, it\'s so\n\nSad to think she don\'t see what I see\n\n\n\nBut every time she asks me \'Do I look okay?\' I say\n\n\n\nWhen I see your face\n\nThere\'s not a thing that I would change\n\nCause you\'re amazing\n\nJust the way you are\n\n\n\nAnd when you smile\n\nThe whole world stops and stares for a while\n\n\'Cause girl you\'re amazing\n\nJust the way you are\n\n\n\nHer lips, her lips\n\nI could kiss them all day if she\'d let me\n\n\n\nHer laugh, Her laugh\n\nShe hates but I think it\'s so sexy\n\n\n\nShe\'s so beautiful and i tell her every day\n\n\n\nOh you know, you know, you know I\'d never ask you to change\n\nIf perfect is what you\'re searching for\n\nThen just stay the same\n\n\n\nSo don\'t even bother asking if you look okay\n\nYou know I say\n\n\n\nWhen I see your face\n\nThere\'s not a thing that I would change\n\nCause you\'re amazing\n\nJust the way you are\n\n\n\nAnd when you smile\n\nThe whole world stops and stares for a while\n\n\'Cause girl you\'re amazing\n\njust the way you are\n\n\n\nThe way you are\n\nThe way you are\n\nGirl you\'re amazing\n\nJust the way you are\n\n\n\nWhen I see your face\n\nThere\'s not a thing that I would change\n\n\'Cause you\'re amazing\n\nJust the way you are\n\n\n\nAnd when you smile\n\nThe whole world stops and stares for a while\n\n\'Cause girl you\'re amazing\n\nJust the way you are\n\n\n\nYeaaaah";

  return (
    <Container fluid className={classes.wrapper}>
      <SingingSongView title={title} artist={artist} lyrics={lyrics} />
    </Container>
  )
}