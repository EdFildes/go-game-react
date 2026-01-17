import { StoneHandler } from "./StoneHandler/StoneHandler.js";

export type Position = [number, number];
export type Color = "O" | "X";
export type GroupLocations = Array<Row>;
export type Stone = "-" | number;
export type Row = Stone[];
export type GroupLookup = Record<number, any>; // wierd error then doing typeof Group
export type StoneHandlerInstance = any; //typeof StoneHandler;
export type GroupInstance = any;
export type GameInstance = any; // typeof Game
export type Members = Position[]
export type LibertyTally = Record<number, number>;

export type PositionState = "EMPTY" | "FRIENDLY" | "UNFRIENDLY"

export interface NeighbourProps {
  type: PositionState;
  groupId: number;
  neighbouringGroups: number[];
  position: Position;
}
