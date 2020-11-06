import React from "react";
import { newTicTacToeGrid } from "../helpers/generateGrid";
import { clone } from "../helpers/clone";
import { checkForWin, checkForDraw } from "../helpers/checkThree";

const GameStateContext = React.createContext();
const GameDispatchContext = React.createContext();

const NEXT_TURN = {
  X: "O",
  O: "X",
};

const getInitialState = () => ({
  grid: newTicTacToeGrid(),
  turn: "X",
  status: "inProgress",
});

function gameReducer(state, action) {
  if (state.status === "success" && action.type !== "RESET") {
    return state;
  }
  switch (action.type) {
    case "CLICK": {
      const { x, y } = action.payload;
      const nextState = clone(state);
      if (state.grid[y][x]) {
        return state;
      }
      nextState.grid[y][x] = state.turn;

      const flatGrid = nextState.grid.flat(2);

      if (checkForWin(flatGrid)) {
        nextState.status = "success";
        return nextState;
      }

      if (checkForDraw(flatGrid)) {
        return getInitialState();
      }

      nextState.turn = NEXT_TURN[state.turn];
      return nextState;
    }

    case "RESET": {
      return getInitialState();
    }

    default: {
      return state;
    }
  }
}

function GameProvider({ children }) {
  const [state, dispatch] = React.useReducer(gameReducer, getInitialState());
  return (
    <GameStateContext.Provider value={state}>
      <GameDispatchContext.Provider value={dispatch}>
        {children}
      </GameDispatchContext.Provider>
    </GameStateContext.Provider>
  );
}

function useGameState() {
  const context = React.useContext(GameStateContext);
  if (context === undefined) {
    throw new Error("useGameState must be used within a GameProvider");
  }
  return context;
}

function useGameDispatch() {
  const context = React.useContext(GameDispatchContext);
  if (context === undefined) {
    throw new Error("useGameDispatch must be used within a GameProvider");
  }
  return context;
}

export { GameProvider, useGameState, useGameDispatch };
