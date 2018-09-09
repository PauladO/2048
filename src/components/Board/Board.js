import React, { PureComponent } from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import BlockGrid from '../BlockGrid/BlockGrid'
import Block from '../Block/Block'
import './Board.css'

class Board extends PureComponent {
  constructor(props){
    super(props);
    this.handleDirection = this.handleDirection.bind(this);
    this.hasMoved = false
    this.blockCount = 0
  }

  handleDirection(event){
    if(event.keyCode === 37) { // left
      this.move("left")
    }
   if(event.keyCode === 38) { // up
     this.move("up")
    }
   if(event.keyCode === 39) { // right
      this.move("right")
   }
   if(event.keyCode === 40) { // down
      this.move("down")
    }
  }

  componentDidMount(){
    document.addEventListener("keydown", this.handleDirection, false);
  }
  componentWillUnmount(){
    document.removeEventListener("keydown", this.handleDirection, false);
  }

  componentWillMount() {
    this.setStartState()
  }

  setStartState() {
    const blocks = []
    const block1 = this.generateBlock(blocks)
    blocks.push(block1)
    const block2 = this.generateBlock(blocks)
    blocks.push(block2)

    this.setState({
        blocks: blocks
    })
  }

  generateIndex() {
    const rand = Math.floor((Math.random() * 4))
    return rand
  }

  generateNumber() {
    const odds = Math.random();

    if(odds < 0.95) {
      return 2
    } else {
      return 4
    }
  }

  killBlock(index) {
    var blocks = this.state.blocks
    blocks[index].dead = true
    this.setState({blocks: blocks})
  }

  moveBlock(block, index, xDirection, yDirection) {
    while (true) {
      var blockAtIndex = this.getBlockAtIndex(block, xDirection, yDirection)
      if (this.hitsSameValueBlock(blockAtIndex, block)) {
        block.value = block.value * 2
        block = this.setNewCoordinates(block, xDirection, yDirection)
        block.merged = true
        this.killBlock(this.state.blocks.indexOf(blockAtIndex))
        this.hasMoved = true
        break
      } else if (this.finishedMoving(blockAtIndex, block, xDirection, yDirection)) {
        break
      } else {
        block = this.setNewCoordinates(block, xDirection, yDirection)
        this.hasMoved = true
      }

      this.setState({blocks: this.setNewBlock(block, index)})
    }

    return block
  }

  getBlockAtIndex(block, xDirection, yDirection) {
    return (this.state.blocks.find((blck) => { return blck.yIndex === (block.yIndex + yDirection)  && blck.xIndex === (block.xIndex + xDirection) && blck.value > 0}))
  }

  setNewBlock(block, index) {
    var stateBlocks = this.state.blocks
    stateBlocks[index] = block
    return stateBlocks
  }

  setNewCoordinates(block, xDirection, yDirection) {
    block.xIndex += xDirection
    block.yIndex += yDirection
    return block
  }

  finishedMoving(blockAtIndex, block, xDirection, yDirection) {
    return (!!blockAtIndex || (block.xIndex + xDirection) < 0 || (block.xIndex + xDirection) > 3 || (block.yIndex + yDirection) < 0 || (block.yIndex + yDirection) > 3)
  }

  setXDirection(direction) {
    if (direction === "left") {
      return -1
    } else if (direction === "right") {
      return 1
    } else {
      return 0
    }
  }

  setYDirection(direction) {
    if (direction === "up") {
      return -1
    } else if (direction === "down") {
      return 1
    } else {
      return 0
    }
  }

  sortBlocksForDirection(direction) {
    if (direction === "left") {
      return this.state.blocks.sort((block1, block2) => { return block1.xIndex - block2.xIndex })
    } else if (direction === "right") {
      return this.state.blocks.sort((block1, block2) => { return block2.xIndex - block1.xIndex })
    } else if (direction === "up") {
      return this.state.blocks.sort((block1, block2) => { return block1.yIndex - block2.yIndex })
    } else if (direction === "down") {
      return this.state.blocks.sort((block1, block2) => { return block2.yIndex - block1.yIndex })
    }
  }

