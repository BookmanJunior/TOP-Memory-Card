export default function Modal({
  gameState,
  score,
  handleRestart,
  handleKeepPlaying,
  gameDifficulty,
}) {
  const isActive =
    gameState === "game-won" ||
    gameState === "game-over" ||
    gameState === "error";

  if (gameState === "error") {
    return (
      <ModalContainer isActive={isActive}>
        <p>OOPS! Something went wrong</p>
        <ModalButton handleClick={handleRestart} title="Try Again" />
      </ModalContainer>
    );
  }

  return (
    <ModalContainer isActive={isActive}>
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
    </ModalContainer>
  );
}

function ModalContainer({ children, isActive }) {
  return (
    <div className={`modal-container bg-overlay ${isActive ? "active" : ""}`}>
      <div className="modal">{children}</div>
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
