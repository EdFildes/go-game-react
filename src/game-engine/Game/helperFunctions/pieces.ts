import { mergeGroups, removeGroup } from "./groups"
import { getGameStateItemByPosition } from "./initialisation"
import { getNeighbourProps } from "./neighbours"

/**
 * Checks if a position on the game board is empty (no stone placed).
 * @param {object} gameState - The current game state
 * @param {object} newPieceLocation - The position to check
 * @returns {boolean} True if the position is empty, false otherwise
 */
export const checkIsPositionEmpty = (gameState, newPieceLocation) => {
  const stateAtPosition = getGameStateItemByPosition(gameState, newPieceLocation)
  return !stateAtPosition.isStonePlaced
}

/**
 * Handles game logic after a piece is placed on the board.
 * Merges friendly groups, removes liberties for adjacent groups,
 * and captures enemy groups that have no liberties remaining.
 * @param {object} gameState - The current game state
 * @param {object} newPieceLocation - The position where the piece was placed
 * @param {string} currentColor - The color of the piece placed (player's color)
 * @returns {void}
 */
export const respondToPiecePlacementImpact = (gameState, newPieceLocation, currentColor) => {
  const newPosStateItem = getGameStateItemByPosition(gameState, newPieceLocation)
  const neighbourProps = getNeighbourProps(gameState, newPieceLocation, currentColor)
  for(let neighbourProp of neighbourProps){
    if(neighbourProp.friendStatus === "FRIEND"){
      neighbourProp.groupInstance.removeLiberties([newPieceLocation], "FRIEND");
      mergeGroups(gameState, newPosStateItem.groupInstance, neighbourProp.groupInstance);
    }
    if(neighbourProp.friendStatus === "FOE"){
      neighbourProp.groupInstance.removeLiberties([newPieceLocation], "FOE");
      if (neighbourProp.groupInstance.liberties.length < 1) {
        removeGroup(gameState, neighbourProp.groupInstance);
      }
    }
  }
}