
let winType;

function checkWinLine(sq1, sq2, sq3) {
  return sq1 === sq2 && sq1 === sq3 && sq1 !== "";
}

function checkAnyWinner(board) {
  if (checkWinLine(board[0][0], board[1][1], board[2][2])) {
    winType = "mainD";
    return true;
  }
  else if (checkWinLine(board[0][2], board[1][1], board[2][0])) {
    winType = "secD";
    return true;
  }
  else if (checkWinLine(board[0][0], board[0][1], board[0][2])) {
    winType = "row0";
    return true;
  }
  else if (checkWinLine(board[1][0], board[1][1], board[1][2])) {
    winType = "row1";
    return true;
  }
  else if (checkWinLine(board[2][0], board[2][1], board[2][2])) {
    winType = "row2";
    return true;
  }
  else if (checkWinLine(board[0][0], board[1][0], board[2][0])) {
    winType = "col0";
    return true;
  }
  else if (checkWinLine(board[0][1], board[1][1], board[2][1])) {
    winType = "col1";
    return true;
  }
  else if (checkWinLine(board[0][2], board[1][2], board[2][2])) {
    winType = "col2";
    return true;
  }
  else {
    winType = "none";
    return false;
  }
}

function isGameEnded(gameBoard) {
  let board = gameBoard.flat(Infinity);;
  for (let i = 0; i < board.length; i++) {
    if (board[i] === "") {
      return false;
    }
  }

  return true;
}

function resetTheGame() {

  return {
    score: [0, 0],
    isThereWinner: false,
    board: [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ],
    isGameEnded: false,
    winner: "Draw",
    winType: "none",

  };

}

function continueTheGame(currentState) {
  return {
    ...currentState,
    isThereWinner: false,
    board: [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ],
    isGameEnded: false,
    winner: "Draw",
    winType: "none",

  };
}

function updateSign(currentState, action) {
  const winner = action.payload.currentSign === "X" ? "X" : "O";
  return { ...currentState, winner: winner };
}

export function updateGameInfoReducer(currentState, action) {

  switch (action.type) {
    case `updateGameInfo`:
      ///// change board state
      let board = currentState.board;
      let clickedSqr = action.payload.clickedSquare;

      board[clickedSqr[0]][clickedSqr[1]] = action.payload.currentSign;

      currentState = {
        ...currentState,
        board: board,
      };

      ///// check if there any winner
      if (checkAnyWinner(board,)) {
        currentState.isThereWinner = true;

        //// change winType
        currentState.winType = winType;

        /// change score
        if (action.payload.currentSign === "X") {
          currentState.score[0] += 1;
        } else {
          currentState.score[1] += 1;
        }
        ///// update winner with winner Sign 
        let newState = updateSign(currentState, action);
        currentState = { ...currentState, ...newState };
      }

      /// check if game ended
      if (currentState.isGameEnded || isGameEnded(board)) {
        currentState.isGameEnded = true;

        if (currentState.isThereWinner) {
          let newState = updateSign(currentState, action);
          currentState = { ...currentState, ...newState };
        }
        else {
          currentState.winner = "Draw";
        }
      }

      return currentState;

    case "resetGame":
      return resetTheGame();

    case "continueGame":
      return continueTheGame(currentState);

    default:
      return currentState;
  }

}
