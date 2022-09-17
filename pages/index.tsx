import {Center, List, Text, ListItem } from '@chakra-ui/react'
import type { NextPage } from 'next'
import Link from 'next/link'

const Home: NextPage = () => {
  return (
    <Center>
      <Text>Welcome to</Text>
      <Text>Snapshot testing & Component testing Workshop!</Text>

      <List>
        <ListItem>
          <Link href={'/snapshot-1'}>Snapshot testing 1</Link>
        </ListItem>
      </List>
    </Center>
  )
}

export default Home
