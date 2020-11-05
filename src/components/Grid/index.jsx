import React from "react";
import { Cell } from "../Cell";

export const Grid = ({ grid, handleClick }) => {
  return (
    <div style={{ display: "inline-block" }}>
      <div
        style={{
          backgroundColor: "#000",
          display: "grid",
          gridTemplateRows: `repeat(${grid.length}, 1fr)`,
          gridTemplateColumns: `repeat(${grid[0].length}, 1fr)`,
          gridGap: 2,
        }}
      >
        {grid.map((row, rowIdx) =>
          row.map((value, colIdx) => (
            <Cell
              key={`${colIdx}-${rowIdx}`}
              value={value}
              onClick={() => {
                handleClick(colIdx, rowIdx);
              }}
            />
          ))
        )}
      </div>
    </div>
  );
};
