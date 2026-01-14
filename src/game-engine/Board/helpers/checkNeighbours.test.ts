import { StoneHandler } from "../../StoneHandler/StoneHandler"
import { getNeighbouringPositions } from "./checkNeighbours"
import {assert} from "vitest"

describe("getNeighbouringPositions", () => {
    it("should return a list of neighbouring positions", () => {
        const mockStoneHandler = new StoneHandler(8)
        const neighbouringGroups = getNeighbouringPositions(mockStoneHandler, [0,0])
        assert.equal(neighbouringGroups, '2')
    })

})