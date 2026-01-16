import { Group } from "../Group.ts";
import { initialiseBoard } from "../helpers.ts";
import type {
  GameInstance,
  GroupLocations,
  GroupLookup,
  Position,
} from "../types";
import {mergeWith, uniq, concat} from "ramda";

export const StoneHandler = class {
  groupLookup: GroupLookup = {};
  stoneLocations: GroupLocations;
  id: number = 0;
  size

  constructor(size) {
    this.size = size
    this.stoneLocations = initialiseBoard(size);
  }

  getGroup(id){
    return this.groupLookup[id] || null
  }

  createNewGroup(
    members: Position[],
    liberties: Position[],
    occupations: Record<number, Position[]>,
    currentColor: string
  ) {
    this.groupLookup[this.id] = new Group(
      this,
      members,
      currentColor,
      this.id,
      liberties,
      occupations,
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
    occupations: Record<number, Position[]>
  ) {
    const group = this.groupLookup[idToJoin];
    group.members = members;
    group.liberties = liberties;
    group.occupations = occupations;
  }

  mergeGroups(newId: number, oldId: number) {
    let members: Position[] = [];
    let liberties: Position[] = [];
    let occupations = {};
    
    [newId, oldId].forEach((id) => {
      const group = this.groupLookup[id];

      members = members.concat(group.members);
      liberties = uniq(liberties.concat(group.liberties))
      occupations = mergeWith(concat,
        occupations,
        group.occupations
      )
    });

    members.forEach((coords) => {
      const stone = this.getStone(coords)
      stone.setGroupId(newId)
    })

    this.joinExistingGroup(newId, members, liberties, occupations)

    // cleanup
    Object.values(this.groupLookup).forEach(group => {
      if(group.occupations[oldId]){
        group.occupations[newId] = group.occupations[oldId]
        delete group.occupations[oldId]
      }
    });

    delete this.groupLookup[oldId]
  }

  removeGroup(groupId: number) {
    const group = this.groupLookup[groupId];
    group.members.forEach(
      ([row, col]: Position) => (this.stoneLocations[row][col] = "-"),
    );
    Object.values(this.groupLookup).forEach((group) => {
      if (group.occupations[groupId]) {
        group.refundLiberties(groupId);
      }
    });
    delete this.groupLookup[groupId];
  }

  setStone(coords, stone){
    const [row, col] = coords
    this.stoneLocations[row][col] = stone
  }

  getStone(coords){
    const [row, col] = coords
    if(row > -1 && col > -1 && row < this.size && col < this.size){
      return this.stoneLocations[row][col]
    } else {
      return null
    }
  }
};
