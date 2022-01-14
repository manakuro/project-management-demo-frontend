import { createState } from '../../util'
import { Project } from './type'

const key = (str: string) => `src/store/entities/projects/${str}`

const initialState = (): Project => ({
  id: '',
  name: '',
  projectBaseColorId: '',
  projectLightColorId: '',
  projectIconId: '',
  teammateIds: [],
  description: {
    type: '',
    content: [],
  },
  descriptionTitle: '',
  dueDate: '',
  createdBy: '',
  createdAt: '',
  updatedAt: '',
})

export const {
  state: projectState,
  listState: projectsState,
  idsState: projectIdsState,
} = createState({ key, initialState })
