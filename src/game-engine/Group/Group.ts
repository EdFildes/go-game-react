import type {
  Color,
  Members,
  Position,
} from "../types.js";

import {uniq, without} from "ramda"

export const Group = class {
  readonly id: number;
  liberties: Position[];
  members: Position[];
  adjacentFoes: Position[];

  constructor(
    initialMember: Position, 
    id: number,
    liberties: Position[],
    adjacentFoes: Position[],
  ) {
    this.id = id;
    this.liberties = liberties;
    this.members = [initialMember];
    this.adjacentFoes = adjacentFoes;
  }

  addLiberties(liberties: Position[]) {
    this.liberties = uniq([...this.liberties, ...liberties]);
  }

  addMembers = (newMembers: Set<Position>) => {
    this.members = uniq([...this.members, ...newMembers]);
  };

  addAdjacentFoes = (newAdjacentFoes: Set<Position>) => {
    this.adjacentFoes = uniq([...this.adjacentFoes, ...newAdjacentFoes]);
  };

  removeLiberties = (liberties: Position[], friendStatus) => {
    this.liberties = without(liberties, this.liberties)
    if(friendStatus === "FOE") this.adjacentFoes = uniq(this.adjacentFoes.concat(liberties))
  };
};
