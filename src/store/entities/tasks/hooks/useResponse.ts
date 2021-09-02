import { useCallback } from 'react'
import { useRecoilCallback } from 'recoil'
import { uniqBy } from 'src/shared/utils'
import { attachmentSelector } from 'src/store/entities/attachments'
import { feedSelector } from 'src/store/entities/feeds'
import { projectTaskSelector } from 'src/store/entities/projectTasks'
import { tagSelector } from 'src/store/entities/tags'
import { taskTeammateSelector } from 'src/store/entities/taskTeammates'
import { useTeammatesResponse } from 'src/store/entities/teammates'
import { taskSelector } from '../atom'
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
        set(taskSelector(data.id), data)
      },
    [],
  )
  const setTask = useCallback(
    (data: TaskResponse) => {
      if (data.subTasks.length) {
        data.subTasks.forEach((t) => {
          setTask(t)
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
          .reduce<TaskResponse['attachments']>(
            (acc, p) => uniqBy([...acc, ...p.attachments], 'id'),
            [],
          )
          .forEach((t) => set(attachmentSelector(t.id), t))
      },
    [],
  )
  const setFeeds = useRecoilCallback(
    ({ set }) =>
      (data: TaskResponse[]) => {
        data
          .reduce<TaskResponse['feeds']>(
            (acc, p) => uniqBy([...acc, ...p.feeds], 'id'),
            [],
          )
          .forEach((f) => set(feedSelector(f.id), f))
      },
    [],
  )
  const setTeammates = useRecoilCallback(
    ({ set }) =>
      (data: TaskResponse[]) => {
        const taskTeammates = data.reduce<TaskResponse['teammates']>(
          (acc, d) => [...acc, ...d.teammates],
          [],
        )
        taskTeammates.forEach((t) => set(taskTeammateSelector(t.id), t))

        setTeammatesFromResponse(taskTeammates)
      },
    [setTeammatesFromResponse],
  )
  const setTags = useRecoilCallback(
    ({ set }) =>
      (data: TaskResponse[]) => {
        data
          .reduce<TaskResponse['tags']>(
            (acc, p) => uniqBy([...acc, ...p.tags], 'id'),
            [],
          )
          .forEach((f) => set(tagSelector(f.id), f))
      },
    [],
  )

  const setProjects = useRecoilCallback(
    ({ set }) =>
      (data: TaskResponse[]) => {
        data
          .reduce<TaskResponse['projects']>(
            (acc, p) => uniqBy([...acc, ...p.projects], 'id'),
            [],
          )
          .forEach((p) => set(projectTaskSelector(p.id), p))
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
