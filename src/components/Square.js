export function Square({ borderColor, updateClickedSquare, clickedSquare, squareValue }) {
  return (
    <div style={{ border: borderColor }} onClick={() => {
      updateClickedSquare(clickedSquare);
    }}>{squareValue === "" ? " " : squareValue}</div>
  );
} 