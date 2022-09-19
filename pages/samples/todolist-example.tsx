import { Text } from '@chakra-ui/react'
import { FilteredTodoList } from "../../components/FilteredTodoList";
import { PageLayout } from "../../components/layout/PageLayout";

const TodoListExample = () => {
  return (
    <PageLayout>
      <Text>Todo List Example</Text>
      <FilteredTodoList />
    </PageLayout>
  )
}

export default TodoListExample
