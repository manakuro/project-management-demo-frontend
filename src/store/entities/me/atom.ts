import { atom, useRecoilState } from 'recoil'
import { Me } from './type'

const key = (str: string) => `src/store/entities/me/${str}`

export const meState = atom<Me>({
  key: key('meState'),
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
