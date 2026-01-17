import { Stone } from "../Stone/Stone";
import { Group } from "../Group/Group.js";
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
  board: GroupLocations;
  id: number = 0;
  size

  constructor(size) {
    this.size = size
    this.board = initialiseBoard(size);
  }

  placeStone(coords, color){
    const [row, col] = coords
    this.board[row][col] = new Stone(coords, color, () => {})
  }

  getStone(coords){
    const [row, col] = coords
    if(row > -1 && col > -1 && row < this.size && col < this.size){
      return this.board[row][col]
    } else {
      return null
    }
  }

  getStoneProperties(prop){
    const properties: string[][] = initialiseBoard(this.size)
    this.board.forEach((row, rowNum) => {
      row.forEach((stone, colNum) => {
        properties[rowNum][colNum] = stone[prop]
      })
    })
    return properties;
  }
};
