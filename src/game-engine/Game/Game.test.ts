import { Game } from "./Game"
import { getGameStateItemByPosition, updateGameStateWithPlacedStone } from "./helperFunctions/initialisation"
import { checkMoveIsValid } from "./helperFunctions/neighbours"
import { checkIsPositionEmpty } from "./helperFunctions/pieces"

describe("Game helper functions", () => {
    describe.skip("checkIsPositionEmpty()", () => {
        it("should return TRUE if position is empty", () => {
            const gameInstance = new Game(3, "W")
            const gameState = gameInstance.gameState
            const isPositionEmpty = checkIsPositionEmpty(gameState, [0,0])
            expect(isPositionEmpty).toEqual(true)
        })
        it("should return false if position NOT empty", () => {
            const gameInstance = new Game(3, "W")
            const gameState = gameInstance.gameState
            const stateAtPosition = gameState[0][0]
            stateAtPosition.isStonePlaced = true
            const isPositionEmpty = checkIsPositionEmpty(gameState, [0,0])
            expect(isPositionEmpty).toEqual(false)
        })
    })
    describe.skip("checkMoveIsValid()", () => {
        it("should return TRUE if one nieghbour is empty", () => {
            //[- B - -]
            //[B(W)B -]
            //[- - - -]
            //[- - - -]
            const gameInstance = new Game(4, "W")
            const gameState = gameInstance.gameState
            updateGameStateWithPlacedStone(gameState, [0,1], "B", {})
            updateGameStateWithPlacedStone(gameState, [1,0], "B", {})
            updateGameStateWithPlacedStone(gameState, [1,2], "B", {})
            const isMoveValid = checkMoveIsValid(gameState, [1,1], "W")
            expect(isMoveValid).toEqual(true)
        })
        it("should return false if NO nieghbours are empty", () => {
            //[- B - -]
            //[B(W)B -]
            //[- B - -]
            //[- - - -]
            const gameInstance = new Game(4, "W")
            const gameState = gameInstance.gameState
            updateGameStateWithPlacedStone(gameState, [0,1], "B", {})
            updateGameStateWithPlacedStone(gameState, [1,0], "B", {})
            updateGameStateWithPlacedStone(gameState, [1,2], "B", {})
            updateGameStateWithPlacedStone(gameState, [2,1], "B", {})
            const isMoveValid = checkMoveIsValid(gameState, [1,1], "W")
            expect(isMoveValid).toEqual(false)
        })
        it("should return false if a neighbour is friendly and has only one liberty", () => {
            //[W W B -]
            //[B(W)B -]
            //[- B - -]
            //[- - - -]
            const gameInstance = new Game(4, "W")
            const gameState = gameInstance.gameState
            updateGameStateWithPlacedStone(gameState, [0,0], "W", {})
            updateGameStateWithPlacedStone(gameState, [0,1], "W", {liberties: [[1,0]]})
            updateGameStateWithPlacedStone(gameState, [0,2], "B", {})
            updateGameStateWithPlacedStone(gameState, [1,0], "B", {})
            updateGameStateWithPlacedStone(gameState, [1,2], "B", {})
            updateGameStateWithPlacedStone(gameState, [2,1], "B", {})
            const isMoveValid = checkMoveIsValid(gameState, [1,1], "W")
            expect(isMoveValid).toEqual(false)
        })
        it("should return TRUE if at least one neighbour is friendly and has more than one liberty", () => {
            //[- W B ]
            //[B(W)B ]
            //[- B - ]
            const gameInstance = new Game(4, "W")
            const gameState = gameInstance.gameState
            updateGameStateWithPlacedStone(gameState, [0,1], "W", {liberties: [[0,0], [1,1]]})
            updateGameStateWithPlacedStone(gameState, [0,2], "B", {})
            updateGameStateWithPlacedStone(gameState, [1,0], "B", {})
            updateGameStateWithPlacedStone(gameState, [1,2], "B", {})
            updateGameStateWithPlacedStone(gameState, [2,1], "B", {})
            const isMoveValid = checkMoveIsValid(gameState, [1,1], "W")
            expect(isMoveValid).toEqual(true)
        })
        it("should return FALSE if the only friendly neighbour has ONLY ONE liberty", () => {
            //[B W B ]
            //[B(W)B ]
            //[- B - ]
            const gameInstance = new Game(4, "W")
            const gameState = gameInstance.gameState
            updateGameStateWithPlacedStone(gameState, [0,0], "B", {})
            updateGameStateWithPlacedStone(gameState, [0,1], "W", {liberties: [[1,1]]})
            updateGameStateWithPlacedStone(gameState, [0,2], "B", {})
            updateGameStateWithPlacedStone(gameState, [1,0], "B", {})
            updateGameStateWithPlacedStone(gameState, [1,2], "B", {})
            updateGameStateWithPlacedStone(gameState, [2,1], "B", {})
            const isMoveValid = checkMoveIsValid(gameState, [1,1], "W")
            expect(isMoveValid).toEqual(false)
        })
        it("should return TRUE if surrounded by a group of foes with only ONE liberty", () => {
            //[(W) B ]
            //[ B  B ]
            const gameInstance = new Game(2, "W")
            const gameState = gameInstance.gameState
            updateGameStateWithPlacedStone(gameState, [0,1], "B", {})
            updateGameStateWithPlacedStone(gameState, [1,0], "B", {liberties: [[1,1]]})
            updateGameStateWithPlacedStone(gameState, [1,1], "B", {})
            const isMoveValid = checkMoveIsValid(gameState, [0,0], "W")
            expect(isMoveValid).toEqual(true)
        })
        it("should return FALSE if surrounded by a group of foes with MORE THAN ONE liberty", () => {
            //[(W)B -]
            //[ B - -]
            //[ - - -]
            const gameInstance = new Game(3, "W")
            const gameState = gameInstance.gameState
            updateGameStateWithPlacedStone(gameState, [0,1], "B", {liberties: [[0,2], [1,1]]})
            updateGameStateWithPlacedStone(gameState, [1,0], "B", {liberties: [[2,0], [1,1]]})
            const isMoveValid = checkMoveIsValid(gameState, [0,0], "W")
            expect(isMoveValid).toEqual(false)
        })
    })
    describe("respondToPiecePlacementImpact()", () => {
        it("should remove a liberty from adjacent group if FOE", () => {
            //[ W(B)- ]
            //[ - - - ]
            //[ - - - ]
            const gameInstance = new Game(3, "W")
            const gameState = gameInstance.gameState
            gameInstance.requestCanPlacePiece([0,0])
            gameInstance.placePiece([0,0]) // W placed
            gameInstance.requestCanPlacePiece([0,1])
            gameInstance.placePiece([0,1]) // W placed
            const gameStateItem = getGameStateItemByPosition(gameState, [0,0])
            expect(gameStateItem.groupInstance.liberties).toHaveLength(1)
            expect(gameStateItem.groupInstance.liberties).toEqual([[1,0]])
        })
        it("should remove surrounded piece (W @ [1,1]) from board", () => {
            //[- B - -]
            //[B W B -]
            //[-(B)- -]
            //[- - - -]
            const gameInstance = new Game(4, "B")
            const gameState = gameInstance.gameState
            gameInstance.requestCanPlacePiece([0,1])
            gameInstance.placePiece([0,1]) // B placed
            gameInstance.requestCanPlacePiece([1,1])
            gameInstance.placePiece([1,1]) // W placed
            gameInstance.requestCanPlacePiece([1,0])
            gameInstance.placePiece([1,0]) // B placed
            gameInstance.color = "B"
            gameInstance.requestCanPlacePiece([1,2])
            gameInstance.placePiece([1,2]) // B placed
            gameInstance.color = "B"
            gameInstance.requestCanPlacePiece([2,1])
            gameInstance.placePiece([2,1]) // B placed
            const gameStateItem = getGameStateItemByPosition(gameState, [1,1])
            expect(gameStateItem.isStonePlaced).toEqual(false)
        })
        it("should combine adjacent pieces in to one group", () => {
            //[ B(B)]
            //[ - - ]
            const gameInstance = new Game(2, "B")
            const gameState = gameInstance.gameState
            gameInstance.requestCanPlacePiece([0,0])
            gameInstance.placePiece([0,0]) // B placed
            gameInstance.color = "B"
            gameInstance.requestCanPlacePiece([0,1])
            gameInstance.placePiece([0,1]) // B placed
            const gameStateItem00 = getGameStateItemByPosition(gameState, [0,0])
            const gameStateItem01 = getGameStateItemByPosition(gameState, [0,1])
            expect(gameStateItem00.groupInstance).toEqual(gameStateItem01.groupInstance)
        })
        it("should refund liberties when a piece is removed", () => {
            //[-- B1 -- --]
            //[B2 W1 B3 --]
            //[-- B4 -- --]
            //[-- -- -- --]
            const gameInstance = new Game(4, "B")
            const gameState = gameInstance.gameState
            gameInstance.requestCanPlacePiece([0,1])
            gameInstance.placePiece([0,1]) // B1 placed
            gameInstance.requestCanPlacePiece([1,1])
            gameInstance.placePiece([1,1]) // W1 placed
            gameInstance.requestCanPlacePiece([1,0])
            gameInstance.placePiece([1,0]) // B2 placed
            gameInstance.color = "B"
            gameInstance.requestCanPlacePiece([1,2])
            gameInstance.placePiece([1,2]) // B3 placed
            gameInstance.color = "B"
            let gameStateItem01 = getGameStateItemByPosition(gameState, [1,0])
            expect(gameStateItem01.groupInstance.liberties).toHaveLength(2)
            gameInstance.requestCanPlacePiece([2,1])
            gameInstance.placePiece([2,1]) // B4 placed
            gameStateItem01 = getGameStateItemByPosition(gameState, [1,0])
            expect(gameStateItem01.groupInstance.liberties).toHaveLength(3)
        })
    })
})
describe("Game class methods", () => {
    describe("requestCanPlacePiece()", () => {
        it("should allow a piece to be placed if current square is empty", () => {
            const gameInstance = new Game(3, "W")
            const {canPlace} = gameInstance.requestCanPlacePiece([0,0])
            expect(canPlace).toEqual(true)
        })
        it("should NOT allow a piece to be placed if current square is NOT empty", () => {
            const gameInstance = new Game(3, "W")
            gameInstance.requestCanPlacePiece([0,0])
            gameInstance.placePiece([0,0])
            const {canPlace} = gameInstance.requestCanPlacePiece([0,0])
            expect(canPlace).toEqual(false)
        })
    })
})