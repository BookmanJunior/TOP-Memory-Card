export default function WelcomeScreen({ cb, children }) {
  return (
    <div className="welcome-screen">
      <p>Choose game mode: </p>
      <div className="game-mode-btns flex-row">
        <DifficultyButton title="Easy" onClick={() => cb("easy")} />
        <DifficultyButton title="Medium" onClick={() => cb("medium")} />
        <DifficultyButton title="Hard" onClick={() => cb("hard")} />
      </div>
      {children}
    </div>
  );
}

function DifficultyButton({ title, onClick }) {
  return (
    <button className="font-bold" onClick={onClick}>
      {title}
    </button>
  );
}
