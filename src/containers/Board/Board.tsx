import { Tile } from "../../containers"
import { BoardContainer } from "./components";
import { getTilePosition } from "./helpers";

const populateRow = (size: number, rowNum) => {
  const row = []
  for (let colNum = 0; colNum < size; colNum++) {
    const position = getTilePosition(rowNum, colNum, size)
    row.push(<Tile position={position} />)
  }
  return row
}

const Board: React.FC<{ size: number }> = ({ size = 8 }) => {
  const rows = []

  for (let rowNum = 0; rowNum < size; rowNum++) {
    const row = populateRow(size, rowNum)
    rows.push(row)
  }

  return (
    <BoardContainer>
      {rows}
    </BoardContainer>
  )
}

export default Board

