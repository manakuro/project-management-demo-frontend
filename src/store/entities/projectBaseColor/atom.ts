import { createState } from 'src/store/util'
import { ProjectBaseColor } from './type'

const key = (str: string) => `src/store/entities/projectBaseColor/${str}`

export const initialState = (): ProjectBaseColor => ({
  id: '',
  color: {
    id: '',
    name: '',
    color: '',
    createdAt: '',
    updatedAt: '',
  },
  createdAt: '',
  updatedAt: '',
})
export const {
  state: projectBaseColorState,
  listState: projectBaseColorsState,
  idsState: projectBaseColorIdsState,
} = createState({ key, initialState })
