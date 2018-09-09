import React, { PureComponent } from 'react'
import './Block.css'

class Block extends PureComponent {
  componentDidUpdate() {
    if (this.props.dead) {
      var blocks = this.state.blocks
      blocks = blocks.filter((block) => {return block.id !== this.props.id})
      this.setState({blocks: blocks})
    }
  }

  constructClassName() {
    var klassName = "Block Value-" + this.props.value
    klassName += " x-" + this.props.xIndex
    klassName += " y-" + this.props.yIndex
    if(this.props.dead) {
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
