import React, { PureComponent } from 'react'
import Block from '../Block/Block'
import './BlockGrid.css'

class BlockGrid extends PureComponent {
  render() {
    const blocks = this.props.blocks
    return (
      <div className="BlockGrid">
        { blocks.map((line, lineIndex) => {
          return(
            <div className="Line" key={ lineIndex }>
              { line.map((block, blockIndex) => {
                  return(
                    <Block key={ blockIndex } value={ block } />
                  )
                })
              }
            </div>
          )
          })
        }
      </div>
    )
  }
}

export default BlockGrid
