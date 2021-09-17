import { selector } from 'recoil'
import { uniq } from 'src/shared/utils'
import { projectTasksState } from 'src/store/entities/projectTasks'

const key = (str: string) => `src/store/app/projects/projects/${str}`

export const projectsProjectIdsSelector = selector<string[]>({
  key: key('projectsProjectIdsSelector'),
  get: ({ get }) => {
    const projectTasks = get(projectTasksState)
    return uniq(projectTasks.map((p) => p.projectId))
  },
})
