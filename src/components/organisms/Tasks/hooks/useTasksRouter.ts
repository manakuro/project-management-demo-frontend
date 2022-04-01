import { useCallback } from 'react'
import {
  getMyTasksDetailFeedId,
  getMyTasksDetailFeedURL,
  getProjectsDetailFeedId,
  getProjectsDetailFeedURL,
  isMyTasksDetailURLById,
  isProjectsDetailURLById,
  useRouter,
} from 'src/router'
import { Options } from 'src/router/types'
import { useProjectsProjectId } from 'src/store/app/projects/project'
import { useTasksContext } from '../TasksProvider'

type Result = {
  navigateToTaskDetail: (taskId: string, options?: Options) => Promise<void>
  navigateToTaskBoard: (options?: Options) => Promise<void>
  isTaskDetailURLById: (taskId: string) => boolean
  getTasksDetailFeedURL: (props: {
    taskId: string
    taskFeedId: string
  }) => string
  getTasksDetailFeedId: () => string
}

export const useTasksRouter = (): Result => {
  const { isMyTasksPage, isHomePage } = useTasksContext()
  const { projectId } = useProjectsProjectId()
  const {
    router,
    navigateToHomeDetail,
    navigateToMyTasksTaskDetail,
    navigateToProjectsTaskDetail,
    navigateToProjectsBoard,
    navigateToMyTasksBoard,
  } = useRouter()

  const navigateToTaskDetail = useCallback(
    async (taskId: string, options?: Options) => {
      if (isHomePage) {
        await navigateToHomeDetail(taskId)
        return
      }

      if (isMyTasksPage) {
        await navigateToMyTasksTaskDetail(taskId, options)
        return
      }

      await navigateToProjectsTaskDetail(projectId, taskId, options)
    },
    [
      isHomePage,
      isMyTasksPage,
      navigateToHomeDetail,
      navigateToMyTasksTaskDetail,
      navigateToProjectsTaskDetail,
      projectId,
    ],
  )

  const navigateToTaskBoard = useCallback(
    async (options?: Options) => {
      if (isMyTasksPage) {
        await navigateToMyTasksBoard(options)
        return
      }

      await navigateToProjectsBoard(projectId, options)
    },
    [isMyTasksPage, navigateToMyTasksBoard, navigateToProjectsBoard, projectId],
  )

  const isTaskDetailURLById = useCallback(
    (taskId: string) => {
      if (isMyTasksPage) return isMyTasksDetailURLById(router, taskId)

      return isProjectsDetailURLById(router, taskId)
    },
    [isMyTasksPage, router],
  )

  const getTasksDetailFeedURL = useCallback(
    ({ taskId, taskFeedId }: { taskId: string; taskFeedId: string }) => {
      if (isMyTasksPage) return getMyTasksDetailFeedURL(taskId, taskFeedId)

      return getProjectsDetailFeedURL(projectId, taskId, taskFeedId)
    },
    [isMyTasksPage, projectId],
  )

  const getTasksDetailFeedId = useCallback(() => {
    if (isMyTasksPage) return getMyTasksDetailFeedId(router)

    return getProjectsDetailFeedId(router)
  }, [isMyTasksPage, router])

  return {
    navigateToTaskDetail,
    navigateToTaskBoard,
    isTaskDetailURLById,
    getTasksDetailFeedURL,
    getTasksDetailFeedId,
  }
}
