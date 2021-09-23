import { useRecoilCallback } from 'recoil'
import { teammateSelector } from '../atom'
import { Teammate } from '../type'

export const useTeammatesResponse = () => {
  const setTeammates = useRecoilCallback(
    ({ set }) =>
      (teammates: (Teammate & { teammateId: string })[]) => {
        teammates
          .map<Teammate>((t) => ({
            id: t.teammateId,
            name: t.name,
            email: t.email,
            image: t.image,
            createdAt: '',
            updatedAt: '',
          }))
          .forEach((p) => {
            set(teammateSelector(p.id), p)
          })
      },
    [],
  )

  return {
    setTeammates,
  }
}
