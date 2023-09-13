import { useEffect, useState } from "react";

export default function Modal({ gameState, score, handleClick }) {
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
        <button className="hover-underline" onClick={handleClick}>
          Play again
        </button>
      </div>
    </div>
  );
}
