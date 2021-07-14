import React, { createContext, useContext, useMemo } from 'react'
import { useTasksListContentSticky } from 'src/components/organisms'
import { ChakraProps } from 'src/shared/chakra'

type ContextProps = {
  taskColumnIds: string[]
  stickyStyle: ChakraProps
}

type Props = {
  taskColumnIds: string[]
}
const Context = createContext<ContextProps>({
  taskColumnIds: [],
  stickyStyle: {},
})
export const useTasksListContext = () => useContext(Context)

export const Provider: React.FC<Props> = (props) => {
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

  return (
    <Context.Provider
      value={{
        taskColumnIds,
        stickyStyle,
      }}
    >
      {props.children}
    </Context.Provider>
  )
}
