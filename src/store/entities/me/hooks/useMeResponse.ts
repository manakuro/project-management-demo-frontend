import { useRecoilCallback } from 'recoil'
import { Me } from '../type'
import { useUpsert } from './useUpsert'

export const useMeResponse = () => {
  const { upsert } = useUpsert()

  const setMe = useRecoilCallback(
    () => (me: Me) => {
      upsert(me)
    },
    [upsert],
  )

  return {
    setMe,
  }
}
