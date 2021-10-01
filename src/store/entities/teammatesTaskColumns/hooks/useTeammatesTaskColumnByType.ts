import { useRecoilValue } from 'recoil'
import { useMe } from 'src/store/entities/me'
import { TaskColumnType } from 'src/store/entities/taskColumns/types'
import { teammatesTaskColumnByTypeState } from '../atom'

export const useTeammatesTaskColumnByType = (type: TaskColumnType) => {
  const { me } = useMe()
  const teammatesTaskColumn = useRecoilValue(
    teammatesTaskColumnByTypeState({ teammateId: me.id, type }),
  )

  return {
    teammatesTaskColumn,
  }
}
