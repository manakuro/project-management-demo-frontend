import { useRecoilCallback } from 'recoil'
import { uuid } from 'src/shared/uuid'
import { projectTaskState, initialProjectsTaskState } from '../atom'
import { ProjectTask } from '../type'

export const useProjectsTasksCommand = () => {
  const upsert = useRecoilCallback(
    ({ set }) =>
      (val: ProjectTask) => {
        set(projectTaskState(val.id), val)
      },
    [],
  )

  const addProjectsTask = useRecoilCallback(
    () => (val?: Partial<ProjectTask>) => {
      const id = uuid()
      upsert({
        ...initialProjectsTaskState(),
        ...val,
        id,
      })
      return id
    },
    [upsert],
  )

  return {
    addProjectsTask,
  }
}
