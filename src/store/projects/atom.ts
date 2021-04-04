import {
  atomFamily,
  selectorFamily,
  useRecoilCallback,
  DefaultValue,
  atom,
  useRecoilValue,
} from 'recoil'
import { Project } from './type'
import { COLORS } from 'src/hooks/useColorPicker'

export const projectIdsState = atom<string[]>({
  key: 'projectIdsState',
  default: [],
})
export const projectsState = atom<Project[]>({
  key: 'projectsState',
  default: [],
})

const projectState = atomFamily<Project, string>({
  key: 'projectState',
  default: {
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
    teammates: [],
  },
})

export const projectSelector = selectorFamily<Project, string>({
  key: 'projectSelector',
  get: (projectId) => ({ get }) => get(projectState(projectId)),
  set: (projectId) => ({ get, set, reset }, newVal) => {
    if (newVal instanceof DefaultValue) {
      reset(projectState(projectId))
      return
    }

    set(projectState(projectId), newVal)

    if (get(projectIdsState).find((projectId) => projectId === newVal.id))
      return
    set(projectIdsState, (prev) => [...prev, newVal.id])
    set(projectsState, (prev) => [...prev, newVal])
  },
})

export const useProjects = () => {
  const projectIds = useRecoilValue(projectIdsState)
  const projects = useRecoilValue(projectsState)

  const setProjects = useRecoilCallback(
    ({ set }) => (projects: Project[]) => {
      projects.forEach((p) => {
        set(projectSelector(p.id), p)
      })
    },
    [],
  )

  return {
    projectIds,
    projects,
    setProjects,
  }
}

export const useProject = (projectId: string) => {
  const project = useRecoilValue(projectSelector(projectId))

  const upsertProject = useRecoilCallback(
    ({ set }) => (project: Project) => {
      set(projectSelector(project.id), project)
    },
    [],
  )

  const setColor = useRecoilCallback(
    ({ snapshot }) => async (projectId: string, colorId: string) => {
      const color = COLORS.find((c) => c.id === colorId)!
      const project = await snapshot.getPromise(projectSelector(projectId))

      upsertProject({
        ...project,
        color: { id: color.id, name: color.name, color: color.base },
      })
    },
    [],
  )

  return {
    project,
    setColor,
  }
}
