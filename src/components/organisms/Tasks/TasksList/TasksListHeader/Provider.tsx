import { useMemo } from 'react'
import { useTasksListContentVerticalScroll } from 'src/components/organisms/Tasks'
import { useTasksTaskListStatus } from 'src/components/organisms/Tasks/hooks'
import { ChakraProps } from 'src/shared/chakra'
import { createProvider } from 'src/shared/react/createProvider'
import { useTaskListStatus } from 'src/store/entities/taskListStatus'

type ContextProps = {
  sortedStyle: ChakraProps
  scrollingStyle: ChakraProps
}

const useValue = (): ContextProps => {
  const { taskListStatus } = useTasksTaskListStatus()
  const { isSortedByProject, isSortedByNone } = useTaskListStatus()
  const { isScrolling } = useTasksListContentVerticalScroll()

  const sortedStyle = useMemo((): ChakraProps => {
    if (
      !isSortedByNone(taskListStatus.taskListSortStatus) &&
      !isSortedByProject(taskListStatus.taskListSortStatus)
    )
      return { borderBottom: 'none' }
    if (isScrolling) return { borderBottom: 'none' }
    return {}
  }, [
    isScrolling,
    isSortedByNone,
    isSortedByProject,
    taskListStatus.taskListSortStatus,
  ])

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
