import { useMemo } from 'react'
import { useTasksListContentSticky } from 'src/components/organisms/Tasks'
import { ChakraProps } from 'src/shared/chakra'
import { createProvider } from 'src/shared/react/createProvider'

type ContextProps = {
  stickyStyle: ChakraProps
}

const useValue = (): ContextProps => {
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
  return {
    stickyStyle,
  } as const
}
useValue.__PROVIDER__ = 'src/components/organisms/Tasks/TasksList/Provider.tsx'
export const { Provider, useContext: useTasksListContext } =
  createProvider(useValue)
