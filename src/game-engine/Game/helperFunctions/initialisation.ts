export const initialiseGame = (size: number) => {
  const gameState = new Array(size).fill(null).map((row, rowNum) => 
    new Array(size).fill(null).map((item, colNum) => {
      return {
        isStonePlaced: false,
        stoneColor: null,
        groupInstance: null,
        position: [rowNum, colNum],
        subscriber: (message) => {}
      }
    })
  )
  return gameState
}

export const getGameStateItemByPosition = (gameState, position) => {
  const stateItem = gameState.flat().find(item => item.position.toString() === position.toString())
  return stateItem
}

export const updateGameStateWithPlacedStone = (gameState, newPieceLocation, color) => {
  const stateItem = getGameStateItemByPosition(gameState, newPieceLocation)
  stateItem.isStonePlaced = true
  stateItem.stoneColor = color
}