import {Box, Text, List, ListItem, Button, Input, Menu, MenuButton, MenuList, MenuItem} from '@chakra-ui/react'
import { faker } from '@faker-js/faker'
import {useCallback, useState, ComponentType, useMemo} from "react";
import { ChevronDownIcon } from '@chakra-ui/icons'

type Todo = {
  title: string
  completed: boolean
  id: string
}
type TodoFilterType = 'ALL' | 'COMPLETED' | 'WAITING'

const getTodoId = () => faker.datatype.uuid()
const getToggledTodo = (id: string, todo: Todo) => todo.id === id ? { ...todo, completed: !todo.completed } : todo
const getFilteredTodo = (filterType: TodoFilterType, todo: Todo) =>
  filterType === 'COMPLETED' && todo.completed
  || filterType === 'WAITING' && !todo.completed
  || filterType === 'ALL'

const useTodos = () => {
  const [list, setList] = useState<Todo[]>([])
  const [filter, setFilter] = useState<TodoFilterType>('ALL')

  const addTodo = useCallback(
    (title: string) => setList(ls =>
      ([...ls, {
        title, completed: false, id: getTodoId()
      }])
    ),
    [])

  const removeTodo = useCallback((id: string) =>
    setList(ls =>
      ls.filter(todo =>
        todo.id !== id
      )), [])

  const toggleTodo = useCallback((id: string) =>
    setList(ls =>
      ls.map(todo => getToggledTodo(id, todo)
      )), [])

  const changeFilter = useCallback((filterType: TodoFilterType) => setFilter(filterType), [])
  const filteredList = useMemo(() => list.filter(todo => getFilteredTodo(filter, todo)), [filter, list])
  return { list: filteredList, addTodo, removeTodo, toggleTodo, changeFilter }
}

type PureProps = {
  list: Todo[]
  onToggleTodo: (id: string) => void
  onRemoveTodo: (id: string) => void
  onAddTodo: (title: string) => void
  onFilterTodo: (filterType: TodoFilterType) => void
}

const PureFilteredTodoList = ({ list, onToggleTodo, onRemoveTodo, onAddTodo, onFilterTodo }: PureProps) => {
  const [title, setTitle] = useState('')

  const onCreate = () => {
    onAddTodo(title)
    setTitle('')
  }

  return (
    <Box>
      <Box>
        <Text>Todo Form</Text>
        <Input value={title} onChange={e => setTitle(e.target.value)} />
        <Button onClick={onCreate} disabled={!title}>Create</Button>
      </Box>

        <Menu>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
            Filters
          </MenuButton>
          <MenuList>
            <MenuItem onClick={() => onFilterTodo('ALL')}>All</MenuItem>
            <MenuItem onClick={() => onFilterTodo('COMPLETED')}>Completed</MenuItem>
            <MenuItem onClick={() => onFilterTodo('WAITING')}>Waiting</MenuItem>
          </MenuList>
        </Menu>

      <List>
        {list.map(todo =>
          <ListItem key={todo.id}>
            <Text textDecoration={todo.completed ? 'line-through' : 'none'}>{todo.title}</Text>
            <Box>
              <Button onClick={() => onRemoveTodo(todo.id)}>Remove</Button>
              <Button onClick={() => onToggleTodo(todo.id)}>Toggle</Button>
            </Box>
          </ListItem>)}
      </List>
    </Box>
  )
}

type Props = {}

const withTodos = (Component: ComponentType<PureProps>) => {
  return (props: Props) => {
    const { list, addTodo, removeTodo, toggleTodo, changeFilter } = useTodos()
    return <Component
      {...props}
      list={list}
      onAddTodo={addTodo}
      onFilterTodo={changeFilter}
      onRemoveTodo={removeTodo}
      onToggleTodo={toggleTodo}
    />
  }
}

export const FilteredTodoList = withTodos(PureFilteredTodoList)
