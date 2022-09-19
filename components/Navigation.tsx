import {Heading, Box, Link, List, ListItem} from '@chakra-ui/react'
import NextLink from 'next/link'

export const Navigation = () => {
  return (
    <Box p={4} borderRadius={2} bg={'gray.100'} m={4}>
      <Heading size={'md'}>Links</Heading>
      <List>
        <ListItem>
          <NextLink href='/' passHref>
            <Link>Home</Link>
          </NextLink>
        </ListItem>

        <ListItem>
          <NextLink href='/samples/counter-example' passHref>
            <Link>Counter</Link>
          </NextLink>
        </ListItem>

        <ListItem>
          <NextLink href='/samples/todolist-example' passHref>
            <Link>TodoList</Link>
          </NextLink>
        </ListItem>
      </List>
    </Box>
    )
}