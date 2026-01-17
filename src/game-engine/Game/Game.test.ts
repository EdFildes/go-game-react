import { Game } from "./Game"
import { updateGameStateWithPlacedStone } from "./helperFunctions/initialisation"
import { checkIsPlacementCompatibleWithNeighbours } from "./helperFunctions/neighbours"
import { checkIsPositionEmpty } from "./helperFunctions/pieces"

describe("Game helper functions", () => {
    describe("checkIsPositionEmpty()", () => {
        it("should return true if position is empty", () => {
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
    describe("checkIsPlacementCompatibleWithNeighbours()", () => {
        it("should return true if one nieghbour is empty", () => {
            //[- B - -]
            //[B - B -]
            //[- - - -]
            //[- - - -]
            const gameInstance = new Game(4, "W")
            const gameState = gameInstance.gameState
            updateGameStateWithPlacedStone(gameState, [0,1], "B")
            updateGameStateWithPlacedStone(gameState, [1,0], "B")
            updateGameStateWithPlacedStone(gameState, [1,2], "B")
            const areNeighboursHappy = checkIsPlacementCompatibleWithNeighbours(gameState, [1,1], "W")
            expect(areNeighboursHappy).toEqual(true)
        })
        it("should return false if NO nieghbours are empty", () => {
            //[- B - -]
            //[B - B -]
            //[- B - -]
            //[- - - -]
            const gameInstance = new Game(4, "W")
            const gameState = gameInstance.gameState
            updateGameStateWithPlacedStone(gameState, [0,1], "B")
            updateGameStateWithPlacedStone(gameState, [1,0], "B")
            updateGameStateWithPlacedStone(gameState, [1,2], "B")
            updateGameStateWithPlacedStone(gameState, [2,1], "B")
            const areNeighboursHappy = checkIsPlacementCompatibleWithNeighbours(gameState, [1,1], "W")
            expect(areNeighboursHappy).toEqual(false)
        })
        it("should return true if at least one neighbour is friendly", () => {
            //[- W - -]
            //[B - B -]
            //[- B - -]
            //[- - - -]
            const gameInstance = new Game(4, "W")
            const gameState = gameInstance.gameState
            updateGameStateWithPlacedStone(gameState, [0,1], "W")
            updateGameStateWithPlacedStone(gameState, [1,0], "B")
            updateGameStateWithPlacedStone(gameState, [1,2], "B")
            updateGameStateWithPlacedStone(gameState, [2,1], "B")
            const areNeighboursHappy = checkIsPlacementCompatibleWithNeighbours(gameState, [1,1], "W")
            expect(areNeighboursHappy).toEqual(true)
        })
        it("should return true if at least one neighbour is friendly and has at least one liberty", () => {
            //[W W B -]
            //[B - B -]
            //[- - - -]
            //[- - - -]
            const gameInstance = new Game(4, "W")
            const gameState = gameInstance.gameState
            updateGameStateWithPlacedStone(gameState, [0,0], "W")
            updateGameStateWithPlacedStone(gameState, [0,1], "W")
            updateGameStateWithPlacedStone(gameState, [0,2], "B")
            updateGameStateWithPlacedStone(gameState, [1,0], "B")
            updateGameStateWithPlacedStone(gameState, [1,2], "B")
            const areNeighboursHappy = checkIsPlacementCompatibleWithNeighbours(gameState, [1,1], "W")
            expect(areNeighboursHappy).toEqual(true)
        })
        it("should return false if a neighbour is friendly and has only one liberty", () => {
            //[W W B -]
            //[B - B -]
            //[- B - -]
            //[- - - -]
            const gameInstance = new Game(4, "W")
            const gameState = gameInstance.gameState
            updateGameStateWithPlacedStone(gameState, [0,1], "W")
            updateGameStateWithPlacedStone(gameState, [1,0], "B")
            updateGameStateWithPlacedStone(gameState, [1,2], "B")
            updateGameStateWithPlacedStone(gameState, [2,1], "B")
            const areNeighboursHappy = checkIsPlacementCompatibleWithNeighbours(gameState, [1,1], "W")
            expect(areNeighboursHappy).toEqual(false)
        })
    })
    describe("updateGameStateWithPosition()", () => {
        it("should modify the gameState with", () => {

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