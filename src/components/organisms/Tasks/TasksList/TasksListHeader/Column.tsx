import React, { memo } from 'react'
import { useTasksTaskColumn } from 'src/components/organisms/Tasks/hooks'
import { useTaskColumn } from 'src/store/entities/taskColumns'
import {
  TASK_COLUMN_TYPE_ASSIGNMENT,
  TASK_COLUMN_TYPE_CUSTOM,
  TASK_COLUMN_TYPE_DUE_DATE,
  TASK_COLUMN_TYPE_FIELD_NAME,
  TASK_COLUMN_TYPE_PRIORITY,
  TASK_COLUMN_TYPE_PROJECT,
  TASK_COLUMN_TYPE_TAGS,
} from 'src/store/entities/taskColumns/types'
import {
  Tags,
  TaskName,
  DueDate,
  Projects,
  Assignee,
  Priority,
} from './Columns'

type Props = {
  tasksTaskColumnId: string
}

export const Column: React.FC<Props> = memo<Props>((props) => {
  const { tasksTaskColumnId } = props
  const { tasksTaskColumn } = useTasksTaskColumn(tasksTaskColumnId)
  const { taskColumn } = useTaskColumn(tasksTaskColumn.taskColumnId)

  switch (taskColumn.type) {
    case TASK_COLUMN_TYPE_FIELD_NAME: {
      return <TaskName tasksTaskColumnId={tasksTaskColumnId} />
    }
    case TASK_COLUMN_TYPE_ASSIGNMENT: {
      return <Assignee tasksTaskColumnId={tasksTaskColumnId} />
    }
    case TASK_COLUMN_TYPE_DUE_DATE: {
      return <DueDate tasksTaskColumnId={tasksTaskColumnId} />
    }
    case TASK_COLUMN_TYPE_PROJECT: {
      return <Projects tasksTaskColumnId={tasksTaskColumnId} />
    }
    case TASK_COLUMN_TYPE_TAGS: {
      return <Tags tasksTaskColumnId={tasksTaskColumnId} />
    }
    case TASK_COLUMN_TYPE_PRIORITY: {
      return <Priority tasksTaskColumnId={tasksTaskColumnId} />
    }
    case TASK_COLUMN_TYPE_CUSTOM: {
      return null
    }
  }
})
Column.displayName = 'Column'
