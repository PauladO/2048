import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

class Title extends PureComponent {
  static PropTypes = {
    content: PropTypes.string.isRequired,
  }
  
  render() {
    return (
      <h1>{ this.props.content }</h1>
    )
  }
}

export default Title
