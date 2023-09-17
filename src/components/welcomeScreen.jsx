export default function WelcomeScreen({ cb, gameDifficulty, children }) {
  return (
    <div className="welcome-screen flex-column">
      <p>Choose game mode: </p>
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

function DifficultyButton({ title, onClick, gameDifficulty }) {
  return (
    <button
      className={`font-bold hover-underline ${
        gameDifficulty === title.toLowerCase() ? "active" : ""
      }`}
      onClick={onClick}
    >
      {title}
    </button>
  );
}
