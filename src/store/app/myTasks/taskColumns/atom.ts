import { atom, useRecoilValue } from 'recoil'

const key = (str: string) => `src/store/app/myTasks/taskColumns/${str}`

export const myTaskTaskColumnIdsState = atom<string[]>({
  key: key('myTaskTaskColumnIdsState'),
  default: [],
})

export const useMyTasksTaskColumns = () => {
  const taskColumnIds = useRecoilValue(myTaskTaskColumnIdsState)
  return {
    taskColumnIds,
  }
}
