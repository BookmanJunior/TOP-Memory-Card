import { useEffect, useState } from "react";
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
import Instructions from "./components/instructions";

export default function App() {
  const isLocalTopScore = localStorage.getItem("topScore");
  const isLocalFirstLoad = localStorage.getItem("isFirstLoad");

  const [data, setData] = useState<Data[]>([]);
  const [gameState, setGameState] =
    useState<gameStateOptions>("welcome-screen");
  const [gameDifficulty, setGameDifficulty] =
    useState<gameDifficultyOptions>("easy");
  const [score, setScore] = useState(0);
  const [topScore, setTopScore] = useState<number>(
    (isLocalTopScore && JSON.parse(isLocalTopScore)) ?? 0
  );
  const [clickedCards, setClickedCards] = useState<number[]>([]);
  const [isFirstLoad, setIsFirstLoad] = useState(
    (isLocalFirstLoad && JSON.parse(isLocalFirstLoad)) ?? true
  );
  const { error, setError } = APIData({
    gameState,
    setGameState,
    setData,
    gameDifficulty,
  });

  useEffect(() => {
    if (score > topScore) {
      localStorage.setItem("topScore", "" + score);
    }
  }, [score, topScore]);

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
      {isFirstLoad && (
        <Instructions isActive={isFirstLoad} setIsActive={setIsFirstLoad} />
      )}
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

      if (score > topScore) {
        setTopScore(score);
      }

      return;
    }

    const newScore = score + 1;
    setClickedCards([...clickedCards, id]);
    setScore(newScore);
    setData(shuffleArray([...data]));

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
    } else if (gameDifficulty === "hard") {
      setGameDifficulty("master");
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
