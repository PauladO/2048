import React, { PureComponent } from 'react'
import BlockGrid from '../BlockGrid/BlockGrid'
import Block from '../Block/Block'
import './Board.css'

class Board extends PureComponent {
  constructor(props){
    super(props);
    this.handleMove = this.handleMove.bind(this);
    this.hasMoved = false
    this.availableCoordinates = [
      [0,0], [0,1], [0,2], [0,3],
      [1,0], [1,1], [1,2], [1,3],
      [2,0], [2,1], [2,2], [2,3],
      [3,0], [3,1], [3,2], [3,3]
    ]
  }

  handleMove(event){
    if(event.keyCode === 37) {
      this.moveLeft()
    }
  //  if(event.keyCode === 38) {
  //     this.moveUp(newGrid)
  //   }
  //  if(event.keyCode === 39) {
  //     this.moveRight(newGrid)
  //   }
  //  if(event.keyCode === 40) {
  //     this.moveDown(newGrid)
  //   }
  }

  componentDidMount(){
    document.addEventListener("keydown", this.handleMove, false);
  }
  componentWillUnmount(){
    document.removeEventListener("keydown", this.handleMove, false);
  }

  componentWillMount() {
    this.setStartState()
  }


  setStartState() {
    const blocks = []
    const block1 = this.generateBlock()
    blocks.push(block1)
    const block2 = this.generateBlock()
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

  moveBlock(block) {
    for (var i = 0; i < block.xIndex; i++)  {
      var blockAtIndex = this.state.blocks.find((blck) => { return blck.yIndex == block.yIndex && blck.xIndex === i})

      if (blockAtIndex && blockAtIndex.value === block.value && !blockAtIndex.merged) {
        block.value = block.value * 2
        block.xIndex = i
        block.merged = true
        this.state.blocks.find((blck) => { return blck.xIndex === i}).hide = true
        this.hasMoved = true
      } else if (blockAtIndex) {
        continue
      } else {
        block.xIndex = i
        this.hasMoved = true

        break
      }
    }
    return block
  }

  moveBlocksLeft() {
    var updatedBlocks = this.state.blocks.map((block, index) => {

      this.moveBlock(block)

      return block
    })

    if(this.hasMoved) {
      updatedBlocks.push(this.generateBlock())
    }
    return updatedBlocks
  }


  moveLeft() {
    var newBlocks  = this.moveBlocksLeft()

    this.setBoard(newBlocks)

  }

  setBoard(newBlocks) {
    this.setState({blocks: newBlocks}) //Moves blocks
    const blocks =  newBlocks.filter(block => block.hide !== true);
    this.setState({blocks: blocks}) //removes hidden
  }

  // moveRight(newGrid) {
  //   this.state.blocks.forEach((line, lineIndex) => {
  //     var lastPlacedAt = 4
  //     line.reverse().forEach((block, blockIndex) => {
  //       if(block > 0 && block == newGrid[lineIndex][lastPlacedAt]) {
  //         newGrid[lineIndex][lastPlacedAt] = block * 2
  //       } else if(block > 0) {
  //         lastPlacedAt--
  //         newGrid[lineIndex][lastPlacedAt] = block
  //       }
  //     })
  //   })
  //
  //   var newBlocks = this.generateBlock(newGrid, 1)
  //
  //   this.setState({blocks: newBlocks})
  // }
  //
  // moveUp(newGrid) {
  //   for(var i = 0; i < 4; i++){
  //     var lastPlacedAt = this.startIndex()
  //     for(var j = 0; j < 4; j++) {
  //       var currentBlock = this.state.blocks[j][i]
  //       if(this.hitsSameValueBlock(currentBlock, newGrid[lastPlacedAt], i)) {
  //         newGrid[lastPlacedAt][i] =  this.doubleBlockValue(j, i)
  //       } else if(this.blockHasValue(currentBlock)) {
  //         lastPlacedAt++
  //         newGrid[lastPlacedAt][i] = currentBlock
  //       }
  //     }
  //   }
  //
  //   var newBlocks = this.generateBlock(newGrid, 1)
  //
  //   this.setState({blocks: newBlocks})
  // }

  blockHasValue(currentBlock) {
    return currentBlock > 0
  }

  hitsSameValueBlock(currentBlock, line, xIndex) {
    return currentBlock > 0 && line && currentBlock === line[xIndex]
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

  // moveDown(newGrid) {
  //   for(var i = 0; i < 4; i++){
  //     var lastPlacedAt = this.endIndex()
  //     for(var j = 3; j >= 0; j--) {
  //       var currentBlock = this.state.blocks[j][i]
  //       if(this.hitsSameValueBlock(currentBlock, newGrid[lastPlacedAt], i)) {
  //         newGrid[lastPlacedAt][i] = currentBlock *2
  //       } else if(this.blockHasValue(currentBlock)) {
  //         lastPlacedAt--
  //         newGrid[lastPlacedAt][i] = currentBlock
  //       }
  //     }
  //   }
  //
  //   var newBlocks = this.generateBlock(newGrid, 1)
  //   this.setState({blocks: newBlocks})
  // }



  generateBlock() {
    var available = this.availableCoordinates
    var randomIndex = Math.floor(Math.random() * available.length)
    var coordinates = available[randomIndex]
    const newBlock = { xIndex: coordinates[0], yIndex: coordinates[1], value: this.generateNumber() }
    console.log(coordinates);
    available.splice(randomIndex, 1)
    console.log(available);

    return newBlock
  }

  remove(array, element) {
      const index = array.indexOf(element)
      array.splice(index, 1)
      return array
  }

  render() {
    return (
      <div className="Board">
        <BlockGrid />
        { this.state.blocks.map((block, index) => {
          return <Block key={ index } xIndex={ block.xIndex } yIndex={ block.yIndex } value={ block.value } hide={ block.hide }/>
          })
        }
      </div>
    )
  }
}

export default Board
