import { useMemo } from 'react'
import { useRecoilValue } from 'recoil'
import { useMe } from 'src/store/entities/me'
import { projectsTaskSectionIdsSelector } from '../atom'

export const useProjectsTaskSectionIds = () => {
  const { me } = useMe()
  const ids = useRecoilValue(projectsTaskSectionIdsSelector(me.id))
  const taskSectionIds = useMemo(() => ids, [ids])

  return {
    taskSectionIds,
  }
}
