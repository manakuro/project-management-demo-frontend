import { useCallback } from 'react'
import { useRecoilCallback } from 'recoil'
import { uniqBy } from 'src/shared/utils'
import { projectTaskState } from 'src/store/entities/projectTask'
import { useTaskCollaboratorResponse } from 'src/store/entities/taskCollaborator'
import { taskFeedState } from 'src/store/entities/taskFeed'
import { useTaskFeedLikeResponse } from 'src/store/entities/taskFeedLike'
import { taskFileState } from 'src/store/entities/taskFile'
import { useTaskLikeResponse } from 'src/store/entities/taskLike'
import { taskTagState } from 'src/store/entities/taskTag'
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
    setTaskLikes,
    setTeammates,
  } = useSetters()

  const setTasksFromResponse = useRecoilCallback(
    () => (data: TaskResponse[]) => {
      setTasks(data)
      setAttachments(data)
      setTaskFeeds(data)
      setTags(data)
      setProjects(data)
      setTaskFeedLikes(data)
      setTaskLikes(data)
      setTeammates(data)
    },
    [
      setTasks,
      setAttachments,
      setTaskFeeds,
      setTags,
      setProjects,
      setTaskFeedLikes,
      setTaskLikes,
      setTeammates,
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
  const { setTaskLikes: setTaskLikesResponse } = useTaskLikeResponse()
  const { setTaskCollaborators: setTaskCollaboratorsResponse } =
    useTaskCollaboratorResponse()

  const setTaskLikes = useRecoilCallback(
    () => (data: TaskResponse[]) => {
      const taskLikes = data.reduce<TaskResponse['taskLikes']>(
        (acc, p) => uniqBy([...acc, ...p.taskLikes], 'id'),
        [],
      )
      setTaskLikesResponse(taskLikes)
    },
    [setTaskLikesResponse],
  )

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
          .forEach((t) =>
            set(taskFileState(t.id), (prev) => {
              return {
                ...prev,
                ...t,
              }
            }),
          )
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
          .forEach((t) =>
            set(taskFeedState(t.id), (prev) => {
              return {
                ...prev,
                ...t,
              }
            }),
          )
      },
    [],
  )
  const setTeammates = useRecoilCallback(
    () => (data: TaskResponse[]) => {
      const taskCollaborators = data.reduce<TaskResponse['taskCollaborators']>(
        (acc, d) => [...acc, ...d.taskCollaborators],
        [],
      )
      setTaskCollaboratorsResponse(taskCollaborators)
      setTeammatesResponse(taskCollaborators.map((t) => t.teammate))
    },
    [setTaskCollaboratorsResponse, setTeammatesResponse],
  )
  const setTags = useRecoilCallback(
    ({ set }) =>
      (data: TaskResponse[]) => {
        data
          .reduce<TaskResponse['taskTags']>(
            (acc, p) => uniqBy([...acc, ...p.taskTags], 'id'),
            [],
          )
          .forEach((t) =>
            set(taskTagState(t.id), (prev) => {
              return {
                ...prev,
                ...t,
              }
            }),
          )
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
          .forEach((p) =>
            set(projectTaskState(p.id), (prev) => {
              return {
                ...prev,
                ...p,
              }
            }),
          )
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
    setTaskLikes,
  }
}
