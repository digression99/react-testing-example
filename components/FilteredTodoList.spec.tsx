import { render, screen } from '@testing-library/react'
import { FilteredTodoList, PureFilteredTodoList, Todo } from './FilteredTodoList'
import userEvent from '@testing-library/user-event'

const fakeData: Todo[] = [
  { title: 'Test todo 1', completed: false, id: 'test-id-1' },
  { title: 'Test todo 2', completed: true, id: 'test-id-2' },
  { title: 'Test todo 3', completed: false, id: 'test-id-3' },
  { title: 'Test todo 4', completed: true, id: 'test-id-4' },
]

describe('<FilteredTodoList />', () => {
  test('renders the component correctly', () => {
    const { container } = render(
      <PureFilteredTodoList
        list={fakeData}
        onToggleTodo={jest.fn()}
        onRemoveTodo={jest.fn()}
        onFilterTodo={jest.fn()}
        onAddTodo={jest.fn()}
      />
    )
    expect(container).toMatchSnapshot()
  })

  test('Add todo with a text, and it calls the method.', async () => {
    const user = userEvent.setup()
    const addTodoFn = jest.fn()
    render(
      <PureFilteredTodoList
        list={fakeData}
        onToggleTodo={jest.fn()}
        onRemoveTodo={jest.fn()}
        onFilterTodo={jest.fn()}
        onAddTodo={addTodoFn}
      />
    )
    const input = screen.getByRole('textbox', { name: 'title' })
    await user.type(input, 'Test todo 5')
    const createButton = screen.getByRole('button', { name: 'Create' })
    await user.click(createButton)
    expect(addTodoFn).toBeCalledWith('Test todo 5')
  })

  test('Add todo with a text, and it shows on the list', async () => {
    const user = userEvent.setup()
    render(<FilteredTodoList />)

    const input = screen.getByRole('textbox', { name: 'title' })
    await user.type(input, 'Test todo 1')
    const createButton = screen.getByRole('button', { name: 'Create' })
    await user.click(createButton)
    expect(screen.getByText('Test todo 1')).toBeInTheDocument()
  })

  test('Change filter to "Completed" and it changes the list', async () => {
    const user = userEvent.setup()
    render(<FilteredTodoList />)

    const input = screen.getByRole('textbox', { name: 'title' })
    await user.type(input, 'Test todo 1')
    const createButton = screen.getByRole('button', { name: 'Create' })
    await user.click(createButton)
    expect(screen.getByText('Test todo 1')).toBeInTheDocument()

    await user.type(input, 'Test todo 2')
    await user.click(createButton)
    expect(screen.getByText('Test todo 2')).toBeInTheDocument()

    const menu = await screen.findByText(/filters/i)
    await user.click(menu)
    const completedFilterButton = await screen.findByText(/completed/i)
    await user.click(completedFilterButton)
    expect(screen.queryAllByText(/Test todo/i)).toHaveLength(0)

    await user.click(menu)
    const allFilterButton = await screen.findByText(/all/i)
    await user.click(allFilterButton)

    // You can debug the screen with this method.
    screen.debug()
    expect(screen.getByText('Test todo 1')).toBeInTheDocument()
    expect(screen.queryAllByText(/Test todo/i)).toHaveLength(2)
  })
})
