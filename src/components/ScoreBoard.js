export default function ScoreBoard({ score }) {
  return (
    <div className="score-board">
      <div className="x-score" style={{ color: "yellow" }}>( X ) PLAYER <span>{score[0]}</span></div>
      <span style={{ width: "2px", height: "70%", background: "#f9f9f9" }}></span>
      <div className="o-score" style={{ color: "lime" }}>( O ) PLAYER <span>{score[1]}</span></div>
    </div>
  );
}