import { selector } from 'recoil'
import { uniq } from 'src/shared/utils'
import { projectTasksState } from 'src/store/entities/projectTask'

const key = (str: string) => `src/store/app/projects/projects/${str}`

export const projectsProjectIdsState = selector<string[]>({
  key: key('projectsProjectIdsState'),
  get: ({ get }) => {
    const projectTasks = get(projectTasksState)
    return uniq(projectTasks.map((p) => p.projectId))
  },
})
