import { ReactComponent as ArrowLeft } from "../assets/arrow-left.svg";

export default function Header({ handleQuit, score, topScore }) {
  return (
    <div className="header flex-row">
      <button className="back-btn" onClick={handleQuit}>
        <ArrowLeft />
      </button>
      <div className="score-container">
        <p className="current-score">Current Score: {score}</p>
        <p className="top-score">Top Score: {topScore}</p>
      </div>
    </div>
  );
}
