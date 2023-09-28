import { gameDifficultyOptions, gameStateOptions } from "../gameOptions.types";

type ModalProps = {
  gameState: gameStateOptions;
  gameDifficulty: gameDifficultyOptions;
  score: number;
  handleRestart: () => void;
  handleKeepPlaying: () => void;
};

type ModalContainerProps = {
  children: React.ReactNode | JSX.Element;
  isActive: boolean;
};

type ModalButtonProps = {
  children: string;
} & Omit<React.ComponentProps<"button">, "children">;

export default function Modal({
  gameState,
  gameDifficulty,
  score,
  handleRestart,
  handleKeepPlaying,
}: ModalProps) {
  const isActive =
    gameState === "game-won" ||
    gameState === "game-over" ||
    gameState === "error";

  if (gameState === "error") {
    return (
      <ModalContainer isActive={isActive}>
        <p>OOPS! Something went wrong</p>
        <ModalButton onClick={handleRestart}>Try Again</ModalButton>
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
          <ModalButton onClick={handleKeepPlaying}>Keep Playing</ModalButton>
        )}
        <ModalButton onClick={handleRestart}>Play Again</ModalButton>
      </div>
    </ModalContainer>
  );
}

function ModalContainer({ children, isActive }: ModalContainerProps) {
  return (
    <div className={`modal-container bg-overlay ${isActive ? "active" : ""}`}>
      <div className="modal">{children}</div>
    </div>
  );
}

function ModalButton({ children, ...rest }: ModalButtonProps) {
  return (
    <button className="hover-underline block" {...rest}>
      {children}
    </button>
  );
}
