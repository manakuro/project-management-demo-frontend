import { useMyTasksTaskSections } from 'src/store/app/myTasks/taskSections'
import { useProjectsTaskSections } from 'src/store/app/projects/taskSections'
import { TaskSection } from 'src/store/entities/taskSections'
import { useTasksContext } from '../TasksProvider'

type Result = {
  taskSections: TaskSection[]
}

export const useTasksTaskSections = (): Result => {
  const { isMyTasksPage } = useTasksContext()

  const useMyTasksTaskSectionsResult = useMyTasksTaskSections()
  const useProjectsTaskSectionsResult = useProjectsTaskSections()

  if (isMyTasksPage) {
    return {
      taskSections: useMyTasksTaskSectionsResult.taskSections,
    }
  }

  return {
    taskSections: useProjectsTaskSectionsResult.taskSections,
  }
}
