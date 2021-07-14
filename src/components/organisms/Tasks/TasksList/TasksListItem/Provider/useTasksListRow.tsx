import React, { createContext, useContext, useEffect, useState } from 'react'
import { ROUTE_MY_TASKS, useRouter } from 'src/router'

type ContextProps = {
  selected: boolean
}

type Props = {
  taskId: string
}
const Context = createContext<ContextProps>({
  selected: false,
})
export const useTasksListItemRowContext = () => useContext(Context)

export const Provider: React.FC<Props> = (props) => {
  const [selected, setSelected] = useState<boolean>(false)
  const { router } = useRouter()

  useEffect(() => {
    if (router.query[ROUTE_MY_TASKS['name']]?.[0] === props.taskId) {
      setSelected(true)
      return
    }
    setSelected(false)
  }, [props.taskId, router])

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
