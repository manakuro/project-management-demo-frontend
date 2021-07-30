import React, { useEffect, useState } from 'react'
import { useHover } from 'src/hooks/useHover'
import { ROUTE_MY_TASKS, useRouter } from 'src/router'
import { createProvider } from 'src/shared/react/createProvider'

type ContextProps = {
  selected: boolean
  isHovering: boolean
  ref: React.MutableRefObject<HTMLElement | null>
}

type Props = {
  taskId: string
}

const useValue = (props: Props): ContextProps => {
  const [selected, setSelected] = useState<boolean>(false)
  const { router } = useRouter()
  const { ref, isHovering } = useHover()

  useEffect(() => {
    if (router.query[ROUTE_MY_TASKS['name']]?.[0] === props.taskId) {
      setSelected(true)
      return
    }
    setSelected(false)
  }, [props.taskId, router])

  return {
    selected,
    isHovering,
    ref,
  }
}
useValue.__PROVIDER__ =
  'src/components/organisms/Tasks/TasksBoard/TasksBoardListItem/Provider/TasksListRowProvider.tsx'
export const { Provider, useContext: useTasksBoardListItemContext } =
  createProvider(useValue)
