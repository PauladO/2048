import React, { PureComponent } from 'react'
import './Block.css'

class Block extends PureComponent {
  componentWillUpdate() {

  }

  constructClassName() {
    var klassName = "Block Value-" + this.props.value
    klassName += " x-" + this.props.xIndex
    klassName += " y-" + this.props.yIndex
    if(this.props.hide) {
      klassName += " hidden-block"
    }
    return klassName
  }

  render() {
    const klassName = this.constructClassName()
    return (
      <div className={ klassName } >
        <h1 className="Value">
          { this.props.value }
        </h1>
      </div>
    )
  }
}

export default Block
