import React, { PureComponent } from 'react'
import BlockGrid from './BlockGrid'
import './Board.css'

class Board extends PureComponent {
  render() {
    const blocks = [
      [2, 4, 8, 16],
      [32, 64, 128, 256],
      [512, 1024, 2048, 0],
      [0, 0, 0, 0]
    ]
    return (
      <div className="Board">
        <BlockGrid blocks={ blocks } />
      </div>
    )
  }
}

export default Board
