import { useState } from "react";
import { gameStateOptions, gameDifficultyOptions } from "./gameOptions.types";
import WelcomeScreen from "./components/welcomeScreen";
import Modal from "./components/modal";
import Cards from "./components/card";
import Header from "./components/header";

export default function App() {
  const [gameState, setGameState] =
    useState<gameStateOptions>("welcome-screen");
  const [gameDifficulty, setGameDifficulty] =
    useState<gameDifficultyOptions>("easy");
  const [score, setScore] = useState(0);
  const [topScore, setTopScore] = useState(0);
  const [clickedCards, setClickedCards] = useState<number[]>([]);

  const isWelcomeScreen = gameState === "welcome-screen";
  const isLoading = gameState === "loading";
  const numberOfCards = {
    easy: 6,
    medium: 9,
    hard: 15,
  } as const;

  const handleCardClick = (id: number) => {
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

    if (newScore > topScore) {
      setTopScore(newScore);
    }

    if (newScore >= numberOfCards[gameDifficulty]) {
      setGameState("game-won");
      setClickedCards([]);
    }
  };

  const reset = () => {
    setScore(0);
    setClickedCards([]);
  };

  const handleQuit = () => {
    setGameState("welcome-screen");
    reset();
  };

  const handleKeepPlying = () => {
    if (gameDifficulty === "easy") {
      setGameDifficulty("medium");
    } else if (gameDifficulty === "medium") {
      setGameDifficulty("hard");
    }

    setGameState("loading");
    reset();
  };

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

  return (
    <>
      <>
        {!isLoading && (
          <Header handleQuit={handleQuit} score={score} topScore={topScore} />
        )}
        <Cards
          gameDifficulty={gameDifficulty}
          handleClick={handleCardClick}
          gameState={gameState}
          setGameState={setGameState}
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
}
