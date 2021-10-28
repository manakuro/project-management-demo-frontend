import { atom } from 'recoil'

const key = (str: string) => `src/store/entities/favoriteWorkspaceIds/${str}`

export const favoriteWorkspaceIdsState = atom<string[]>({
  key: key('favoriteWorkspaceIdsState'),
  default: [],
})
