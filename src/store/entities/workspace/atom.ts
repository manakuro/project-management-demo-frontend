import { atom } from 'recoil'
import { Workspace } from './type'

const key = (str: string) => `src/store/entities/workspace/${str}`

export const workspaceStateDefault = (): Workspace => ({
  id: '',
  name: '',
  description: {
    type: '',
    content: [],
  },
  createdBy: '',
  createdAt: '',
  updatedAt: '',
})

export const workspaceState = atom<Workspace>({
  key: key('workspaceState'),
  default: workspaceStateDefault(),
})
