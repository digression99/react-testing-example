import { Text } from '@chakra-ui/react'
import { ApiRequest } from "../../components/ApiRequest";
import { PageLayout } from "../../components/layout/PageLayout";

const CounterExample = () => {
  return (
    <PageLayout>
      <Text>ApiRequest Example</Text>
      <ApiRequest />
    </PageLayout>
  )
}

export default CounterExample
