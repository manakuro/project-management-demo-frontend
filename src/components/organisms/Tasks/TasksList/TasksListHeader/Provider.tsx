import React, { createContext, useContext, useMemo } from 'react'
import {
  useTasksContext,
  useTasksListContentScroll,
} from 'src/components/organisms'
import { ChakraProps } from 'src/shared/chakra'

type ContextProps = {
  sortedStyle: ChakraProps
  scrollingStyle: ChakraProps
}

type Props = {}
const Context = createContext<ContextProps>({
  sortedStyle: {},
  scrollingStyle: {},
})
export const useTasksListHeaderContext = () => useContext(Context)

export const Provider: React.FC<Props> = (props) => {
  const { useTaskStatus } = useTasksContext()
  const { isSorted } = useTaskStatus()
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

  return (
    <Context.Provider
      value={{
        sortedStyle,
        scrollingStyle,
      }}
    >
      {props.children}
    </Context.Provider>
  )
}
