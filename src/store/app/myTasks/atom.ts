import { useRecoilCallback } from 'recoil'
import { useMe } from 'src/store/entities/me'
import { taskColumnSelector } from 'src/store/entities/taskColumns'
import {
  useTaskSection,
  useTaskSections,
  useTaskSectionsCommand,
} from 'src/store/entities/taskSections'
import { useTasksCommand } from 'src/store/entities/tasks'
import { myTaskTaskStatusState } from './taskListStatus'
import { useMyTasksTaskSectionIds } from './taskSections'
import { useMyTasksTaskIds, useMyTasksTaskIdsByTaskSection } from './tasks'
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

export const useMyTasksResponse = () => {
  const { setTaskSections } = useTaskSections()
  const { setTaskColumns, setTaskStatus } = useSetters()
  const setMyTasks = useRecoilCallback(
    () => (data: MyTaskResponse) => {
      setTaskSections(data.taskSections)
      setTaskColumns(data)
      setTaskStatus(data)
    },
    [setTaskColumns, setTaskSections, setTaskStatus],
  )

  return {
    setMyTasks,
  }
}

export const useMyTasks = () => {
  const { taskSectionIds } = useMyTasksTaskSectionIds()
  const { taskIds } = useMyTasksTaskIds()

  return {
    taskSectionIds,
    taskIds,
  }
}

export const useMyTaskByTaskSectionId = (taskSectionId: string) => {
  const { me } = useMe()
  const { addTask } = useTasksCommand()
  const { setSectionName, taskSection } = useTaskSection(taskSectionId)
  const { taskIds } = useMyTasksTaskIdsByTaskSection(taskSectionId)

  const addMyTask = useRecoilCallback(
    () => () => {
      return addTask({ assigneeId: me.id, taskSectionId })
    },
    [me.id, addTask, taskSectionId],
  )

  return {
    taskSection,
    taskIds,
    addTask: addMyTask,
    setSectionName,
  }
}

const useSetters = () => {
  const setTaskColumns = useRecoilCallback(
    ({ set }) =>
      (data: MyTaskResponse) => {
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
