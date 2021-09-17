import { useRecoilValue } from 'recoil'
import { useMe } from 'src/store/entities/me'
import { taskSectionsSelector } from '../atom'

export const useProjectsTaskSections = () => {
  const { me } = useMe()
  const taskSections = useRecoilValue(taskSectionsSelector(me.id))

  return {
    taskSections,
  }
}
