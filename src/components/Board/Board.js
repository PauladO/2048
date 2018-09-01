import React, { PureComponent } from 'react'
import BlockGrid from '../BlockGrid/BlockGrid'
import './Board.css'

class Board extends PureComponent {
  constructor(props){
    super(props);
    this.handleMove = this.handleMove.bind(this);
  }

  handleMove(event){
    if(event.keyCode === 37) {
      this.moveLeft()
    } else if(event.keyCode === 38) {
      this.moveUp()
    } else if(event.keyCode === 39) {
      this.moveRight()
    } else if(event.keyCode === 40) {
      this.moveDown()
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


  moveLeft() {
    var newBlocks =  [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ]

    this.state.blocks.forEach((line, lineIndex) => {
      var lastPlacedAt = -1
      line.forEach((block, blockIndex) => {
        if(block > 0) {
          lastPlacedAt ++
          newBlocks[lineIndex][lastPlacedAt] = block
        }
      })
    })

    this.setState({blocks: newBlocks})
  }

  moveRight() {
    var newBlocks =  [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ]

    this.state.blocks.forEach((line, lineIndex) => {
      var lastPlacedAt = 4
      line.reverse().forEach((block, blockIndex) => {
        if(block > 0) {
          lastPlacedAt--
          newBlocks[lineIndex][lastPlacedAt] = block
        }
      })
    })

    this.setState({blocks: newBlocks})
  }

  moveUp() {
    var newBlocks =  [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ]

    for(var i = 0; i < 4; i++){
      var lastPlacedAt = -1
      this.state.blocks.forEach((line, lineIndex) => {
        if(line[i] > 0) {
          lastPlacedAt++
          newBlocks[lastPlacedAt][i] = line[i]
        }
      })
    }
    this.setState({blocks: newBlocks})
  }

    moveDown() {
      var newBlocks =  [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
      ]

      for(var i = 0; i < 4; i++){
        var lastPlacedAt = 4
        this.state.blocks.reverse().forEach((line, lineIndex) => {
          if(line[i] > 0) {
            lastPlacedAt--
            newBlocks[lastPlacedAt][i] = line[i]
          }
        })
      }
      this.setState({blocks: newBlocks})
    }


  setStartState() {
    const blocks = this.setBlocks()

    this.setState({
        blocks: blocks
    })
  }

  setBlocks() {
    const blocks = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ]

    var placed = 0

    while(placed < 2) {
      const xIndex = this.generateIndex()
      const yIndex = this.generateIndex()
      const blockValue = this.generateNumber()
      if(blocks[yIndex][xIndex] === 0) {
        blocks[yIndex][xIndex] = blockValue
        placed++
      }
    }

    return blocks
  }

  generateIndex() {
    const rand = Math.floor((Math.random() * 4))
    return rand
  }

  generateNumber() {
    const odds = Math.random();

    if(odds < 0.8) {
      return 2
    } else {
      return 4
    }
  }

  moveBlocks(e) {
      console.log(e);
      // prints either LoginInput or PwdInput
  }

  render() {

    return (
      <div className="Board">
        <BlockGrid onKeyDown={ this.moveBlocks() } blocks={ this.state.blocks } />
      </div>
    )
  }
}

export default Board
