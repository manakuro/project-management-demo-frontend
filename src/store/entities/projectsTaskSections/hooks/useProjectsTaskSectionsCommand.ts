import { useRecoilCallback } from 'recoil'
import { uuid } from 'src/shared/uuid'
import { projectsTaskSectionState, initialState } from '../atom'
import { ProjectTaskSection } from '../type'

export const useProjectsTaskSectionsCommand = () => {
  const upsert = useRecoilCallback(
    ({ set }) =>
      (val: ProjectTaskSection) => {
        set(projectsTaskSectionState(val.id), val)
      },
    [],
  )

  const addProjectsTaskSection = useRecoilCallback(
    () => (val?: Partial<ProjectTaskSection>) => {
      const id = uuid()
      upsert({
        ...initialState(),
        ...val,
        id,
      })

      return id
    },
    [upsert],
  )

  return {
    addProjectsTaskSection,
    upsert,
  }
}
