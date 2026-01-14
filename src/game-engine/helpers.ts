import { Stone } from "./Stone.ts";
import type {
  StoneHandlerInstance,
  NeighbourProps,
  PositionState,
  Square
} from "./types.d.ts";

export const initialiseBoard = (size: number) =>
  new Array(size).fill(null).map((_) => new Array(size).fill(new Stone));

export const getUniqueGroups = (neighbours: NeighbourProps[], type: PositionState) => new Set(
  neighbours
    .filter((neighbour) => neighbour.type === type)
    .map((neighbour) => neighbour.groupInstance.id),
);

export const getGroupColor = (stoneHandler: StoneHandlerInstance, id: Square) => {
  const group = stoneHandler.groupLookup[id]
  return group ? group.color : "-"
}
