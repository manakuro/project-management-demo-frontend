import { useRecoilCallback } from 'recoil'
import { Me } from '../type'
import { useMeCommand } from './useMeCommand'

export const useMeResponse = () => {
  const { upsert } = useMeCommand()

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
