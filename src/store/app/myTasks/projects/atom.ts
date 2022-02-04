import { selector } from 'recoil'
import { uniq } from 'src/shared/utils'
import { projectTasksState } from 'src/store/entities/projectsTask'

export const projectIdsState = selector<string[]>({
  key: 'projectIdsState',
  get: ({ get }) => {
    const projectTasks = get(projectTasksState)
    return uniq(projectTasks.map((p) => p.projectId))
  },
})
