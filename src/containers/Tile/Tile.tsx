import { useState } from "react"
import {TileContainer, TileQuadrants, Stone} from "./components"

const Tile: React.FC<{position: string}> = ({position}) => {
  const [isStone, setIsStone] = useState(false)
  return (
    <TileContainer onClick={() => setIsStone(prevState => !prevState)}>
      <TileQuadrants position={position}/>
      {isStone && <Stone />}
    </TileContainer>
  )
}

export default Tile

