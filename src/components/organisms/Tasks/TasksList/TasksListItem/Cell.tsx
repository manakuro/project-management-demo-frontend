import React, { memo, useMemo } from 'react'
import { FlexProps } from 'src/components/atoms'
import {
  TasksName,
  TasksDueDate,
  TasksProjects,
  TasksTags,
} from 'src/components/organisms/Tasks/TasksList/TasksListCells'
import { useTaskColumn } from 'src/store/entities/taskColumns'
import {
  TASK_COLUMN_TYPE_FIELD_NAME,
  TASK_COLUMN_TYPE_ASSIGNMENT,
  TASK_COLUMN_TYPE_TAGS,
  TASK_COLUMN_TYPE_PROJECT,
  TASK_COLUMN_TYPE_DUE_DATE,
  TASK_COLUMN_TYPE_CUSTOM,
} from 'src/store/entities/taskColumns/types'

type Props = FlexProps & {
  taskId: string
  taskColumnId: string
  isSubtask?: boolean
}

export const Cell: React.FC<Props> = memo<Props>((props) => {
  const { taskColumn } = useTaskColumn(props.taskColumnId)

  const width = useMemo(() => {
    return taskColumn.width
  }, [taskColumn.width])

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
      return null
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
    case TASK_COLUMN_TYPE_CUSTOM: {
      return null
    }
  }
})
Cell.displayName = 'Cell'
