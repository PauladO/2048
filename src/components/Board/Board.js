import React, { PureComponent } from 'react'
import BlockGrid from '../BlockGrid/BlockGrid'
import './Board.css'

class Board extends PureComponent {
  constructor(props){
    super(props);
    this.escFunction = this.handleMove.bind(this);
  }

  handleMove(event){
    if(event.keyCode === 37) {
      console.log("left");
    } else if(event.keyCode === 38) {
      console.log("up");
    } else if(event.keyCode === 39) {
      console.log("right");
    } else if(event.keyCode === 40) {
      console.log("down");
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

    for(var i = 0; i < 2; i++) {
      const xIndex = this.generateIndex()
      const yIndex = this.generateIndex()
      const blockValue = this.generateNumber()
      blocks[yIndex][xIndex] = blockValue
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
