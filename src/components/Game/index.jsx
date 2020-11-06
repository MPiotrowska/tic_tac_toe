import React from "react";
import "./Game.css";
import { Grid } from "../Grid";
import { useGameState, useGameDispatch } from "../../lib/gameContext";

export const Game = () => {
  const gameState = useGameState();
  const dispatch = useGameDispatch();

  const handleClick = (x, y) => {
    dispatch({
      type: "CLICK",
      payload: { x, y },
    });
  };

  const reset = () => {
    dispatch({
      type: "RESET",
    });
  };

  return (
    <div className="gameContainer">
      <div className="gameInnerContainer">
        <div>Next turn: {gameState.turn}</div>
        <div>
          {gameState.status === "success" ? `${gameState.turn} won!` : null}
        </div>
        <button onClick={reset} type="button" className="resetButton">
          reset
        </button>
      </div>
      <div className="game">
        <Grid grid={gameState.grid} handleClick={handleClick} />
      </div>
    </div>
  );
};
