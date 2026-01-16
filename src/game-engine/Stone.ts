export class Stone {
  exists = false 
  color = null
  groupId = null
  position
  stoneColorHandler = (color) => {}
  
  constructor(position, stoneColorHandler) {
    this.position = position
    this.stoneColorHandler = stoneColorHandler
  }

  setStoneColorHandler(stoneColorHandler){
    this.stoneColorHandler = stoneColorHandler
  }

  setColor(color){
    this.color = color
    console.log(this.stoneColorHandler)
    this.stoneColorHandler(color)
  }

  setGroupId(id){
    this.groupId = id
  }

}