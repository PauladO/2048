import React, { PureComponent } from 'react'
import Block from './Block'

class BlockGrid extends PureComponent {
  render() {
    return (
      <div class="BlockGrid">
        { this.props.blocks.map((line, index) => {
          return(
            <div class="Line">
              { line.map((block, index) => {
                  return(
                    <Block value={ block } />
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
