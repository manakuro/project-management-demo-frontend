import { useRecoilCallback } from 'recoil'
import { projectIconState } from '../atom'
import { ProjectIcon } from '../type'

export const useProjectIconsResponse = () => {
  const setProjectIcons = useRecoilCallback(
    ({ set }) =>
      (data: ProjectIcon[]) => {
        data.forEach((p) => {
          set(projectIconState(p.id), p)
        })
      },
    [],
  )

  return {
    setProjectIcons,
  }
}
