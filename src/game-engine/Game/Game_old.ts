import { checkNeighbours } from "../Board/helpers/checkNeighbours";
import { StoneHandler } from "../StoneHandler/StoneHandler";
import { getLiberties } from "../StoneHandler/helpers/getLiberties";
import { getGroupColor, initialiseBoard } from "../helpers";
import type {
  Color,
  GroupInstance,
  StoneHandlerInstance,
  NeighbourProps,
  Position,
  Row,
} from "../types";

export const colors: Color[] = ["O", "X"];

const debug = (stoneHandler: StoneHandlerInstance) => {
  // debug info
  Object.values(stoneHandler.groupLookup).forEach((group: GroupInstance) => {
    console.log("group: ", group.id, " liberties: ", group.liberties, " occupations: ", group.occupations)
  })
  stoneHandler.stoneLocations.forEach((row: Row) => console.log(row.map(stone => stone.color).join(" ")));
}


export class Game {
  readonly size: number;
  currentColor: Color = colors[0];
  readonly stoneHandler: StoneHandlerInstance;

  constructor(size: number) {
    this.size = size;
    this.stoneHandler = new StoneHandler(size);
  }

  makeMove(position: Position, neighbours: NeighbourProps[]){
    // const { liberties, occupations } = getLiberties(neighbours);
    // let groupId = this.stoneHandler.createNewGroup([position], liberties, occupations, this.currentColor);

    // for(let neighbour of neighbours){
    //   if(neighbour.type === "FRIENDLY"){
    //     neighbour.groupInstance.removeLiberties([position]);
    //     this.stoneHandler.mergeGroups(groupId, neighbour.groupInstance.id);
    //   }
    //   if(neighbour.type === "UNFRIENDLY"){
    //     neighbour.groupInstance.removeLiberties([position], groupId);
    //     if (neighbour.groupInstance.liberties.length < 1) {
    //       this.stoneHandler.removeGroup(neighbour.groupInstance.id);
    //     }
    //   }
    // }
    const newColor = colors[colors.indexOf(this.currentColor) ^ 1];
    this.currentColor = newColor

  }

  subscribeToUI(){
    this.stoneHandler.set
  }

  placePiece(position: Position) {

    const stone = this.stoneHandler.getStone(position)

    if (!stone) {

      // let neighbours = checkNeighbours(this.stoneHandler, position, this);

      // const canMove = neighbours.some(neighbour => 
      //   neighbour.type === "EMPTY" || 
      //   (neighbour.type === "FRIENDLY" && neighbour.groupInstance?.liberties?.length > 1) || 
      //   (neighbour.type === "UNFRIENDLY" && neighbour.groupInstance?.liberties?.length === 1)
      // )

      // if(canMove){
      //   this.makeMove(position, neighbours)
      //   debug(this.stoneHandler)
      // }
      this.stoneHandler.setStone(position)
    }
  }

  getPositions(){
      const positions: string[][] = [];
      this.stoneHandler.stoneLocations.forEach((row: Row) => {
        const mappedRow: string[] = row.map((id) => getGroupColor(this.stoneHandler, id));
        console.log(mappedRow)
        positions.push(mappedRow);
      });
      this.positions = positions;
      return positions;
    }
  }
  