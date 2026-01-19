import { Group } from "../../../game-engine/Group/Group"

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

const getNextAvailableGroupId = (gameState) => {
  const groupIds = gameState.flat()
    .filter(stateObject => Boolean(stateObject.groupInstance))
    .map(stateObject => stateObject.groupInstance.id)
  groupIds.sort()
  const maxId = groupIds.pop() || 0
  return maxId + 1
}

export const updateGameStateWithPlacedStone = (gameState, newPieceLocation, color, groupInfo) => {
  const stateItem = getGameStateItemByPosition(gameState, newPieceLocation)
  stateItem.isStonePlaced = true
  stateItem.stoneColor = color
  stateItem.groupInstance = new Group(
    newPieceLocation,
    getNextAvailableGroupId(gameState),
    groupInfo.liberties || [],
    groupInfo.adjacentFoes || []
  )
}