  moveBlocks(direction) {
    var xIndex = this.setXDirection(direction)
    var yIndex = this.setYDirection(direction)

    var sortedBlocks = this.sortBlocksForDirection(direction)
    var updatedBlocks = sortedBlocks.map((block, index) => {
      block.new = false
      block.prevXIndex = block.xIndex
      block.prevYIndex = block.yIndex
      this.moveBlock(block, index, xIndex, yIndex)
      return block
    })

    return updatedBlocks
  }

  move(direction) {
    var newBlocks = this.moveBlocks(direction)
    if (this.hasMoved) {
      if (this.availableCoordinates(newBlocks).length > 0) {
        newBlocks.push(this.generateBlock(newBlocks))
      }
      this.hasMoved = false
    }
    this.setBoard(newBlocks)
  }

  setBoard(blocks) {
    this.setState({blocks: blocks}) //Moves blocks

    blocks = blocks.filter(block => { return !block.dead })
    blocks = blocks.map((block) => {
      block.merged = false
      return block
    })

    this.setState({blocks: blocks}) //Moves blocks
  }

  blockHasValue(currentBlock) {
    return currentBlock > 0
  }

  hitsSameValueBlock(block1, block2) {
    return (!!block1) && !block2.dead && !block1.dead && block2.value === block1.value && !block2.merged && !block1.merged
  }

  doubleBlockValue(xIndex, yIndex) {
    return this.state.blocks[xIndex][yIndex] * 2
  }

  startIndex() {
    return -1
  }

  endIndex() {
    return 4
  }

  availableCoordinates(blocks) {
    var coordinates = [
      [ 0,0 ], [0,1], [0,2], [0,3],
      [ 1,0 ], [1,1], [1,2], [1,3],
      [ 2,0 ], [2,1], [2,2], [2,3],
      [ 3,0 ], [3,1], [3,2], [3,3],
    ]

    blocks.forEach((block) => {
      	coordinates = coordinates.filter((coordinate) => { return !(coordinate[0] === block.xIndex && coordinate[1] === block.yIndex)})
    })
    return coordinates
  }

  generateBlock(blocks) {
    var available = this.availableCoordinates(blocks)
    if(available.length === 0) {
      return null
    }

    var randomIndex = Math.floor(Math.random() * available.length)

    var coordinates = available[randomIndex]
    if (coordinates.count === 0) {
      return null
    }

    const newBlock = { xIndex: coordinates[0], yIndex: coordinates[1], value: this.generateNumber(), merged: false, id: this.blockCount, new: true }
    this.blockCount ++

    return newBlock
  }

  remove(array, element) {
      const index = array.indexOf(element)
      array.splice(index, 1)
      return array
  }

  setMovement(block) {
    let {xIndex, yIndex, prevYIndex, prevXIndex} = block
    let xPosition = 17.5 + (xIndex * 140)
    let yPosition = 17.5 + (yIndex * 140)

    let ease = ((prevXIndex - xIndex) + (prevYIndex - yIndex)) * 0.2
    ease = Math.sqrt(Math.pow(ease, 2)).toPrecision(1)

    return [xPosition, yPosition, ease]
  }


  render() {
    const transitionOptions = {
      transitionName: "fade",
      transitionEnterTimeout: 200,
      transitionLeaveTimeout: 1,
    }

    return (
      <div className="Board">
        <BlockGrid />
        { this.state.blocks.filter((block) => { return block.new }).map((block, index) => {
            return(
              <ReactCSSTransitionGroup key={ index } {...transitionOptions}>
                <Block key={ block.id } id={ block.id } xIndex={ block.xIndex } yIndex={ block.yIndex } value={ block.value } hide={ block.dead }/>
              </ReactCSSTransitionGroup>
            )
          })
        }
        { this.state.blocks.filter((block) => { return !block.new }).map((block, index) => {
          let movement = this.setMovement(block)
          if (block.xIndex !== block.prevXIndex || block.yIndex !== block.prevYIndex) {
            console.log(`${block.prevXIndex} => ${block.xIndex}, ${block.prevYIndex} => ${block.yIndex} ==> ${movement}`);
          }

            return(
              <Block key={ block.id } id={ block.id } xIndex={ block.xIndex } yIndex={ block.yIndex } value={ block.value } hide={ block.dead } style={{transform: `translate(${movement[0]}px,${movement[1]}px)`, transition: `all ${movement[2]}s ease`}}/>

            )
          })
        }
      </div>
    )
  }
}

export default Board
