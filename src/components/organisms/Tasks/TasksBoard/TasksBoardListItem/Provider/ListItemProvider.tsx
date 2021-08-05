import React, { useCallback, useEffect, useState } from 'react'
import { useHover } from 'src/hooks/useHover'
import { ROUTE_MY_TASKS, useRouter } from 'src/router'
import { createProvider } from 'src/shared/react/createProvider'

type ContextProps = {
  selected: boolean
  isHovering: boolean
  ref: React.MutableRefObject<HTMLElement | null>
  isTransitioning: boolean
  onStartTransition: () => void
  onEndTransition: () => void
}

type Props = {
  taskId: string
}

const useValue = (props: Props): ContextProps => {
  const [selected, setSelected] = useState<boolean>(false)
  const { router } = useRouter()
  const { ref, isHovering } = useHover()
  const [isTransitioning, setIsTransitioning] = useState(false)

  const onStartTransition = useCallback(() => {
    setIsTransitioning(true)
  }, [])

  const onEndTransition = useCallback(() => {
    setIsTransitioning(false)
  }, [])

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
    isTransitioning,
    onStartTransition,
    onEndTransition,
  }
}
useValue.__PROVIDER__ =
  'src/components/organisms/Tasks/TasksBoard/TasksBoardListItem/Provider/ListItemProvider.tsx'
export const { Provider, useContext: useTasksBoardListItemContext } =
  createProvider(useValue)
