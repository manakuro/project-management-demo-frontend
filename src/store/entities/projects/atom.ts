import {
  atomFamily,
  selectorFamily,
  useRecoilCallback,
  DefaultValue,
  atom,
  useRecoilValue,
} from 'recoil'
import { COLORS } from 'src/hooks/useColorPicker'
import { uniqBy } from 'src/shared/utils'
import { projectTeammateSelector } from 'src/store/entities/projectTeammates'
import { useTeammateCommand } from 'src/store/entities/teammates'
import { Project, ProjectResponse } from './type'

const key = (str: string) => `src/store/entities/projects/${str}`

export const projectIdsState = atom<string[]>({
  key: key('projectIdsState'),
  default: [],
})
export const projectsState = atom<Project[]>({
  key: key('projectsState'),
  default: [],
})

const projectState = atomFamily<Project, string>({
  key: key('projectState'),
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
  key: key('projectSelector'),
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
  const { setTeammatesFromResponse } = useTeammateCommand()

  const setTeammates = useRecoilCallback(
    ({ set }) =>
      (data: ProjectResponse[]) => {
        const projectTeammates = data.reduce<ProjectResponse['teammates']>(
          (acc, p) => uniqBy([...acc, ...p.teammates], 'id'),
          [],
        )
        projectTeammates.forEach((t) => set(projectTeammateSelector(t.id), t))

        setTeammatesFromResponse(projectTeammates)
      },
    [setTeammatesFromResponse],
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
