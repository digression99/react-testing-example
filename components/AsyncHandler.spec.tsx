import userEvent from '@testing-library/user-event'
import { render, screen } from '@testing-library/react'
import { AsyncHandler } from "./AsyncHandler";

describe("<AsyncComponent />", () => {

  beforeEach(() => {
    jest.useFakeTimers()
  })

  test('renders correctly', () => {
    const { container } = render(<AsyncHandler />)
    expect(container).toMatchSnapshot()
  })

  test('click the button', async () => {
    const user = userEvent.setup()
    render(<AsyncHandler />)
    const button = screen.getByRole('button', { name: /Show the text/i })
    expect(button).toBeInTheDocument()
    user.click(button)
    const text = await screen.findByText(/appeared/i, {}, { timeout: 2000 })
    expect(text).toBeInTheDocument()
  })
})