import {mergeWith, concat, intersection} from "ramda"
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
  groupInstanceB.removeLiberties(groupInstanceB.members)
  // copy adjacent foes from group A to group B
  groupInstanceB.addAdjacentFoes(groupInstanceA.adjacentFoes);
}

export const removeGroup = (gameState, groupForRemoval) => {
  const stonesToBeRemoved = groupForRemoval.members
  gameState.flat().forEach(gameStateItem => {
    if(gameStateItem.groupInstance === groupForRemoval){
      gameStateItem.isStonePlaced = false
      gameStateItem.stoneColor = null
      gameStateItem.groupInstance = null
      gameStateItem.subscriber("REMOVE_STONE")
    }
  })
  
  // refund liberties to any adjacent foes
  // remove any members of this group from their adjacent foes list
  groupForRemoval.adjacentFoes.forEach(foePosition => {
    const foeStateItem = getGameStateItemByPosition(gameState, foePosition)
    const libertiesToRefund = intersection(foeStateItem.groupInstance.adjacentFoes, stonesToBeRemoved)
    foeStateItem.groupInstance.addLiberties(libertiesToRefund)
    foeStateItem.groupInstance.removeAdjacentFoes(libertiesToRefund)
  })
}