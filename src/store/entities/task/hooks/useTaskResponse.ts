import { useCallback } from 'react'
import { useRecoilCallback } from 'recoil'
import { uniqBy } from 'src/shared/utils'
import { projectTaskState } from 'src/store/entities/projectTask'
import { taskFeedState } from 'src/store/entities/taskFeed'
import { useTaskFeedLikeResponse } from 'src/store/entities/taskFeedLike'
import { taskFileState } from 'src/store/entities/taskFile'
import { taskTagState } from 'src/store/entities/taskTag'
import { taskTeammateState } from 'src/store/entities/taskTeammate'
import { useTeammateResponse } from 'src/store/entities/teammate'
import { initialState, taskState } from '../atom'
import { TaskResponse } from '../type'

export const useTasksResponse = () => {
  const {
    setTasks,
    setAttachments,
    setTaskFeeds,
    setTags,
    setProjects,
    setTaskFeedLikes,
  } = useSetters()

  const setTasksFromResponse = useRecoilCallback(
    () => (data: TaskResponse[]) => {
      setTasks(data)
      setAttachments(data)
      setTaskFeeds(data)
      setTags(data)
      setProjects(data)
      setTaskFeedLikes(data)
    },
    [
      setTasks,
      setAttachments,
      setTaskFeeds,
      setTags,
      setProjects,
      setTaskFeedLikes,
    ],
  )

  return {
    setTasksFromResponse,
  }
}

const useSetters = () => {
  const { setTeammates: setTeammatesResponse } = useTeammateResponse()
  const { setTaskFeedLikes: setTaskFeedLikesResponse } =
    useTaskFeedLikeResponse()

  const setTaskFeedLikes = useRecoilCallback(
    () => (data: TaskResponse[]) => {
      const taskFeedLikes = data.reduce<TaskResponse['taskFeedLikes']>(
        (acc, p) => uniqBy([...acc, ...p.taskFeedLikes], 'id'),
        [],
      )
      setTaskFeedLikesResponse(taskFeedLikes)
    },
    [setTaskFeedLikesResponse],
  )

  const setTaskValue = useRecoilCallback(
    ({ set }) =>
      (data: TaskResponse) => {
        set(taskState(data.id), {
          ...data,
          taskPriority: {
            ...(data?.taskPriority || initialState().taskPriority),
          },
        })
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
  const setTaskFeeds = useRecoilCallback(
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

        setTeammatesResponse(taskTeammates.map((t) => t.teammate))
      },
    [setTeammatesResponse],
  )
  const setTags = useRecoilCallback(
    ({ set }) =>
      (data: TaskResponse[]) => {
        data
          .reduce<TaskResponse['taskTags']>(
            (acc, p) => uniqBy([...acc, ...p.taskTags], 'id'),
            [],
          )
          .forEach((f) => set(taskTagState(f.id), f))
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
    setTaskFeeds,
    setTeammates,
    setTags,
    setTasks,
    setProjects,
    setTaskFeedLikes,
  }
}
