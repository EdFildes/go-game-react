import type {
  Color,
  Members,
  Position,
} from "../types.js";

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
    this.liberties = Array.from(new Set([...this.liberties, ...liberties]));
  }

  addMembers = (newMembers: Set<Position>) => {
    this.members = Array.from(new Set([...this.members, ...newMembers]));
  };

  addAdjacentFoes = (newAdjacentFoes: Set<Position>) => {
    this.adjacentFoes = Array.from(new Set([...this.adjacentFoes, ...newAdjacentFoes]));
  };

  removeLiberties = (liberties: Position[], friendStatus) => {
    console.log(this.id)
    const stringifiedLiberties = liberties.map(lib => lib.toString())
    this.liberties = this.liberties.filter(liberty => !stringifiedLiberties.includes(liberty.toString()))
    if(friendStatus === "FOE") this.adjacentFoes = Array.from(new Set(this.adjacentFoes.concat(liberties)))
  };
};
