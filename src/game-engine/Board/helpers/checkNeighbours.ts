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

export const checkNeighbours = (
  stoneHandler: StoneHandlerInstance,
  position: Position,
  game: GameInstance,
): Array<NeighbourProps> => {
  const neighbouringPositions = getNeighbouringPositions(stoneHandler, position, game)
  const neighbourProps = neighbouringPositions.map((adjPosition) => {
    const stone = stoneHandler.getStone(adjPosition)
    const groupId = stone.groupId
    const group = groupId ? stoneHandler.groupLookup[groupId];
    return {
      type: getType(stone, game.currentColor),
      groupInstance: group,
      position: adjPosition,
      neighbouringGroups: getNeighbouringGroups(stoneHandler, adjPosition, game).map(group => group[1]).filter(id => typeof id === "number")
    };
  })
  return neighbourProps;
};