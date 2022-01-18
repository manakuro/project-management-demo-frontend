import { atom } from 'recoil'
import { Workspace } from './type'

const key = (str: string) => `src/store/entities/workspace/${str}`

export const workspaceStateDefault = (): Workspace => ({
  id: '',
  name: '',
  description: {
    type: 'doc',
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
