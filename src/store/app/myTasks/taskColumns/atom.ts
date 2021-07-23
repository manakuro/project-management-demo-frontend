import { useMemo } from 'react'
import { selectorFamily, useRecoilValue } from 'recoil'
import { useMe } from 'src/store/entities/me'
import { taskColumnsByTeammateIdSelector } from 'src/store/entities/taskColumns'

const key = (str: string) => `src/store/app/myTasks/taskColumns/${str}`

export const myTaskTaskColumnIdsSelector = selectorFamily<string[], string>({
  key: key('myTaskTaskColumnIdsSelector'),
  get:
    (teammateId: string) =>
    ({ get }) => {
      const taskColumns = get(taskColumnsByTeammateIdSelector(teammateId))

      return taskColumns.filter((t) => !t.disabled).map((t) => t.id)
    },
})

export const myTaskTaskColumnIdsCustomizableSelector = selectorFamily<
  string[],
  string
>({
  key: key('myTaskTaskColumnIdsCustomizableSelector'),
  get:
    (teammateId: string) =>
    ({ get }) => {
      const taskColumns = get(taskColumnsByTeammateIdSelector(teammateId))

      return taskColumns.filter((t) => t.customizable).map((t) => t.id)
    },
})

export const useMyTasksTaskColumns = () => {
  const { me } = useMe()
  const ids = useRecoilValue(myTaskTaskColumnIdsSelector(me.id))
  const taskColumnIds = useMemo(() => ids, [ids])
  return {
    taskColumnIds,
  }
}
export const useMyTasksTaskColumnsCustomizable = () => {
  const { me } = useMe()
  const ids = useRecoilValue(myTaskTaskColumnIdsCustomizableSelector(me.id))
  const taskColumnIds = useMemo(() => ids, [ids])
  return {
    taskColumnIds,
  }
}
