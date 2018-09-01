import React, { PureComponent } from 'react'
import BlockGrid from './BlockGrid'
import './Board.css'

class Board extends PureComponent {
  render() {
    const blocks = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0]
    ]
    return (
      <div class="Board">
        <BlockGrid blocks={ blocks } />
      </div>
    )
  }
}

export default Board
