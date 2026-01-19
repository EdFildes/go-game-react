import { Stone } from "../Stone/Stone";
import { Group } from "../Group/Group.js";
import type {
  GameInstance,
  GroupLocations,
  GroupLookup,
  Position,
} from "../types";
import {mergeWith, uniq, concat} from "ramda";

export const GroupHandler = class {
  groupLookup: GroupLookup = {};
  id: number = 0;

  getGroup(id){
    return this.groupLookup[id] || null
  }

  createNewGroup(
    members: Position[],
    liberties: Position[],
    adjacentFoes: Record<number, Position[]>,
    currentColor: string
  ) {
    this.groupLookup[this.id] = new Group(
      members,
      this.id,
      liberties,
      adjacentFoes,
    );
    members.forEach(position => {
      const stone = this.getStone(position)
      stone.setGroupId(this.id)
      stone.setColor(currentColor)
    })
    return this.id++;
  }

  joinExistingGroup(
    idToJoin: number, 
    members: Position[], 
    liberties: Position[], 
    adjacentFoes: Record<number, Position[]>
  ) {
    const group = this.groupLookup[idToJoin];
    group.members = members;
    group.liberties = liberties;
    group.adjacentFoes = adjacentFoes;
  }

  mergeGroups(newId: number, oldId: number) {
    let members: Position[] = [];
    let liberties: Position[] = [];
    let adjacentFoes = {};
    
    [newId, oldId].forEach((id) => {
      const group = this.groupLookup[id];

      members = members.concat(group.members);
      liberties = uniq(liberties.concat(group.liberties))
      adjacentFoes = mergeWith(concat,
        adjacentFoes,
        group.adjacentFoes
      )
    });

    members.forEach((coords) => {
      const stone = this.getStone(coords)
      stone.setGroupId(newId)
    })

    this.joinExistingGroup(newId, members, liberties, adjacentFoes)

    // cleanup
    Object.values(this.groupLookup).forEach(group => {
      if(group.adjacentFoes[oldId]){
        group.adjacentFoes[newId] = group.adjacentFoes[oldId]
        delete group.adjacentFoes[oldId]
      }
    });

    delete this.groupLookup[oldId]
  }

  removeGroup(groupId: number) {
    const group = this.groupLookup[groupId];
    group.members.forEach(
      ([row, col]: Position) => (this.board[row][col] = "-"),
    );
    Object.values(this.groupLookup).forEach((group) => {
      if (group.adjacentFoes[groupId]) {
        group.refundLiberties(groupId);
      }
    });
    delete this.groupLookup[groupId];
  }
};
