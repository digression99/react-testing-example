import { render } from '@testing-library/react'
import { PureCounter } from './Counter'

describe('<Counter />', () => {
  test('renders the component correctly', () => {
    const { container: container1 } = render(<PureCounter
      count={0}
      error={''}
      onIncrease={jest.fn()}
      onDecrease={jest.fn()}
      onReset={jest.fn()}
    />)

    expect(container1).toMatchSnapshot()

    const { container: container2 } = render(<PureCounter
      count={100}
      error={'Count is max.'}
      onIncrease={jest.fn()}
      onDecrease={jest.fn()}
      onReset={jest.fn()}
    />)
    expect(container2).toMatchSnapshot()
  })

  test('renders the special component correctly', () => {
    const { container } = render(<PureCounter
      count={30}
      error={'Count is min.'}
      onIncrease={jest.fn()}
      onDecrease={jest.fn()}
      onReset={jest.fn()}
    />)
    expect(container).toMatchSnapshot()
  })
})