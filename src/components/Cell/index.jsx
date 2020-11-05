import React from "react";
import "./Cell.css";

export const Cell = ({onClick, value }) => {
  return (
    <div className="cell">
      <button onClick={onClick} type="button"className='button'>{value}</button>
    </div>
  );
};
