import { atom, useRecoilValue } from 'recoil'

export const myTaskTaskColumnIdsState = atom<string[]>({
  key: 'myTaskTaskColumnIdsState',
  default: [],
})

export const useMyTasksTaskColumns = () => {
  const taskColumnIds = useRecoilValue(myTaskTaskColumnIdsState)
  return {
    taskColumnIds,
  }
}
