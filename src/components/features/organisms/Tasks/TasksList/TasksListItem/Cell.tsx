import type React from 'react'
import { memo, useMemo } from 'react'
import { useTasksTaskColumn } from 'src/components/features/organisms/Tasks/hooks'
import type { FlexProps } from 'src/components/ui/atoms'
import { useTaskColumn } from 'src/store/entities/taskColumn'
import { TaskColumnType } from 'src/store/entities/taskColumn/type'
import {
  TasksAssignee,
  TasksDueDate,
  TasksName,
  TasksPriority,
  TasksProjects,
  TasksTags,
} from '../TasksListCells'

type Props = FlexProps & {
  taskId: string
  tasksTaskColumnId: string
  isSubtask?: boolean
}

export const Cell: React.FC<Props> = memo<Props>((props) => {
  const { tasksTaskColumn } = useTasksTaskColumn(props.tasksTaskColumnId)
  const { taskColumn } = useTaskColumn(tasksTaskColumn.taskColumnId)

  const width = useMemo(() => {
    return tasksTaskColumn.width
  }, [tasksTaskColumn.width])

  switch (taskColumn.type) {
    case TaskColumnType.TaskName: {
      return (
        <TasksName
          taskId={props.taskId}
          width={width}
          isSubtask={props.isSubtask}
        />
      )
    }
    case TaskColumnType.Assignee: {
      return <TasksAssignee taskId={props.taskId} width={width} />
    }
    case TaskColumnType.DueDate: {
      return <TasksDueDate taskId={props.taskId} width={width} />
    }
    case TaskColumnType.Project: {
      return <TasksProjects taskId={props.taskId} width={width} />
    }
    case TaskColumnType.Tags: {
      return <TasksTags taskId={props.taskId} width={width} />
    }
    case TaskColumnType.Priority: {
      return <TasksPriority taskId={props.taskId} width={width} />
    }
    case TaskColumnType.Custom: {
      return null
    }
  }

  return null
})
Cell.displayName = 'Cell'
