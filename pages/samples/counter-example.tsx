import { Text } from '@chakra-ui/react'
import { Counter } from "../../components/Counter";
import { PageLayout } from "../../components/layout/PageLayout";

const CounterExample = () => {
  return (
    <PageLayout>
      <Text>Counter Example</Text>
      <Counter />
    </PageLayout>
  )
}

export default CounterExample