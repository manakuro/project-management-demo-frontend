import React, { createContext, useContext, useMemo } from 'react'
import { useTasksContext, useTasksListContent } from 'src/components/organisms'
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
  const { isSorted } = useTasksContext()
  const { isScrolling } = useTasksListContent()

  const sortedStyle = useMemo((): ChakraProps => {
    if (!isSorted('none')) return { borderBottom: 'none' }
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
