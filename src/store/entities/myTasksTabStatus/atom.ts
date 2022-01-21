import { atom, selectorFamily } from 'recoil'
import {
  MyTasksTabStatus,
  MyTasksTabStatusCode,
  MyTasksTabStatusCodeKey,
} from './type'

const key = (str: string) => `src/store/entities/myTasksTabStatus/${str}`

export const tabStatusState = atom<MyTasksTabStatus>({
  key: key('tabStatusState'),
  default: {
    id: '',
    teammateId: '',
    workspaceId: '',
    status: MyTasksTabStatusCode.List,
    createdAt: '',
    updatedAt: '',
  },
})

export const isTabStatusState = selectorFamily<
  boolean,
  MyTasksTabStatusCodeKey
>({
  key: key('isTabStatusState'),
  get:
    (key) =>
    ({ get }) => {
      const taskStatus = get(tabStatusState)
      return MyTasksTabStatusCode[key] === taskStatus.status
    },
})
