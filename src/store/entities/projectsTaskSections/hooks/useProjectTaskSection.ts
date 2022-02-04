import { useRecoilCallback, useRecoilValue } from 'recoil'
import { projectsTaskSectionState } from '../atom'
import { ProjectTaskSection } from '../type'
import { useProjectsTaskSectionsCommand } from './useProjectsTaskSectionsCommand'

const DEFAULT_TITLE_NAME = 'Untitled Section'
export const useProjectTaskSection = (projectTaskSectionId: string) => {
  const { upsert } = useProjectsTaskSectionsCommand()
  const projectTaskSection = useRecoilValue(
    projectsTaskSectionState(projectTaskSectionId),
  )

  const setProjectTaskSection = useRecoilCallback(
    ({ snapshot }) =>
      async (val: Partial<ProjectTaskSection>) => {
        const current = await snapshot.getPromise(
          projectsTaskSectionState(projectTaskSectionId),
        )
        upsert({ ...current, ...val })
      },
    [projectTaskSectionId, upsert],
  )

  const setProjectTaskSectionName = useRecoilCallback(
    () => async (val: string) => {
      if (projectTaskSection.name === val) return
      const name = val || DEFAULT_TITLE_NAME

      await setProjectTaskSection({ name })
    },
    [setProjectTaskSection, projectTaskSection.name],
  )

  return {
    projectTaskSection,
    setProjectTaskSectionName,
  }
}
