import React, { PureComponent } from 'react'
import BlockGrid from '../BlockGrid/BlockGrid'
import './Board.css'

class Board extends PureComponent {
  constructor(props){
    super(props);
    this.handleMove = this.handleMove.bind(this);
  }

  handleMove(event){
    var newGrid = this.emptyGrid()

    if(event.keyCode === 37) {
      this.moveLeft(newGrid)
    } else if(event.keyCode === 38) {
      this.moveUp(newGrid)
    } else if(event.keyCode === 39) {
      this.moveRight(newGrid)
    } else if(event.keyCode === 40) {
      this.moveDown(newGrid)
    }
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

  moveBlocksLeft(newGrid) {
    this.state.blocks.forEach((line, lineIndex) => {
      var lastPlacedAt = -1
      line.forEach((block, blockIndex) => {
        if(block > 0 && block == newGrid[lineIndex][lastPlacedAt]) {
          newGrid[lineIndex][lastPlacedAt] = block * 2
        } else if(block > 0) {
          lastPlacedAt ++
          newGrid[lineIndex][lastPlacedAt] = block
        }
      })
    })
    return newGrid
  }


  moveLeft(newGrid) {
    var newBlocks  = this.moveBlocksLeft(newGrid)
    newBlocks = this.addNewBlocks(newBlocks, 1)

    this.setState({blocks: newBlocks})
  }

  moveRight(newGrid) {
    this.state.blocks.forEach((line, lineIndex) => {
      var lastPlacedAt = 4
      line.reverse().forEach((block, blockIndex) => {
        if(block > 0 && block == newGrid[lineIndex][lastPlacedAt]) {
          newGrid[lineIndex][lastPlacedAt] = block * 2
        } else if(block > 0) {
          lastPlacedAt--
          newGrid[lineIndex][lastPlacedAt] = block
        }
      })
    })

    var newBlocks = this.addNewBlocks(newGrid, 1)

    this.setState({blocks: newBlocks})
  }

  moveUp(newGrid) {
    for(var i = 0; i < 4; i++){
      var lastPlacedAt = -1
      this.state.blocks.forEach((line, lineIndex) => {
        if( line[i] > 0 && newGrid[lastPlacedAt] && line[i] == newGrid[lastPlacedAt][i]) {
          newGrid[lastPlacedAt][i] =  line[i] * 2
        } else if(line[i] > 0) {
          lastPlacedAt++
          newGrid[lastPlacedAt][i] = line[i]
        }
      })
    }

    var newBlocks = this.addNewBlocks(newGrid, 1)

    this.setState({blocks: newBlocks})
  }

  moveDown(newGrid) {
    for(var i = 0; i < 4; i++){
      var lastPlacedAt = 4
      for(var j = 3; j >= 0; j--) {
        if(this.state.blocks[j][i] > 0 && newGrid[lastPlacedAt] && this.state.blocks[j][i] == newGrid[lastPlacedAt][i]) {
          newGrid[lastPlacedAt][i] = this.state.blocks[j][i] *2
        } else if(this.state.blocks[j][i] > 0) {
          lastPlacedAt--
          newGrid[lastPlacedAt][i] = this.state.blocks[j][i]
        }
      }
    }
    var newBlocks = this.addNewBlocks(newGrid, 1)
    this.setState({blocks: newBlocks})
  }


  setStartState() {
    const grid = this.emptyGrid()

    const blocks = this.addNewBlocks(grid, 2)

    this.setState({
        blocks: blocks
    })
  }

  addNewBlocks(grid, numberOfBlocks) {
    var placed = 0

    while(placed < numberOfBlocks) {
      const xIndex = this.generateIndex()
      const yIndex = this.generateIndex()
      const blockValue = this.generateNumber()
      if(grid[yIndex][xIndex] === 0) {
        grid[yIndex][xIndex] = blockValue
        placed++
      }
    }

    return grid
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

  emptyGrid() {
    return [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ]
  }

  render() {

    return (
      <div className="Board">
        <BlockGrid blocks={ this.state.blocks } />
      </div>
    )
  }
}

export default Board
