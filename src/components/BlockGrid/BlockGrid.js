import React, { PureComponent } from 'react'
import EmptyBlock from '../EmptyBlock/EmptyBlock'
import './BlockGrid.css'

class BlockGrid extends PureComponent {
  render() {
    const emptyGrid = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]]
    return (
      <div className="BlockGrid">
        { emptyGrid.map((line, lineIndex) => {
          return(
            <div className="Line" key={ lineIndex }>
              { line.map((block, blockIndex) => {
                  return(
                    <EmptyBlock key={ blockIndex } />
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
