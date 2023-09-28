import { gameDifficultyOptions } from "../gameOptions.types";

type WelcomeScreenProps = {
  cb: (difficulty: gameDifficultyOptions) => void;
  gameDifficulty: gameDifficultyOptions;
  children: JSX.Element | JSX.Element[];
};

type DifficultyButtonProps = {
  title: "Easy" | "Medium" | "Hard";
  onClick: () => void;
  gameDifficulty: gameDifficultyOptions;
};

export default function WelcomeScreen({
  cb,
  gameDifficulty,
  children,
}: WelcomeScreenProps) {
  return (
    <div className="welcome-screen flex-column">
      <p>Choose game difficulty: </p>
      <div className="game-mode-btns flex-row">
        <DifficultyButton
          gameDifficulty={gameDifficulty}
          title="Easy"
          onClick={() => cb("easy")}
        />
        <DifficultyButton
          gameDifficulty={gameDifficulty}
          title="Medium"
          onClick={() => cb("medium")}
        />
        <DifficultyButton
          gameDifficulty={gameDifficulty}
          title="Hard"
          onClick={() => cb("hard")}
        />
      </div>
      {children}
    </div>
  );
}

function DifficultyButton({
  title,
  onClick,
  gameDifficulty,
}: DifficultyButtonProps) {
  const isActive = gameDifficulty === title.toLowerCase();
  return (
    <button
      className={`font-bold hover-underline ${isActive ? "active" : ""}`}
      onClick={onClick}
    >
      {title}
    </button>
  );
}
