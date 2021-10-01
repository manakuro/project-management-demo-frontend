import { createState } from '../../util'
import { Project } from './type'

const key = (str: string) => `src/store/entities/projects/${str}`

const initialState = (): Project => ({
  id: '',
  name: '',
  color: {
    id: '',
    name: '',
    color: '',
  },
  icon: {
    id: '',
  },
  dueDate: '',
})

export const {
  state: projectState,
  listState: projectsState,
  idsState: projectIdsState,
} = createState({
  key: key('projects'),
  initialState,
})
