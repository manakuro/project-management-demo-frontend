import React, { memo, useMemo } from 'react'
import { FlexProps } from 'src/components/atoms'
import { useTasksTaskColumn } from 'src/components/organisms/Tasks/hooks'
import { useTaskColumn } from 'src/store/entities/taskColumns'
import { TaskColumnType } from 'src/store/entities/taskColumns/type'
import {
  TasksName,
  TasksDueDate,
  TasksProjects,
  TasksTags,
  TasksAssignee,
  TasksPriority,
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
