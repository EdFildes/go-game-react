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
  if(neighbourColor !== currentColor) return "FOE"
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
      const neighbourPropItem = {
        ...gameStateItem,
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
    neighbour.friendStatus === "FRIEND" && neighbour.groupInstance.liberties.length > 1 || 
    neighbour.friendStatus === "FOE" && neighbour.groupInstance.liberties.length === 1
  )
  console.log(neighbourProps, currentColor)
  return neighboursAreHappy
}

export const getLiberties = (gameState,position,currentColor) => {
  const neighbourProps = getNeighbourProps(gameState,position,currentColor)
  const liberties = neighbourProps
    .filter(neighbour => neighbour.friendStatus === "EMPTY")
    .map(neighbour => neighbour.position)
  const occupationMap = neighbourProps
    .filter(neighbour => neighbour.friendStatus === "FOE")
    .map(neighbour => {
      const groupId = neighbour.groupInstance.id
      return {[groupId]: neighbour.position}
    })
  return {liberties, occupationMap}
}
