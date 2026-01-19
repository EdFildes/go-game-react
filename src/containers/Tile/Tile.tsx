import { useContext, useEffect, useState } from "react"
import {Stone, TileContainer, TileQuadrants} from "./components"
import { GameContext } from "../../App";

const Tile: React.FC<{position: string}> = ({quadrant, position}) => {
  const game = useContext(GameContext); 
  const [stoneColor, setStoneColor] = useState(null)

  const subscribeToGameState = (message: string) => {
    if(message === "REMOVE_STONE"){
      setStoneColor(null)
    }
  }

  useEffect(() => {
    game.addUISubscriber(position, subscribeToGameState)
  }, [])

  const handleClick = () => {
    const { color, canPlace } = game.requestCanPlacePiece(position)
    if(canPlace) {
      game.placePiece(position)
      setStoneColor(color)
    }
  }

  const colorMap = {
    "W": "white",
    "B": "black"
  }

  return (
    <TileContainer onClick={handleClick}>
      <TileQuadrants position={quadrant}/>
      {stoneColor && <Stone stoneColor={colorMap[stoneColor]} />}
    </TileContainer>
  )
}

export default Tile

