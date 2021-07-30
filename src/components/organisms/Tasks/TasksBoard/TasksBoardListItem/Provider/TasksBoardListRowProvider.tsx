import { useEffect, useState } from 'react'
import { ROUTE_MY_TASKS, useRouter } from 'src/router'
import { createProvider } from 'src/shared/react/createProvider'

type ContextProps = {
  selected: boolean
}

type Props = {
  taskId: string
}

const useValue = (props: Props): ContextProps => {
  const [selected, setSelected] = useState<boolean>(false)
  const { router } = useRouter()

  useEffect(() => {
    if (router.query[ROUTE_MY_TASKS['name']]?.[0] === props.taskId) {
      setSelected(true)
      return
    }
    setSelected(false)
  }, [props.taskId, router])

  return {
    selected,
  }
}
useValue.__PROVIDER__ =
  'src/components/organisms/Tasks/TasksBoard/TasksBoardListItem/Provider/TasksListRowProvider.tsx'
export const { Provider, useContext: useTasksBoardListItemContext } =
  createProvider(useValue)
