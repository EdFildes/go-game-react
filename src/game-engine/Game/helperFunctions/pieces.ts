import { getGameStateItemByPosition } from "./initialisation"

export const checkIsPositionEmpty = (gameState, newPieceLocation) => {
  const stateAtPosition = getGameStateItemByPosition(gameState, newPieceLocation)
  return !stateAtPosition.isStonePlaced
}



export const respondToPiecePlacementImpact = () => {

}