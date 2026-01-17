import { without } from "ramda";
import type {
  Color,
  Members,
  Position,
} from "../types.js";

export const Group = class {
  readonly id: number;
  liberties: Position[]
  members: Members = [];
  occupations: Record<number, Position[]> = {};

  constructor(
    members: Members, 
    id: number,
    liberties: Position[],
    occupations: Record<number, Position[]>,
  ) {
    this.id = id;
    this.liberties = liberties;
    this.members = this.members.concat(members);
    this.occupations = occupations;
  }

  addLiberties(liberties: Position[]) {
    this.liberties = this.liberties.concat(liberties);
  }

  refundLiberties(groupId: number) {
    this.liberties = this.liberties.concat(this.occupations[groupId]);
    delete this.occupations[groupId];
  }

  removeLiberties = (liberties: Position[], unfriendlyGroupId: number) => {
    this.liberties = without(liberties, this.liberties);
    if(typeof unfriendlyGroupId === "number"){
      this.occupations[unfriendlyGroupId] = Array.isArray(this.occupations[unfriendlyGroupId]) ? 
      this.occupations[unfriendlyGroupId].concat(liberties) : 
      liberties
    }
  };

  addMember = (position: Position) => {
    this.members.push(position);
  };
};
