import { atom } from 'recoil'
import { Me } from './type'

const key = (str: string) => `src/store/entities/me/${str}`

export const initialMeState = (): Me => ({
  id: '',
  name: '',
  image: '',
  email: '',
  createdAt: '',
  updatedAt: '',
})

export const meState = atom<Me>({
  key: key('meState'),
  default: initialMeState(),
})
