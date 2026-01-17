import { StoneHandler } from "./StoneHandler"

describe("placeStone()", () => {
    it("should place first stone in the correct position", () => {
        const stoneHandler = new StoneHandler(3)
        stoneHandler.placeStone([0,0], "W")
        const actualPositions = stoneHandler.getStoneProperties("color")
        const expectedPositions = [
            ["W", null, null],
            [null, null, null],
            [null, null, null],
        ]
        expect(actualPositions).toEqual(expectedPositions)
    })
    it("should place first two stones in the correct positions", () => {
        const stoneHandler = new StoneHandler(3)
        stoneHandler.placeStone([0,0], "W")
        stoneHandler.placeStone([0,1], "B")
        const actualPositions = stoneHandler.getStoneProperties("color")
        const expectedPositions = [
            ["W", "B", null],
            [null, null, null],
            [null, null, null],
        ]
        expect(actualPositions).toEqual(expectedPositions)
    })
})