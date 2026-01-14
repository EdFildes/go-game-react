import './App.css'
import {Board} from "./containers"
import { Game } from './game-engine/Game'
import { createContext } from 'react';

export const GameContext = createContext(null);

function App() {
  const size = 8

  const game = new Game(size)

  return (
    <>
      <GameContext value={game}>
        <Board size={size}/>
      </GameContext>
    </>
  )
}

export default App
