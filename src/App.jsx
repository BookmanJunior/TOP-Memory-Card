import { useState } from "react";
import WelcomeScreen from "./components/welcomeScreen";

export default function App() {
  const [gameState, setGameState] = useState("welcome-screen");
  const [gameDifficulty, setGameDifficulty] = useState("easy");

  const isWelcomeScreen = gameState === "welcome-screen";
  const isGameOn = gameState === "game-on";
  const numberOfCards =
    gameDifficulty === "easy" ? 5 : gameDifficulty === "medium" ? 10 : 15;

  const handleGameMode = (mode) => {
    setGameDifficulty(mode);
  };

  const handleGameState = (state) => {
    setGameState(state);
  };

  return (
    <>
      {isWelcomeScreen && (
        <WelcomeScreen cb={handleGameMode}>
          <button onClick={() => handleGameState("game-on")}>Start Game</button>
        </WelcomeScreen>
      )}
      {isGameOn && (
        <button onClick={() => handleGameState("welcome-screen")}>
          Go back
        </button>
      )}
      <p>{numberOfCards}</p>
    </>
  );
}
