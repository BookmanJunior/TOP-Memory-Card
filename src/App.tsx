import { useState } from "react";
import {
  gameStateOptions,
  gameDifficultyOptions,
  Data,
} from "./gameOptions.types";
import WelcomeScreen from "./components/welcomeScreen";
import { Modal, ErrorModal } from "./components/modal";
import Cards from "./components/card";
import Header from "./components/header";
import APIData from "./components/getData";

export default function App() {
  const [data, setData] = useState<Data[]>([]);
  const [gameState, setGameState] =
    useState<gameStateOptions>("welcome-screen");
  const [gameDifficulty, setGameDifficulty] =
    useState<gameDifficultyOptions>("easy");
  const [score, setScore] = useState(0);
  const [topScore, setTopScore] = useState(0);
  const [clickedCards, setClickedCards] = useState<number[]>([]);
  const { error, setError } = APIData({
    gameState,
    setGameState,
    setData,
    gameDifficulty,
  });

  const isWelcomeScreen = gameState === "welcome-screen";
  const isGameLoading = gameState === "loading";

  if (isWelcomeScreen) {
    return (
      <WelcomeScreen cb={setGameDifficulty} gameDifficulty={gameDifficulty}>
        <button
          className="hover-underline"
          onClick={() => setGameState("loading")}
        >
          Start Game
        </button>
      </WelcomeScreen>
    );
  }

  if (error) {
    return (
      <ErrorModal
        handleRestart={() => {
          setError(false);
          setGameState("loading");
        }}
        handleExit={() => setGameState("welcome-screen")}
      />
    );
  }

  if (isGameLoading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <>
        <Header handleQuit={handleQuit} score={score} topScore={topScore} />
        <Cards
          data={data}
          gameDifficulty={gameDifficulty}
          handleClick={handleCardClick}
        />
      </>
      <Modal
        gameState={gameState}
        score={score}
        handleRestart={() => {
          setGameState("loading");
          reset();
        }}
        handleKeepPlaying={handleKeepPlying}
        gameDifficulty={gameDifficulty}
      />
    </>
  );

  function handleCardClick(id: number) {
    if (gameState !== "game-on") {
      return;
    }

    if (clickedCards.includes(id)) {
      setClickedCards([]);
      setGameState("game-over");
      return;
    }

    const newScore = score + 1;
    setClickedCards([...clickedCards, id]);
    setScore(newScore);
    setData(shuffleArray([...data]));

    if (newScore > topScore) {
      setTopScore(newScore);
    }

    if (newScore >= data.length) {
      setGameState("game-won");
      setClickedCards([]);
    }
  }

  function handleQuit() {
    setGameState("welcome-screen");
    reset();
  }

  function handleKeepPlying() {
    if (gameDifficulty === "easy") {
      setGameDifficulty("medium");
    } else if (gameDifficulty === "medium") {
      setGameDifficulty("hard");
    }

    setGameState("loading");
    reset();
  }

  function reset() {
    setScore(0);
    setClickedCards([]);
  }
}

// Durstenfeld shuffle algorithm
function shuffleArray(array: Data[]): Data[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    // eslint-disable-next-line no-param-reassign
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function LoadingScreen() {
  return (
    <p className="loading-screen">
      Game is Loading
      <span>.</span>
      <span>.</span>
      <span>.</span>
    </p>
  );
}
