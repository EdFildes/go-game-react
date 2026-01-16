import { getGroupColor } from "../../helpers";
import type { GameInstance, StoneHandlerInstance, NeighbourProps, Position, PositionState, Square } from "../../types.d.ts";

// up right down left
export const directionOffsets: Array<[number, number]> = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];

const getType = (stone, currentColor: string): PositionState => {
  if(!stone.color) return "EMPTY"
  if(stone.color === currentColor) return "FRIENDLY"
  if(stone.color !== currentColor) return "UNFRIENDLY"
}

export const getNeighbouringPositions = (  
  stoneHandler: StoneHandlerInstance,
  position: Position
  ) => {
  const [row, col] = position;

  const neighbouringPositions = []
  for(const [rowOffset, columnOffset] of directionOffsets){
    const stone = stoneHandler.getStone([row + rowOffset, col + columnOffset])
    if(stone){
      const adjPosition = [row + rowOffset, col + columnOffset]
      neighbouringPositions.push(adjPosition)
    }
  }

  return neighbouringPositions;
};

export const getNeighbouringGroups = (  
  stoneHandler: StoneHandlerInstance,
  positions: Position[]
) => {
  const neighbouringGroups = new Set()
  for(const position of positions){
    const stone = stoneHandler.getStone(position)
    if(stone?.groupId){
      const groupId = stone.groupId
      neighbouringGroups.add(groupId)
    }
  }
  return Array.from(neighbouringGroups)
};

export const checkNeighbours = (
  stoneHandler: StoneHandlerInstance,
  position: Position,
  currentColor
): Array<NeighbourProps> => {
  const neighbouringPositions = getNeighbouringPositions(stoneHandler, position)
  const neighbourProps: Array<NeighbourProps> = neighbouringPositions.map((adjPosition) => {
    const stone = stoneHandler.getStone(adjPosition)
    const groupId = stone.groupId
    const neighbouringGroups = getNeighbouringGroups(stoneHandler, getNeighbouringPositions(stoneHandler, adjPosition))
    return {
      type: getType(stone, currentColor),
      groupId: groupId,
      position: adjPosition,
      neighbouringGroups
    };
  })
  return neighbourProps;
};