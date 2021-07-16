import { useMemo } from 'react'
import {
  useTasksListContentScroll,
  useTaskStatusContext,
} from 'src/components/organisms'
import { ChakraProps } from 'src/shared/chakra'
import { createProvider } from 'src/shared/react/createProvider'

const useValue = () => {
  const { isSorted } = useTaskStatusContext()
  const { isScrolling } = useTasksListContentScroll()

  const sortedStyle = useMemo((): ChakraProps => {
    if (!isSorted('none') && !isSorted('project'))
      return { borderBottom: 'none' }
    if (isScrolling) return { borderBottom: 'none' }
    return {}
  }, [isSorted, isScrolling])

  const scrollingStyle = useMemo((): ChakraProps => {
    if (isScrolling) return { shadow: 'sm' }
    return {}
  }, [isScrolling])

  return {
    sortedStyle,
    scrollingStyle,
  }
}

export const { Provider, useContext: useTasksListHeaderContext } =
  createProvider(useValue)
