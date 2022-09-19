import {Center, Text } from '@chakra-ui/react'
import type { NextPage } from 'next'
import { PageLayout } from "../components/layout/PageLayout";

const Home: NextPage = () => {
  return (
    <PageLayout>
      <Center>
        <Text>Welcome to</Text>
        <Text>Snapshot testing & Component testing Workshop!</Text>
      </Center>
    </PageLayout>
  )
}

export default Home
