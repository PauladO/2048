import React, { PureComponent } from 'react'
import './Block.css'

class Block extends PureComponent {
  render() {
    const klassName = "Block Value-" + this.props.value
    return (
      <div className={ klassName }>
        <h1 className="Value">
          { this.props.value }
        </h1>
      </div>
    )
  }
}

export default Block
