import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { shallow } from 'enzyme'
import Title from './components/Title'

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

describe('<App />', () => {
  const app = shallow(<App />)
  const title = <Title content="2048" />

  it('wraps everyting in a div tag', () => {
    expect(app).toHaveTagName('div')
  })

  it('contains a Title', () => {
    expect(app).toContainReact(title)
  })
})
