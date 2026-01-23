import { Tile } from "../../containers"
import { BoardContainer } from "./components";
import { getTilePosition } from "./helpers";

const populateRow = (size: number, rowNum) => {
  const row = []
  for (let colNum = 0; colNum < size; colNum++) {
    const quadrant = getTilePosition(rowNum, colNum, size)
    row.push(<Tile key={[rowNum, colNum].toString()} position={[rowNum, colNum]} quadrant={quadrant} />)
  }
  return row
}

const Board: React.FC<{ size: number }> = ({ size }) => {
  const rows = []

  for (let rowNum = 0; rowNum < size; rowNum++) {
    const row = populateRow(size, rowNum)
    rows.push(row)
  }

  return (
    <BoardContainer size={size}>
      {rows}
    </BoardContainer>
  )
}

export default Board

