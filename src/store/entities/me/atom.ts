import { atom, useRecoilState } from 'recoil'
import { Me } from './type'

export const meState = atom<Me>({
  key: 'meState',
  default: {
    id: '',
    name: '',
    image: '',
    email: '',
  },
})

export const useMe = () => {
  const [me, setMe] = useRecoilState(meState)

  return {
    me,
    setMe,
  }
}
