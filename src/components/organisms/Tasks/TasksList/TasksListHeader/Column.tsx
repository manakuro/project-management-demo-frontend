import React, { memo } from 'react'
import { useTaskColumn } from 'src/store/entities/taskColumns'
import {
  TASK_COLUMN_TYPE_ASSIGNMENT,
  TASK_COLUMN_TYPE_CUSTOM,
  TASK_COLUMN_TYPE_DUE_DATE,
  TASK_COLUMN_TYPE_FIELD_NAME,
  TASK_COLUMN_TYPE_PROJECT,
  TASK_COLUMN_TYPE_TAGS,
} from 'src/store/entities/taskColumns/types'
import { Tags, TaskName, DueDate, Projects } from './Columns'

type Props = {
  taskColumnId: string
}

export const Column: React.FC<Props> = memo<Props>((props) => {
  const { taskColumnId } = props
  const { taskColumn } = useTaskColumn(taskColumnId)

  switch (taskColumn.type) {
    case TASK_COLUMN_TYPE_FIELD_NAME: {
      return <TaskName taskColumnId={props.taskColumnId} />
    }
    case TASK_COLUMN_TYPE_ASSIGNMENT: {
      return null
    }
    case TASK_COLUMN_TYPE_DUE_DATE: {
      return <DueDate taskColumnId={props.taskColumnId} />
    }
    case TASK_COLUMN_TYPE_PROJECT: {
      return <Projects taskColumnId={props.taskColumnId} />
    }
    case TASK_COLUMN_TYPE_TAGS: {
      return <Tags taskColumnId={props.taskColumnId} />
    }
    case TASK_COLUMN_TYPE_CUSTOM: {
      return null
    }
  }
})
Column.displayName = 'Column'
