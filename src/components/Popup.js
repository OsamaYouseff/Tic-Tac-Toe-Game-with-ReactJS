import Button from '@mui/material/Button';


export default function Popup({ isThereWinner, isGameEnded, popupMessage, resetTheGame, continueTheGame }) {
  return (
    <div className="popup" style={{ display: isThereWinner || isGameEnded ? "flex" : "none" }}>
      <span>
        <div style={{
          textAlign: "center", display: "grid", gap: "10px",
        }}>
          <p style={{ color: "yellow" }}> GAME OVER </p>
          {popupMessage}
        </div>
        <div className="btns-group">
          <Button variant="contained" color="error" onClick={resetTheGame}> Reset Game </Button>
          <Button variant="contained" color="success" onClick={continueTheGame}> Continue </Button>
        </div>
      </span >
    </div>
  );

}