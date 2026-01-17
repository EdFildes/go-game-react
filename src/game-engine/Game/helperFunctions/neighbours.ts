import { getGameStateItemByPosition } from "./initialisation";

// up right down left
export const directionOffsets: Array<[number, number]> = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];

const getFriendStatus = (currentColor, neighbourColor: string) => {
  if(!neighbourColor) return "EMPTY"
  if(neighbourColor === currentColor) return "FRIEND"
  if(neighbourColor === currentColor) return "FOE"
}

export const getNeighbourProps = (  
  gameState,
  position,
  currentColor
) => {
  const [row, col] = position;

  const neighbourProps = []
  for(const [rowOffset, columnOffset] of directionOffsets){

    const gameStateItem = getGameStateItemByPosition(gameState, [row + rowOffset, col + columnOffset])
    if(gameStateItem){
      const group = gameStateItem.isStonePlaced ? gameState.groupInstance : null
      const neighbourPropItem = {
        ...gameStateItem,
        liberties: group ? group.liberties : null,
        friendStatus: getFriendStatus(currentColor, gameStateItem.stoneColor)
      }
      neighbourProps.push(neighbourPropItem)
    }
  }

  return neighbourProps;
};

export const checkIsPlacementCompatibleWithNeighbours = (gameState, position, currentColor) => {
  const neighbourProps = getNeighbourProps(gameState, position, currentColor)
  const neighboursAreHappy = neighbourProps.some(neighbour => 
    neighbour.friendStatus === "EMPTY" ||
    neighbour.friendStatus === "FRIEND" && neighbour.liberties > 1
  )
  return neighboursAreHappy
}