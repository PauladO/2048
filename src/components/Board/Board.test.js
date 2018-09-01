import React from 'react'
import { shallow } from 'enzyme'
import Board from './Board'

describe('<Board />', () => {
  const title = shallow(<Board />)

  it('has a wrapping div tag', () => {
    expect(title).toHaveTagName('div')
  })

})
