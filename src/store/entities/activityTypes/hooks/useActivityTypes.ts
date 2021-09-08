import { useCallback } from 'react'
import {
  ActivityTypes,
  ACTIVITY_TYPE_TASK,
  ACTIVITY_TYPE_WORKSPACE,
} from '../types'

export const useActivityTypes = () => {
  const isTaskType = useCallback(
    (type: ActivityTypes) => type === ACTIVITY_TYPE_TASK,
    [],
  )

  const isWorkspaceType = useCallback(
    (type: ActivityTypes) => type === ACTIVITY_TYPE_WORKSPACE,
    [],
  )

  return {
    isTaskType,
    isWorkspaceType,
  }
}
