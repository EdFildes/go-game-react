import {mergeWith, concat} from "ramda"
import { getGameStateItemByPosition } from "./initialisation"

export const mergeGroups = (gameState, groupInstanceA, groupInstanceB) => {
  // point all members of group A to group B
  groupInstanceA.members.forEach(memberPosition => {
    const stateItem = getGameStateItemByPosition(gameState, memberPosition)
    stateItem.groupInstance = groupInstanceB
  })
  // copy member positions from group A to group B
  groupInstanceB.addMembers(groupInstanceA.members);
  // copy liberty positions from group A to group B
  groupInstanceB.addLiberties(groupInstanceA.liberties);
  // copy adjacent foes from group A to group B
  groupInstanceB.addAdjacentFoes(groupInstanceA.adjacentFoes);
}

export const removeGroup = (gameState, groupForRemoval) => {
    gameState.flat().forEach(gameStateItem => {
      if(gameStateItem.groupInstance === groupForRemoval){
        gameStateItem.isStonePlaced = false
        gameStateItem.stoneColor = null
        gameStateItem.groupInstance = null
        gameStateItem.subscriber("REMOVE_STONE")
      }
    })
    // refund liberties to any adjacent foes
    groupForRemoval.adjacentFoes.forEach(position => {
      const stateItem = getGameStateItemByPosition(gameState, position)
      const libertiesToRefund = stateItem.groupInstance.members
      stateItem.groupInstance.addLiberties(libertiesToRefund)
    })
    // const group = this.groupLookup[groupId];
    // group.members.forEach(
    //   ([row, col]: Position) => (this.board[row][col] = "-"),
    // );
    // Object.values(this.groupLookup).forEach((group) => {
    //   if (group.adjacentFoes[groupId]) {
    //     group.refundLiberties(groupId);
    //   }
    // });
    // delete this.groupLookup[groupId];
  }