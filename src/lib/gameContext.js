import React from "react";
import { newTicTacToeGrid } from "../helpers/generateGrid";
import { clone } from "../helpers/clone";

const GameStateContext = React.createContext();
const GameDispatchContext = React.createContext();

const NEXT_TURN = {
  X: "O",
  O: "X",
};

const initialState = {
  grid: newTicTacToeGrid(),
  turn: "X",
};

function gameReducer(state, action) {
  switch (action.type) {
    case "CLICK": {

      const { x, y } = action.payload;
      const nextState = clone(state);

      if (state.grid[y][x]) {
        return state;
      }

      nextState.grid[y][x] = state.turn;
      nextState.turn = NEXT_TURN[state.turn];
      
      return nextState
    }

    default: {
      return state;
    }
  }
}

function GameProvider({ children }) {
  const [state, dispatch] = React.useReducer(gameReducer, initialState);
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
