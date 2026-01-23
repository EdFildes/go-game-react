import './App.css'
import {Board} from "./containers"
import { Game } from './game-engine/Game/Game'
import { createContext } from 'react';

export const GameContext = createContext(null);

function App() {
  const size = 19
  const initialColor = "W"

  const game = new Game(size, initialColor)

  return (
    <div style={{display: "flex",justifyContent: "center" }}>
      <GameContext value={game}>
        <Board size={size}/>
      </GameContext>
    </div>
  )
}

export default App
