import React, { PureComponent } from 'react'
import Block from './Block'
import './BlockGrid.css'

class BlockGrid extends PureComponent {
  render() {
    console.log(this.props);
    return (
      <div className="BlockGrid">
        { this.props.blocks.map((line, lineIndex) => {
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
