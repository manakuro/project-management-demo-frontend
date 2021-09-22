import { selector } from 'recoil'
import { uniq } from 'src/shared/utils'
import { projectTasksState } from 'src/store/entities/projectsTasks'

export const myTasksProjectIdsSelector = selector<string[]>({
  key: 'myTasksProjectIdsSelector',
  get: ({ get }) => {
    const projectTasks = get(projectTasksState)
    return uniq(projectTasks.map((p) => p.projectId))
  },
})
