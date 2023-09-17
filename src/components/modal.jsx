import { useEffect, useState } from "react";

export default function Modal({
  gameState,
  score,
  handleRestart,
  handleKeepPlaying,
  gameDifficulty,
}) {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (gameState === "game-won" || gameState === "game-over") {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [gameState]);

  return (
    <div className={`modal-container bg-overlay ${isActive ? "active" : ""}`}>
      <div className="modal">
        <p className="game-end-msg font-bold">
          {gameState === "game-won" ? "You Win!" : "You Lose!"}
        </p>
        <p className="font-bold">Your final score: {score}</p>
        <div className="modal-buttons">
          {gameState === "game-won" && gameDifficulty !== "hard" && (
            <ModalButton handleClick={handleKeepPlaying} title="Keep Playing" />
          )}
          <ModalButton handleClick={handleRestart} title="Play Again" />
        </div>
      </div>
    </div>
  );
}

function ModalButton({ handleClick, title }) {
  return (
    <button className="hover-underline block" onClick={handleClick}>
      {title}
    </button>
  );
}
