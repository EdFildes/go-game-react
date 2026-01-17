import { switchColor } from "./helperFunctions/colors";
import { initialiseGame, updateGameStateWithPlacedStone } from "./helperFunctions/initialisation";
import { checkIsPlacementCompatibleWithNeighbours, getLiberties } from "./helperFunctions/neighbours";
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

  requestCanPlacePiece(positionToPlace){
	  const isPositionEmpty = checkIsPositionEmpty(this.gameState, positionToPlace)
	  const areNeighboursHappy = checkIsPlacementCompatibleWithNeighbours(this.gameState, positionToPlace, this.color)
    const canPlace = [isPositionEmpty, areNeighboursHappy].every(Boolean)
    this.canPlacePiece = canPlace
    return {color: this.color, canPlace}
  }

  placePiece(newPiecePosition){
    const groupInfo = getLiberties(this.gameState, newPiecePosition, this.color)
    updateGameStateWithPlacedStone(this.gameState, newPiecePosition, this.color, groupInfo)
    respondToPiecePlacementImpact()
	  this.color = switchColor(this.color)
    this.canPlacePiece = false
  }
}
  