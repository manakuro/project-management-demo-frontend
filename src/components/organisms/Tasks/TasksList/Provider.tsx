import React, { createContext, useCallback, useContext, useState } from 'react'

type ContextProps = {
  taskColumnIds: string[]
  addedTaskSectionId: string
  setAddedTaskSectionId: React.Dispatch<React.SetStateAction<string>>
  resetAddedTaskSectionId: () => void
}

type Props = {
  taskColumnIds: string[]
}
const Context = createContext<ContextProps>({
  taskColumnIds: [],
  addedTaskSectionId: '',
  setAddedTaskSectionId: () => {},
  resetAddedTaskSectionId: () => {},
})
export const useTasksList = () => useContext(Context)

export const Provider: React.FC<Props> = (props) => {
  const { taskColumnIds } = props
  const [addedTaskSectionId, setAddedTaskSectionId] = useState('')

  const resetAddedTaskSectionId = useCallback(() => {
    setAddedTaskSectionId('')
  }, [])

  return (
    <Context.Provider
      value={{
        taskColumnIds,
        addedTaskSectionId,
        setAddedTaskSectionId,
        resetAddedTaskSectionId,
      }}
    >
      {props.children}
    </Context.Provider>
  )
}
