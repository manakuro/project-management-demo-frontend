import { useMemo } from 'react'
import { useRecoilValue } from 'recoil'
import { taskColumnByTypeState } from '../atom'
import { TaskColumnType } from '../types'

export const useTaskColumnByType = (type: TaskColumnType) => {
  const val = useRecoilValue(taskColumnByTypeState(type))
  const taskColumn = useMemo(() => val, [val])

  return {
    taskColumn,
  }
}
