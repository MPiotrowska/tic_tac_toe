import React from "react";
import "./Game.css";
import { newTicTacToeGrid } from "../../helpers/generateGrid";
import { Grid } from "../Grid";

export const Game = () => {
  const grid = newTicTacToeGrid();
  const handleClick = (x, y) => {
    console.log({ x, y });
  };

  return (
    <div className="game">
      <Grid grid={grid} handleClick={handleClick} />
    </div>
  );
};
