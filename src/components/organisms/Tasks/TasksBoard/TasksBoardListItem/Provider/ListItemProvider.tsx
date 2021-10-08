import React, { useCallback, useEffect, useState } from 'react'
import { useTasksTaskListStatus } from 'src/components/organisms/Tasks/hooks'
import { useHover } from 'src/hooks/useHover'
import { ROUTE_MY_TASKS, useRouter } from 'src/router'
import { createProvider } from 'src/shared/react/createProvider'
import { useTaskListStatus } from 'src/store/entities/taskListStatus'
import { useTask } from 'src/store/entities/tasks'

type ContextProps = {
  selected: boolean
  isHovering: boolean
  ref: React.MutableRefObject<HTMLElement | null>
  isOpening: boolean
  onOpening: () => void
  onClosing: () => void
  onToggleDone: () => Promise<void>
}

type Props = {
  taskId: string
}

const useValue = (props: Props): ContextProps => {
  const [selected, setSelected] = useState<boolean>(false)
  const { router } = useRouter()
  const { ref, isHovering } = useHover()
  const [isOpening, setIsOpening] = useState(true)
  const { task, setTask } = useTask(props.taskId)
  const { taskListStatus } = useTasksTaskListStatus()
  const { isTaskListInComplete, isTaskListCompletedAll } = useTaskListStatus()

  const onOpening = useCallback(() => {
    setIsOpening(true)
  }, [])

  const onClosing = useCallback(() => {
    setIsOpening(false)
  }, [])

  useEffect(() => {
    if (router.query[ROUTE_MY_TASKS.query]?.[0] === props.taskId) {
      setSelected(true)
      return
    }
    setSelected(false)
  }, [props.taskId, router])

  const onToggleDone = useCallback(async () => {
    // When incomplete tasks are listed and the user is trying to complete it
    if (isTaskListInComplete(taskListStatus.taskListCompletedStatus)) {
      if (!task.isDone) {
        onClosing()
        setTimeout(async () => {
          await setTask({ isDone: !task.isDone })
        }, 3000)
        return
      }
    }

    // When completed tasks are listed and the user is trying to make it as uncompleted
    if (
      !isTaskListInComplete(taskListStatus.taskListCompletedStatus) &&
      !isTaskListCompletedAll(taskListStatus.taskListCompletedStatus)
    ) {
      if (task.isDone) {
        onClosing()
        setTimeout(async () => {
          await setTask({ isDone: !task.isDone })
        }, 3000)
        return
      }
    }

    await setTask({ isDone: !task.isDone })
  }, [
    isTaskListCompletedAll,
    isTaskListInComplete,
    onClosing,
    setTask,
    task.isDone,
    taskListStatus.taskListCompletedStatus,
  ])

  return {
    selected,
    isHovering,
    ref,
    isOpening,
    onOpening,
    onClosing,
    onToggleDone,
  }
}
useValue.__PROVIDER__ =
  'src/components/organisms/Tasks/TasksBoard/TasksBoardListItem/Provider/ListItemProvider.tsx'
export const { Provider, useContext: useTasksBoardListItemContext } =
  createProvider(useValue)
