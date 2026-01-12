export const getTilePosition = (rowNum: number, colNum: number, size) => {
  switch(rowNum){
    case 0: 
      return getTopRowPosition(colNum, size)
    case size-1:
      return getBottomRowPosition(colNum, size)
    default:
      return getMiddleRowsPosition(colNum, size)
  }
}

const getTopRowPosition = (colNum, size) => {
  switch(colNum){
    case 0:
      return "topLeft"
    case size-1: 
      return "topRight"
    default:
      return "topEdge"
  }
}

const getBottomRowPosition = (colNum, size) => {
  switch(colNum){
    case 0: 
      return "bottomLeft"
    case size-1:
      return "bottomRight"
    default:
      return "bottomEdge"
  }
}

const getMiddleRowsPosition = (colNum, size) => {
  switch(colNum){
    case 0: 
      return "leftEdge"
    case size-1:
      return "rightEdge"
    default:
      return "inner"
  }
}