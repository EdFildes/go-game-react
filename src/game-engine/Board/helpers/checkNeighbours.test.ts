import { Position } from "@/game-engine/types"
import { StoneHandler } from "../../StoneHandler/StoneHandler"
import { getNeighbouringGroups, getNeighbouringPositions, checkNeighbours } from "./checkNeighbours"

describe("getNeighbouringPositions", () => {
    it("should return a list of neighbouring positions for [0,0]", () => {
        const origin: Position = [0,0]
        const mockStoneHandler = new StoneHandler(8)
        const neighbouringPositions = getNeighbouringPositions(mockStoneHandler, origin)
        expect(neighbouringPositions).toEqual([[0,1], [1,0]])
    })
        it("should return a list of neighbouring positions for [5,4]", () => {
        const origin: Position = [5,5]
        const mockStoneHandler = new StoneHandler(8)
        const neighbouringPositions = getNeighbouringPositions(mockStoneHandler, origin)
        expect(neighbouringPositions).toEqual([[4,5], [5,6], [6,5], [5,4]])
    })
})

describe("getNeighbouringGroups", () => {
    it("should return a list of neighbouring groups for positions [[0,0],[0,1],[1,0]]", () => {
        const positions: Position[] = [[0,0],[0,1],[1,0]]
        const mockStoneHandler = new StoneHandler(8)
        const stone = mockStoneHandler.getStone([0,0])
        stone.setGroupId(1)
        const neighbouringGroups = getNeighbouringGroups(mockStoneHandler, positions)
        expect(neighbouringGroups).toEqual([1])
    })
        it.skip("should return a list of neighbouring Groups for [5,4]", () => {
        const origin: Position = [5,5]
        const mockStoneHandler = new StoneHandler(8)
        const neighbouringGroups = getNeighbouringGroups(mockStoneHandler, origin)
        expect(neighbouringGroups).toEqual([[4,5], [5,6], [6,5], [5,4]])
    })
})

describe("checkNeighbours", () => {
    it("should return a list of properties relating to any neighbours", () => {
        const position: Position = [0,0]
        const mockStoneHandler = new StoneHandler(8)
        const stone = mockStoneHandler.getStone([0,1])
        stone.setColor("X")
        stone.setGroupId(1)
        const neighbourProps = checkNeighbours(mockStoneHandler, position, "X")
        const expectedProps = [
            {
                type: "FRIENDLY",
                groupInstance: undefined,
                position: [0,1],
                neighbouringGroups: [1]
            },
            {
                type: "EMPTY",
                groupInstance: undefined,
                position: [1,0],
                neighbouringGroups: [1]
            },
        ]
        expect(neighbourProps).toEqual([1])
    })
        it.skip("should return a list of neighbouring Groups for [5,4]", () => {
        const origin: Position = [5,5]
        const mockStoneHandler = new StoneHandler(8)
        const neighbouringGroups = getNeighbouringGroups(mockStoneHandler, origin)
        expect(neighbouringGroups).toEqual([[4,5], [5,6], [6,5], [5,4]])
    })

})