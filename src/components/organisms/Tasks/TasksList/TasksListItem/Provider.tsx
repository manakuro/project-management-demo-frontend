import React, { createContext, useContext, useEffect, useState } from 'react'
import { useRouter } from 'src/router'

type ContextProps = {
  selected: boolean
}

type Props = {
  taskId: string
}
const Context = createContext<ContextProps>({
  selected: false,
})
export const useTasksListItem = () => useContext(Context)

export const Provider: React.FC<Props> = (props) => {
  const { selected } = useRow(props)

  return (
    <Context.Provider
      value={{
        selected,
      }}
    >
      {props.children}
    </Context.Provider>
  )
}

function useRow(props: Props) {
  const [selected, setSelected] = useState<boolean>(false)
  const { router } = useRouter()

  useEffect(() => {
    if (router.query?.tasks?.[0] === props.taskId) {
      setSelected(true)
      return
    }
    setSelected(false)
  }, [props.taskId, router])

  return {
    selected,
  }
}
