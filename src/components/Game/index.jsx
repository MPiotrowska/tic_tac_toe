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

  return (
    <div className="game">
      <Grid grid={gameState.grid} handleClick={handleClick} />
    </div>
  );
};
