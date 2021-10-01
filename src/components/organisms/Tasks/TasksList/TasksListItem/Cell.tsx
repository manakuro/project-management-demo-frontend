import React, { memo, useMemo } from 'react'
import { FlexProps } from 'src/components/atoms'
import {
  TasksName,
  TasksDueDate,
  TasksProjects,
  TasksTags,
  TasksAssignee,
} from 'src/components/organisms/Tasks/TasksList/TasksListCells'
import { useTasksTaskColumn } from 'src/components/organisms/Tasks/hooks'
import { useTaskColumn } from 'src/store/entities/taskColumns'
import {
  TASK_COLUMN_TYPE_FIELD_NAME,
  TASK_COLUMN_TYPE_ASSIGNMENT,
  TASK_COLUMN_TYPE_TAGS,
  TASK_COLUMN_TYPE_PROJECT,
  TASK_COLUMN_TYPE_DUE_DATE,
  TASK_COLUMN_TYPE_CUSTOM,
  TASK_COLUMN_TYPE_PRIORITY,
} from 'src/store/entities/taskColumns/types'

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
    case TASK_COLUMN_TYPE_FIELD_NAME: {
      return (
        <TasksName
          taskId={props.taskId}
          width={width}
          isSubtask={props.isSubtask}
        />
      )
    }
    case TASK_COLUMN_TYPE_ASSIGNMENT: {
      return <TasksAssignee taskId={props.taskId} width={width} />
    }
    case TASK_COLUMN_TYPE_DUE_DATE: {
      return <TasksDueDate taskId={props.taskId} width={width} />
    }
    case TASK_COLUMN_TYPE_PROJECT: {
      return <TasksProjects taskId={props.taskId} width={width} />
    }
    case TASK_COLUMN_TYPE_TAGS: {
      return <TasksTags taskId={props.taskId} width={width} />
    }
    case TASK_COLUMN_TYPE_PRIORITY: {
      return null
    }
    case TASK_COLUMN_TYPE_CUSTOM: {
      return null
    }
  }
})
Cell.displayName = 'Cell'
