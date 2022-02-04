import { useCallback } from 'react'
import { useRecoilCallback } from 'recoil'
import { uniqBy } from 'src/shared/utils'
import { projectTaskState } from 'src/store/entities/projectsTasks'
import { tagState } from 'src/store/entities/tags'
import { taskFeedState } from 'src/store/entities/taskFeed'
import { taskFileState } from 'src/store/entities/taskFile'
import { taskTeammateState } from 'src/store/entities/tasksTeammates'
import { useTeammatesResponse } from 'src/store/entities/teammates'
import { taskState } from '../atom'
import { TaskResponse } from '../type'

export const useTasksResponse = () => {
  const { setTasks, setAttachments, setFeeds, setTags, setProjects } =
    useSetters()

  const setTasksFromResponse = useRecoilCallback(
    () => (data: TaskResponse[]) => {
      setTasks(data)
      setAttachments(data)
      setFeeds(data)
      setTags(data)
      setProjects(data)
    },
    [setAttachments, setFeeds, setTags, setTasks, setProjects],
  )

  return {
    setTasksFromResponse,
  }
}

export const useTaskResponse = () => {
  const {
    setTasks,
    setAttachments,
    setFeeds,
    setTags,
    setTeammates,
    setProjects,
  } = useSetters()

  const setTaskFromResponse = useRecoilCallback(
    () => (data: TaskResponse) => {
      setTasks([data])
      setAttachments([data])
      setFeeds([data])
      setTeammates([data])
      setTags([data])
      setProjects([data])
    },
    [setAttachments, setFeeds, setTags, setTasks, setTeammates, setProjects],
  )

  return {
    setTaskFromResponse,
  }
}

const useSetters = () => {
  const { setTeammates: setTeammatesFromResponse } = useTeammatesResponse()

  const setTaskValue = useRecoilCallback(
    ({ set }) =>
      (data: TaskResponse) => {
        set(taskState(data.id), data)
      },
    [],
  )
  const setTask = useCallback(
    (data: TaskResponse) => {
      if (data?.subTasks?.length) {
        data.subTasks.forEach((t) => {
          setTask(t as TaskResponse)
        })
        setTaskValue(data)
        return
      }
      setTaskValue(data)
    },
    [setTaskValue],
  )

  const setTasks = useCallback(
    (data: TaskResponse[]) => {
      data.forEach((t) => {
        setTask(t)
      })
    },
    [setTask],
  )

  const setAttachments = useRecoilCallback(
    ({ set }) =>
      (data: TaskResponse[]) => {
        data
          .reduce<TaskResponse['taskFiles']>(
            (acc, p) => uniqBy([...acc, ...p.taskFiles], 'id'),
            [],
          )
          .forEach((t) => set(taskFileState(t.id), t))
      },
    [],
  )
  const setFeeds = useRecoilCallback(
    ({ set }) =>
      (data: TaskResponse[]) => {
        data
          .reduce<TaskResponse['taskFeeds']>(
            (acc, p) => uniqBy([...acc, ...p.taskFeeds], 'id'),
            [],
          )
          .forEach((f) => set(taskFeedState(f.id), f))
      },
    [],
  )
  const setTeammates = useRecoilCallback(
    ({ set }) =>
      (data: TaskResponse[]) => {
        const taskTeammates = data.reduce<TaskResponse['taskCollaborators']>(
          (acc, d) => [...acc, ...d.taskCollaborators],
          [],
        )
        taskTeammates.forEach((t) => set(taskTeammateState(t.id), t))

        setTeammatesFromResponse(taskTeammates.map((t) => t.teammate))
      },
    [setTeammatesFromResponse],
  )
  const setTags = useRecoilCallback(
    ({ set }) =>
      (data: TaskResponse[]) => {
        data
          .reduce<TaskResponse['taskTags']>(
            (acc, p) => uniqBy([...acc, ...p.taskTags], 'id'),
            [],
          )
          .forEach((f) => set(tagState(f.id), f))
      },
    [],
  )

  const setProjects = useRecoilCallback(
    ({ set }) =>
      (data: TaskResponse[]) => {
        data
          .reduce<TaskResponse['projectTasks']>(
            (acc, p) => uniqBy([...acc, ...p.projectTasks], 'id'),
            [],
          )
          .forEach((p) => set(projectTaskState(p.id), p))
      },
    [],
  )

  return {
    setAttachments,
    setFeeds,
    setTeammates,
    setTags,
    setTasks,
    setProjects,
  }
}
