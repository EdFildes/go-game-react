import { useContext, useEffect, useState } from "react"
import {TileContainer, TileQuadrants, Stone} from "./components"
import { GameContext } from "../../App";

const Tile: React.FC<{position: string}> = ({position, coords}) => {
  const game = useContext(GameContext); 
  const [stoneColor, setStoneColor] = useState()

  const makeMove = () => {
    game.simulateClick(coords)
    const stone = game.stoneHandler.getStone(coords)
    setStoneColor(stone.color)
  }

  return (
    <TileContainer onClick={makeMove}>
      <TileQuadrants position={position}/>
      {stoneColor && <Stone stoneColor={stoneColor} />}
    </TileContainer>
  )
}

export default Tile

