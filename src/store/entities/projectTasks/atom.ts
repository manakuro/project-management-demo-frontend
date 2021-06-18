import {
  atomFamily,
  selectorFamily,
  useRecoilCallback,
  DefaultValue,
  atom,
  useRecoilValue,
} from 'recoil'
import { uniqBy } from 'src/shared/utils'
import { ProjectTask, ProjectTaskResponse } from './type'

export const projectTaskIdsState = atom<string[]>({
  key: 'projectTaskIdsState',
  default: [],
})
export const projectTasksState = atom<ProjectTask[]>({
  key: 'projectTasksState',
  default: [],
})

const projectTaskState = atomFamily<ProjectTask, string>({
  key: 'projectTaskState',
  default: {
    id: '',
    projectId: '',
    taskId: '',
    createdAt: '',
    updatedAt: '',
  },
})

export const projectTaskSelector = selectorFamily<ProjectTask, string>({
  key: 'projectTaskSelector',
  get:
    (projectTaskId) =>
    ({ get }) =>
      get(projectTaskState(projectTaskId)),
  set:
    (projectTaskId) =>
    ({ get, set, reset }, newVal) => {
      if (newVal instanceof DefaultValue) {
        reset(projectTaskState(projectTaskId))
        return
      }

      set(projectTaskState(projectTaskId), newVal)
      set(projectTasksState, (prev) =>
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

      if (
        get(projectTaskIdsState).find(
          (projectTaskId) => projectTaskId === newVal.id,
        )
      )
        return
      set(projectTaskIdsState, (prev) => [...prev, newVal.id])
    },
})

export const useProjectTasks = () => {
  const projectTasks = useRecoilValue(projectTasksState)

  const setProjectTasks = useRecoilCallback(
    ({ set }) =>
      (data: ProjectTaskResponse[]) => {
        data.forEach((p) => {
          set(projectTaskSelector(p.id), p)
        })
      },
    [],
  )

  return {
    projectTasks,
    setProjectTasks,
  }
}

export const useProjectTask = (projectTaskId: string) => {
  const projectTask = useRecoilValue(projectTaskSelector(projectTaskId))

  const upsert = useRecoilCallback(
    ({ set }) =>
      (projectTask: ProjectTask) => {
        set(projectTaskSelector(projectTask.id), projectTask)
      },
    [],
  )

  const setProjectTask = useRecoilCallback(
    ({ snapshot }) =>
      async (val: Partial<ProjectTask>) => {
        const prev = await snapshot.getPromise(
          projectTaskSelector(projectTask.id),
        )
        upsert({
          ...prev,
          ...val,
        })
      },
    [projectTask.id, upsert],
  )

  return {
    projectTask,
    setProjectTask,
  }
}