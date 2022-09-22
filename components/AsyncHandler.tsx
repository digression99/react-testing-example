import { useState } from 'react'
import { Box, Button, Text} from '@chakra-ui/react'

export const AsyncHandler = () => {
  const [isShown, setIsShown] = useState(false)

  const onClick = () => {
    if (isShown) return setIsShown(false)
    setTimeout(() => {
      setIsShown(true)
    }, 500)
  }

  return (
    <Box>
      <Button onClick={onClick}>
        Show the text after 1 seconds
      </Button>
      {isShown && (
        <Text>Text appeared!</Text>
      )}
    </Box>
  )
}
