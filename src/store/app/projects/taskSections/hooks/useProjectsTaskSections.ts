import { useRecoilValue } from 'recoil'
import { useMe } from 'src/store/entities/me'
import { taskSectionsState } from '../atom'

export const useProjectsTaskSections = () => {
  const { me } = useMe()
  const taskSections = useRecoilValue(taskSectionsState(me.id))

  return {
    taskSections,
  }
}
