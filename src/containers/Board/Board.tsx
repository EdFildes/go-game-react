import { Tile } from "../../containers"
import { BoardContainer } from "./components";

const populateRow = (size: number) => new Array(size).fill(<Tile />)

const Board: React.FC<{ size: number }> = ({ size = 8 }) => {
  const rows = []

  for (let i = 0; i < size; i++) {
    const row = populateRow(size)
    rows.push(row)
  }

  return (
    <BoardContainer>
      {rows}
    </BoardContainer>
  )
}

export default Board

