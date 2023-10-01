import { gameDifficultyOptions } from "../gameOptions.types";

type WelcomeScreenProps = {
  cb: (difficulty: gameDifficultyOptions) => void;
  gameDifficulty: gameDifficultyOptions;
  children: JSX.Element | JSX.Element[];
};

type DifficultyButtonProps = {
  title: gameDifficultyOptions;
  onClick: () => void;
  gameDifficulty: gameDifficultyOptions;
};

const difficultyButtons: gameDifficultyOptions[] = [
  "easy",
  "medium",
  "hard",
  "master",
];

export default function WelcomeScreen({
  cb,
  gameDifficulty,
  children,
}: WelcomeScreenProps) {
  return (
    <div className="welcome-screen flex-column">
      <p>Choose game difficulty: </p>
      <div className="game-mode-btns flex-row">
        {difficultyButtons.map((button) => (
          <DifficultyButton
            key={button}
            title={button}
            gameDifficulty={gameDifficulty}
            onClick={() => cb(button)}
          />
        ))}
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
      className={`font-bold hover-underline diff-btn ${
        isActive ? "active" : ""
      }`}
      onClick={onClick}
    >
      {title}
    </button>
  );
}
