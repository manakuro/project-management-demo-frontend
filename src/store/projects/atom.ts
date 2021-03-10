import {
  atomFamily,
  selectorFamily,
  useRecoilCallback,
  DefaultValue,
  atom,
  selector,
  useRecoilValue,
} from 'recoil'
import { Project } from './type'
import { COLORS } from 'src/hooks/useColorPicker'

export const projectIdsState = atom<string[]>({
  key: 'projectIdsState',
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
  },
})

export const projectsSelector = selector<Project[]>({
  key: 'projectsSelector',
  get: ({ get }) => {
    const projectIds = get(projectIdsState)
    return projectIds.map((id) => get(projectState(id)))
  },
})

export const useProjects = () => {
  const projects = useRecoilValue(projectsSelector)

  const setProjects = useRecoilCallback(
    ({ set }) => (projects: Project[]) => {
      projects.forEach((p) => {
        set(projectSelector(p.id), p)
      })
    },
    [],
  )

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
    projects,
    setProjects,
    setColor,
  }
}
