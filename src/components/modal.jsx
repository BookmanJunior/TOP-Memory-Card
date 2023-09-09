import { useEffect, useState } from "react";

export default function Modal({ gameState, handleClick }) {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (gameState === "game-won" || gameState === "game-over") {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [gameState]);

  return (
    <div className={`modal-container ${isActive ? "active" : ""}`}>
      <div className="modal">
        {gameState === "game-over" ? <p>Game Over</p> : <p>You Win</p>}
        <button onClick={handleClick}>Play again</button>
      </div>
    </div>
  );
}
