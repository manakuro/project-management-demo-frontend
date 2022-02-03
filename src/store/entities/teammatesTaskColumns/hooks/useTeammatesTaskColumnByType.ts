import { useRecoilValue } from 'recoil'
import { useMe } from 'src/store/entities/me'
import { TaskColumnTypeValue } from 'src/store/entities/taskColumns'
import { teammatesTaskColumnByTypeState } from '../atom'

export const useTeammatesTaskColumnByType = (type: TaskColumnTypeValue) => {
  const { me } = useMe()
  const teammatesTaskColumn = useRecoilValue(
    teammatesTaskColumnByTypeState({ teammateId: me.id, type }),
  )

  return {
    teammatesTaskColumn,
  }
}
