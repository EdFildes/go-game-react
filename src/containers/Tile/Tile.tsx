import { useContext, useEffect, useState } from "react"
import {TileContainer, TileQuadrants} from "./components"
import { GameContext } from "../../App";
import {Stone} from "src/game-engine/Stone"

const Tile: React.FC<{position: string}> = ({position, coords}) => {
  const game = useContext(GameContext); 
  const [stoneColor, setStoneColor] = useState(null)

  useEffect(() => {
    const stone = new Stone(coords, setStoneColor)
    game.stoneHandler.setStone(stone)
  }, [])

  const makeMove = () => {
    game.simulateClick(coords)
  }

  return (
    <TileContainer onClick={makeMove}>
      <TileQuadrants position={position}/>
      {stoneColor && <Stone stoneColor={stoneColor === "X" ? "black" : "white"} />}
    </TileContainer>
  )
}

export default Tile

