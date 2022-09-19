import { useState, useEffect } from 'react'
import {Box, Button, Text} from '@chakra-ui/react'

type CounterOption = {
  min?: number
  max?: number
}

const getErrorMessage = (count: number, min: number, max: number) => {
  if (count >= max) return 'Count is max.'
  if (count <= min) return 'Count is min.'
  return ''
}

const useCounter = (initialCount: number = 0, option: CounterOption) => {
  const [count, setCount]  = useState(initialCount)
  const [error, setError] = useState('')

  const [min, max] = [option.min || -Infinity, option.max || Infinity]

  useEffect(() => {

    setError( getErrorMessage(count, min ,max) )
  }, [count, min, max])

  const increase = () => {
    setCount(Math.min(max, count + 1))
    setError(count >= max ? 'Count is max.' : '')
  }
  const decrease = () => {
    setCount(Math.max(min, count - 1))
    setError(count <= min ? 'Count is min.' : '')
  }
  const reset = () => {
    setCount(initialCount)
    setError('')
  }

  return {
    count,
    error,
    increase,
    decrease,
    reset
  }
}

export const Counter = () => {
  const { count, error, ...methods } = useCounter(0, { min: -5, max: 5 })
  return <PureCounter
    count={count}
    error={error}
    onIncrease={methods.increase}
    onDecrease={methods.decrease}
    onReset={methods.reset}
  />
}

type PureCounterProps = Omit<ReturnType<typeof useCounter>, 'increase' | 'decrease' | 'reset'> & {
  onIncrease: VoidFunction
  onDecrease: VoidFunction
  onReset: VoidFunction
}

export const PureCounter = ({ count, error, onIncrease, onDecrease, onReset}: PureCounterProps) => {
  return (
    <Box>
      <Box>
        <Text>Count : {count}</Text>
      </Box>

      <Box>
        <Text>Controllers</Text>
        <Button onClick={onIncrease}>Increase</Button>
        <Button onClick={onDecrease}>Decrease</Button>
        <Button onClick={onReset}>Reset</Button>
      </Box>

      <Box>
        <Text>{error}</Text>
      </Box>
    </Box>
  )
}







