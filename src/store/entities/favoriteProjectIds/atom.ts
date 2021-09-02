import { atom } from 'recoil'

const key = (str: string) => `src/store/entities/favoriteProjectIds/${str}`

export const favoriteProjectIdsState = atom<string[]>({
  key: key('favoriteProjectIdsState'),
  default: [],
})
