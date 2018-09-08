import React, { PureComponent } from 'react'
import './Block.css'

class Block extends PureComponent {
  constructClassName() {
    var klassName = "Block Value-" + this.props.value
    klassName += " x-" + this.props.xIndex
    klassName += " y-" + this.props.yIndex
    if(this.props.value <= 0) {
      klassName += " dead-block"
    }
    return klassName
  }

  constructBlock() {
    const klassName = this.constructClassName()

    return(
      <div className={ klassName } >
        <h1 className="Value">
          { this.props.value }
        </h1>
      </div>
    )
  }

  render() {
    const block = this.constructBlock()

    return (
      <div>
          { block }
      </div>
    )
  }
}

export default Block
