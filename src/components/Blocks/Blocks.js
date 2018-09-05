import React, { PureComponent } from 'react'
import Block from '../Block/Block'
import '../BlockGrid/BlockGrid.css'

class Blocks extends PureComponent {
  constructor(props){
    super(props);
    this.handleMove = this.handleMove.bind(this);
  }

  handleMove(event){
    console.log("handling");
    if(event.keyCode === 37) {
      this.moveLeft()
    }
  //  if(event.keyCode === 38) {
  //     this.moveUp(newGrid)
  //   }
  // if(event.keyCode === 39) {
  //     this.moveRight(newGrid)
  //   }
  // if(event.keyCode === 40) {
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
    const block1 = this.generateBlock(blocks)
    blocks.push(block1)
    const block2 = this.generateBlock(blocks)
    blocks.push(block2)

    console.log("generated");
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

  moveBlocksLeft() {
    var hasMoved = false
    var updatedBlocks = this.state.blocks.map((block, index) => {
      for (var i = 0; i < block.xIndex; i++)  {
        var blockAtIndex = this.state.blocks.find((blck) => { return blck.xIndex === i})
        if (blockAtIndex && blockAtIndex.value === block.value) {
          block.hide = true
          block.merged = true
          this.state.blocks.find((blck) => { return blck.xIndex === i}).value = block.value * 2
        } else if (blockAtIndex) {
          continue
        } else {
          block.xIndex = i
          break
        }
      }
      return block
    })
    console.log('moved');
    return updatedBlocks
  }

  moveLeft() {
    console.log("moving");
    this.moveBlocksLeft()

    newBlocks = this.generateBlock(newBlocks)

    this.setState({blocks: newBlocks})
  }
  //
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



  generateBlock(blocks) {
    var indexOptions = [
      [0,0], [0,1], [0,2], [0,3],
      [1,0], [1,1], [1,2], [1,3],
      [2,0], [2,1], [2,2], [2,3],
      [3,0], [3,1], [3,2], [3,3]
    ]

    blocks.forEach((block, index) => {
      this.remove(indexOptions, [block.xIndex, block.yIndex])
    })

    var randomIndex = Math.floor(Math.random() * indexOptions.length)
    var Index = indexOptions[randomIndex]
    const newBlock = { xIndex: Index[0], yIndex: Index[1], value: this.generateNumber(), merged: false }

    return newBlock
  }

  remove(array, element) {
      const index = array.indexOf(element);
      array.splice(index, 1);
  }

  render() {
    const blocks = this.state.blocks
    return (
      <div className="Blocks">
        { blocks.map((block, index) => {
          return <Block key={ index } xIndex={ block.xIndex} yIndex={ block.yIndex } value={ block.value } />
          })
        }
      </div>
    )
  }
}

export default Blocks
