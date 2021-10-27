import { atom } from 'recoil'
import { Workspace } from './type'

const key = (str: string) => `src/store/entities/workspace/${str}`

export const workspaceState = atom<Workspace>({
  key: key('workspaceState'),
  default: {
    id: '',
    name: '',
    description: '',
    createdBy: '',
    createdAt: '',
    updatedAt: '',
  },
})
