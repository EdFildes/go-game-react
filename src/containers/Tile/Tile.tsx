import {TileContainer, TileQuadrants, Stone} from "./components"

const Tile: React.FC = () => {
  return (
    <TileContainer>
      <TileQuadrants />
      <Stone />
    </TileContainer>
  )
}

export default Tile

