import { useRecoilCallback } from 'recoil'
import { projectIconState } from '../atom'
import { ProjectIcon } from '../type'

export const useProjectIconsCommand = () => {
  const upsert = useRecoilCallback(
    ({ set }) =>
      (projectIcon: ProjectIcon) => {
        set(projectIconState(projectIcon.id), projectIcon)
      },
    [],
  )

  return {
    upsert,
  }
}
