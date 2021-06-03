import {
  atomFamily,
  selectorFamily,
  useRecoilCallback,
  DefaultValue,
  atom,
  useRecoilValue,
} from 'recoil'
import { Project, ProjectResponse } from './type'
import { COLORS } from 'src/hooks/useColorPicker'
import { uniqBy } from 'src/shared/utils'
import { teammateSelector } from 'src/store/entities/teammates'

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
    teammateIds: [],
  },
})

export const projectSelector = selectorFamily<Project, string>({
  key: 'projectSelector',
  get:
    (projectId) =>
    ({ get }) =>
      get(projectState(projectId)),
  set:
    (projectId) =>
    ({ get, set, reset }, newVal) => {
      if (newVal instanceof DefaultValue) {
        reset(projectState(projectId))
        return
      }

      set(projectState(projectId), newVal)
      set(projectsState, (prev) =>
        uniqBy([...prev, newVal], 'id').map((p) => {
          if (p.id === newVal.id) {
            return {
              ...p,
              ...newVal,
            }
          }
          return p
        }),
      )

      if (get(projectIdsState).find((projectId) => projectId === newVal.id))
        return
      set(projectIdsState, (prev) => [...prev, newVal.id])
    },
})

export const useProjectIds = () => {
  const projectIds = useRecoilValue(projectIdsState)

  return {
    projectIds,
  }
}

export const useProjects = () => {
  const projects = useRecoilValue(projectsState)

  const setTeammates = useRecoilCallback(
    ({ set }) =>
      (data: ProjectResponse[]) => {
        data
          .reduce<Project['teammates']>(
            (acc, p) => uniqBy([...acc, ...p.teammates], 'id'),
            [],
          )
          .forEach((t) => set(teammateSelector(t.id), t))
      },
    [],
  )

  const setProjects = useRecoilCallback(
    ({ set }) =>
      (data: ProjectResponse[]) => {
        const projects: Project[] = data.map((d) => ({
          ...d,
          teammateIds: d.teammates.map((t) => t.id),
        }))

        projects.forEach((p) => {
          set(projectSelector(p.id), p)
        })

        setTeammates(data)
      },
    [setTeammates],
  )

  return {
    projects,
    setProjects,
  }
}

export const useProject = (projectId: string) => {
  const project = useRecoilValue(projectSelector(projectId))

  const upsertProject = useRecoilCallback(
    ({ set }) =>
      (project: Project) => {
        set(projectSelector(project.id), project)
      },
    [],
  )

  const setColor = useRecoilCallback(
    ({ snapshot }) =>
      async (projectId: string, colorId: string) => {
        const color = COLORS.find((c) => c.id === colorId)!
        const project = await snapshot.getPromise(projectSelector(projectId))

        upsertProject({
          ...project,
          color: { id: color.id, name: color.name, color: color.base },
        })
      },
    [upsertProject],
  )

  return {
    project,
    setColor,
  }
}
