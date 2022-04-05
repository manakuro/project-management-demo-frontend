import { atom, selectorFamily } from 'recoil'
import {
  TeammateTaskTabStatus,
  TeammateTaskTabStatusCode,
  TeammateTaskTabStatusCodeKey,
} from './type'

const key = (str: string) => `src/store/entities/teammateTaskTabStatus/${str}`

export const initialState = (): TeammateTaskTabStatus => ({
  id: '',
  teammateId: '',
  workspaceId: '',
  statusCode: TeammateTaskTabStatusCode.List,
  createdAt: '',
  updatedAt: '',
})

export const tabStatusState = atom<TeammateTaskTabStatus>({
  key: key('tabStatusState'),
  default: initialState(),
})

export const isTabStatusState = selectorFamily<
  boolean,
  TeammateTaskTabStatusCodeKey
>({
  key: key('isTabStatusState'),
  get:
    (key) =>
    ({ get }) => {
      const taskStatus = get(tabStatusState)
      return TeammateTaskTabStatusCode[key] === taskStatus.statusCode
    },
})
