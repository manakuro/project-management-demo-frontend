import { useRecoilCallback } from 'recoil'
import {
  useMyTasksTaskIds,
  useMyTasksTaskIdsByTaskSection,
} from 'src/store/app/myTasks/tasks'
import { useMe } from 'src/store/entities/me'
import { taskColumnSelector } from 'src/store/entities/taskColumns'
import {
  useTaskSection,
  useTaskSections,
  useTaskSectionsCommand,
} from 'src/store/entities/taskSections'
import { myTaskTaskColumnIdsState } from './taskColumns'
import { myTaskTaskStatusState } from './taskListStatus'
import { useMyTasksTaskSectionIds } from './taskSections'
import { MyTaskResponse } from './type'

export const useMyTaskCommands = () => {
  const { me } = useMe()
  const { addTaskSection } = useTaskSectionsCommand()

  const addMyTaskSection = useRecoilCallback(
    () => () => {
      return addTaskSection({ teammateId: me.id })
    },
    [me.id, addTaskSection],
  )

  return {
    addMyTaskSection,
  }
}

export const useMyTasks = () => {
  const { setTaskSections } = useTaskSections()
  const { setTaskColumns, setTaskStatus } = useSetters()
  const { taskSectionIds } = useMyTasksTaskSectionIds()
  const { taskIds } = useMyTasksTaskIds()

  const setMyTasks = useRecoilCallback(
    () => (data: MyTaskResponse) => {
      setTaskSections(data.taskSections)
      setTaskColumns(data)
      setTaskStatus(data)
    },
    [setTaskColumns, setTaskSections, setTaskStatus],
  )

  return {
    taskSectionIds,
    setMyTasks,
    taskIds,
  }
}

export const useMyTask = (taskSectionId: string) => {
  const { me } = useMe()
  const { setSectionName, addTask, taskSection } = useTaskSection(taskSectionId)
  const { taskIds } = useMyTasksTaskIdsByTaskSection(taskSectionId)

  const addMyTask = useRecoilCallback(
    () => async () => {
      return await addTask({ assigneeId: me.id })
    },
    [me.id, addTask],
  )

  return {
    taskSection,
    taskIds,
    addTask: addMyTask,
    setSectionName,
  }
}

function useSetters() {
  const setTaskColumns = useRecoilCallback(
    ({ set }) =>
      (data: MyTaskResponse) => {
        set(
          myTaskTaskColumnIdsState,
          data.taskColumns.map((t) => t.id),
        )
        data.taskColumns.forEach((t) => {
          set(taskColumnSelector(t.id), t)
        })
      },
    [],
  )

  const setTaskStatus = useRecoilCallback(
    ({ set }) =>
      (data: MyTaskResponse) => {
        set(myTaskTaskStatusState, data.taskStatus)
      },
    [],
  )

  return {
    setTaskColumns,
    setTaskStatus,
  }
}
