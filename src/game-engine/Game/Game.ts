import { switchColor } from "./helperFunctions/colors";
import { getGameStateItemByPosition, initialiseGame, updateGameStateWithPlacedStone } from "./helperFunctions/initialisation";
import { checkMoveIsValid, getLiberties } from "./helperFunctions/neighbours";
import { checkIsPositionEmpty, respondToPiecePlacementImpact} from "./helperFunctions/pieces";

type GameStateObject = {
	isStonePlaced: boolean;
	stoneColor: string | null;
  stoneGroupId: number;
  position: Array<number>;
	subscriber: (message) => void
}

export class Game {
  gameState: GameStateObject[][]
  size: number
  color: string
  canPlacePiece = false

  constructor(size: number, color) {
    this.size = size;
    this.color = color;
    this.gameState = initialiseGame(size)
  }
  
  addUISubscriber(position, subscriber){
    const stateItem = getGameStateItemByPosition(this.gameState, position)
    stateItem.subscriber = subscriber
  }

  requestCanPlacePiece(positionToPlace){
	  const isPositionEmpty = checkIsPositionEmpty(this.gameState, positionToPlace)
	  const areNeighboursHappy = checkMoveIsValid(this.gameState, positionToPlace, this.color)
    const canPlace = [isPositionEmpty, areNeighboursHappy].every(Boolean)
    this.canPlacePiece = canPlace
    if(!canPlace) console.log(JSON.stringify(getGameStateItemByPosition(this.gameState, positionToPlace), (_key, value) => (value instanceof Set ? [...value] : value), 2))
    return {color: this.color, canPlace}
  }

  placePiece(newPiecePosition){
    const groupInfo = getLiberties(this.gameState, newPiecePosition, this.color)
    updateGameStateWithPlacedStone(this.gameState, newPiecePosition, this.color, groupInfo)
    respondToPiecePlacementImpact(this.gameState, newPiecePosition, this.color)
	  this.color = switchColor(this.color)
    this.canPlacePiece = false
  }
}
  