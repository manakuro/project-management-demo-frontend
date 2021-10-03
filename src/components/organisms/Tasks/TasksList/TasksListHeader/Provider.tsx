import { useMemo } from 'react'
import { useTasksListContentVerticalScroll } from 'src/components/organisms/Tasks'
import { useTasksTaskListStatus } from 'src/components/organisms/Tasks/hooks'
import { ChakraProps } from 'src/shared/chakra'
import { createProvider } from 'src/shared/react/createProvider'

type ContextProps = {
  sortedStyle: ChakraProps
  scrollingStyle: ChakraProps
}

const useValue = (): ContextProps => {
  const { isSorted } = useTasksTaskListStatus()
  const { isScrolling } = useTasksListContentVerticalScroll()

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
  } as const
}
useValue.__PROVIDER__ = 'TasksListHeaderProvider'
export const { Provider, useContext: useTasksListHeaderContext } =
  createProvider(useValue)
