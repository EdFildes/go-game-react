import type { NeighbourProps, Position } from "../../types";

export const getLiberties = (neighbours: NeighbourProps[], newGroupId?: number) => {
  console.log(neighbours)
  let liberties: Position[] = [];
  const adjacentFoes: Record<number, Position[]> = {};

  for(let neighbour of neighbours){
    // check to see if the liberty is already accounted for by the group you're joining
    if(typeof newGroupId === "number" && neighbour.type === "EMPTY" && neighbour.neighbouringGroups.includes(newGroupId)){
      continue
    } else if(neighbour.type === "EMPTY") {
      liberties = liberties.concat([neighbour.position])
    } else if(neighbour.type === "UNFRIENDLY"){
      const groupId = neighbour.groupId;
      adjacentFoes[groupId] = Array.isArray(adjacentFoes[groupId]) ? 
        adjacentFoes[groupId].concat(neighbour.position) : 
        [neighbour.position]
    }
  }

  return { liberties, adjacentFoes };
};