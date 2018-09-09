import React, { PureComponent } from 'react'
import Button from '@material-ui/core/Button'
import './WinGamePopup.css'

class WinGamePopup extends PureComponent {

  render() {
    const style = this.props.gameFinished ? {} : {display: "none"}
    return (
      <div className="WinGamePopup" style={ style }>
          <h1>You win!</h1>
          <Button variant="contained" className="restart" >
            Restart
          </Button>
          <Button variant="contained" color="secondary" className="continue" >
            Continue
          </Button>
      </div>
    )
  }
}

export default WinGamePopup
