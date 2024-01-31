import "../App.css";

///// hooks & custom components & reducers 
import React, { useState, useReducer, useMemo } from "react";
import { updateGameInfoReducer } from "../reducers/XOReducer";
import { Square } from "./Square";
import Popup from "./Popup";
import Header from "./Header";
import ScoreBoard from "./ScoreBoard";

///// Material UI 
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
export default function XOGame() {

  //// states & reducers
  let [currentSign, setCurrentSign] = useState("X");
  const [gameInfo, dispatchGameInfo] = useReducer(updateGameInfoReducer,
    {
      score: [0, 0],
      isThereWinner: false,
      board: [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
      ],
      isGameEnded: false,
      winner: "",
      winType: "none",

    });

  //// variables
  let clickedSquare = [0, 0];
  let borderColor = currentSign === "X" ? `2px solid yellow` : `2px solid lime`;
  let popupMessage = `${gameInfo.isThereWinner ? `Winner is ( ${gameInfo.winner} ) PLAYER` : `Draw`}`;
  let winLineBg = { backgroundColor: `${gameInfo.winner === "X" ? `lime` : `Yellow`}` };

  ///// handling functions
  function updateBoard() {

    // Prevent clicking on the board if the square is already filled
    if (gameInfo.board[clickedSquare[0]][clickedSquare[1]] !== "") {
      return;
    }

    // TODO : Prevent any click after the game over 
    if (gameInfo.isGameEnded || gameInfo.isThereWinner) {
      return;
    }

    dispatchGameInfo(
      {
        type: `updateGameInfo`,
        payload: {
          clickedSquare: clickedSquare,
          currentSign: currentSign
        }
      }
    )
    setCurrentSign(currentSign === "X" ? "O" : "X")

  }

  function resetTheGame() {
    dispatchGameInfo(
      {
        type: `resetGame`,
      }
    )
    setCurrentSign("X")

  }
  function continueTheGame() {
    dispatchGameInfo(
      {
        type: `continueGame`,
      }
    )
    setCurrentSign("X")

  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  function updateClickedSquare(value) {
    clickedSquare = value;
    updateBoard();
  }

  //// list rendering logic & memoization to optimize performance
  const squares = useMemo(() => {
    return gameInfo.board.map((row, i) => {
      return row.map((col, j) => {
        return (
          <Square
            key={j}
            borderColor={borderColor}
            updateClickedSquare={updateClickedSquare}
            clickedSquare={[i, j]}
            squareValue={gameInfo.board[i][j]}
          />
        );
      });
    });
  }, [gameInfo.board, borderColor, updateClickedSquare]);


  return (
    <React.Fragment>
      {/* Popup */}
      <Popup isThereWinner={gameInfo.isThereWinner} isGameEnded={gameInfo.isGameEnded} popupMessage={popupMessage} resetTheGame={resetTheGame} continueTheGame={continueTheGame} />
      {/* == Popup == */}

      {/* Header */}
      <Header />
      {/*== Header ==*/}

      {/* Body */}
      <div className="game-body" >

        {/* Score Board */}
        <ScoreBoard score={gameInfo.score} />
        {/* == Score Board == */}

        <Container maxWidth="sm" className="container">
          <span className={`win-line ${gameInfo.winType} `} style={winLineBg}></span>
          {squares}
        </Container>

        <Button variant="contained" color="error" onClick={resetTheGame}> Reset Game </Button>

      </div>
      {/*== Body ==*/}
    </React.Fragment >
  );
}