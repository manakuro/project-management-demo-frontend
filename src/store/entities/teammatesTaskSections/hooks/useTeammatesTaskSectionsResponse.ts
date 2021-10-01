import { useRecoilCallback } from 'recoil'
import { useTaskSectionsResponse } from 'src/store/entities/taskSections'
import { teammatesTaskSectionState } from '../atom'
import { TeammatesTaskSectionResponse } from '../type'

export const useTeammatesTaskSectionsResponse = () => {
  const { setTaskSections } = useTaskSectionsResponse()

  const setTeammatesTaskSections = useRecoilCallback(
    ({ set }) =>
      (data: TeammatesTaskSectionResponse[]) => {
        data.forEach((d) => {
          set(teammatesTaskSectionState(d.id), d)
          setTaskSections([d.taskSection])
        })
      },
    [setTaskSections],
  )

  return {
    setTeammatesTaskSections,
  }
}
