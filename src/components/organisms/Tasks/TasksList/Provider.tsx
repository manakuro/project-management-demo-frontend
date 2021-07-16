import { useMemo } from 'react'
import { useTasksListContentSticky } from 'src/components/organisms'
import { ChakraProps } from 'src/shared/chakra'
import { createProvider } from 'src/shared/react/createProvider'

type ContextProps = {
  taskColumnIds: string[]
  stickyStyle: ChakraProps
}

type Props = {
  taskColumnIds: string[]
}

const useValue = (props: Props): ContextProps => {
  const { isStickyVertical } = useTasksListContentSticky()
  const stickyStyle = useMemo((): ChakraProps => {
    if (isStickyVertical)
      return {
        position: 'sticky',
        left: 0,
        zIndex: 100,
        bg: 'white',
      }

    return {}
  }, [isStickyVertical])
  const { taskColumnIds } = props

  console.log('useTasksListContext: ', stickyStyle)

  return {
    taskColumnIds,
    stickyStyle,
  } as const
}
export const { Provider, useContext: useTasksListContext } =
  createProvider(useValue)
