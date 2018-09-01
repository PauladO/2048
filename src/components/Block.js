import React, { PureComponent } from 'react'
import './Block.css'

class Block extends PureComponent {
  render() {
    return (
      <div class="Block">
        { this.props.value }
      </div>
    )
  }
}

export default Block
