import { useRecoilCallback } from 'recoil'
import {
  useCreateProjectTaskSectionMutation,
  useDeleteProjectTaskSectionAndKeepTasksMutation,
  useDeleteProjectTaskSectionAndDeleteTasksMutation,
  useDeleteProjectTaskSectionMutation,
  useUndeleteProjectTaskSectionAndKeepTasksMutation,
  useUndeleteProjectTaskSectionAndDeleteTasksMutation,
} from 'src/graphql/hooks'
import { uuid } from 'src/shared/uuid'
import {
  ProjectTaskResponse,
  projectTasksByIdsState,
  projectTasksByProjectTaskSectionIdState,
  useProjectTaskResponse,
  useResetProjectTask,
} from 'src/store/entities/projectTask'
import { useWorkspace } from 'src/store/entities/workspace'
import { initialState, projectTaskSectionState } from '../atom'
import {
  ProjectTaskSectionResponse,
  DeleteProjectTaskSectionAndKeepTasksMutation,
  DeleteProjectTaskSectionAndDeleteTasksMutation,
} from '../type'
import { PROJECT_TASK_SECTION_CREATED_SUBSCRIPTION_REQUEST_ID } from './useProjectTaskSectionCreatedSubscription'
import { PROJECT_TASK_SECTION_DELETED_AND_DELETED_TASKS_SUBSCRIPTION_REQUEST_ID } from './useProjectTaskSectionDeletedAndDeleteTasksSubscription'
import { PROJECT_TASK_SECTION_DELETED_AND_KEEP_TASKS_SUBSCRIPTION_REQUEST_ID } from './useProjectTaskSectionDeletedAndKeepTasksSubscription'
import { PROJECT_TASK_SECTION_DELETED_SUBSCRIPTION_REQUEST_ID } from './useProjectTaskSectionDeletedSubscription'
import { useProjectTaskSectionResponse } from './useProjectTaskSectionResponse'
import { PROJECT_TASK_SECTION_UNDELETED_AND_KEEP_TASKS_SUBSCRIPTION_REQUEST_ID } from './useProjectTaskSectionUndeletedAndKeepTasksSubscription'
import { useUpsert } from './useUpsert'

export const useProjectTaskSectionCommand = () => {
  const { upsert } = useUpsert()
  const [createProjectTaskSectionMutation] =
    useCreateProjectTaskSectionMutation()
  const { workspace } = useWorkspace()
  const { setProjectTask } = useProjectTaskResponse()
  const { setProjectsTaskSections } = useProjectTaskSectionResponse()
  const { resetProjectTasks } = useResetProjectTask()

  const [deleteProjectTaskSectionAndKeepTasksMutation] =
    useDeleteProjectTaskSectionAndKeepTasksMutation()

  const [deleteProjectTaskSectionAndDeleteTasksMutation] =
    useDeleteProjectTaskSectionAndDeleteTasksMutation()

  const [deleteProjectTaskSectionMutation] =
    useDeleteProjectTaskSectionMutation()

  const [undeleteProjectTaskSectionAndKeepTasksMutation] =
    useUndeleteProjectTaskSectionAndKeepTasksMutation()

  const [undeleteProjectTaskSectionAndDeleteTasksMutation] =
    useUndeleteProjectTaskSectionAndDeleteTasksMutation()

  const addProjectsTaskSection = useRecoilCallback(
    ({ reset }) =>
      async (val: { projectId: string }) => {
        const id = uuid()
        upsert({
          ...initialState(),
          ...val,
          isNew: true,
          id,
        })

        const restore = () => {
          reset(projectTaskSectionState(id))
        }

        try {
          const res = await createProjectTaskSectionMutation({
            variables: {
              input: {
                projectId: val.projectId,
                requestId: PROJECT_TASK_SECTION_CREATED_SUBSCRIPTION_REQUEST_ID,
                workspaceId: workspace.id,
              },
            },
          })
          if (res.errors) {
            restore()
            return ''
          }

          const addedProjectTaskSection = res.data?.createProjectTaskSection
          if (!addedProjectTaskSection) return ''

          reset(projectTaskSectionState(id))
          setProjectsTaskSections([
            {
              ...addedProjectTaskSection,
              isNew: true,
            },
          ])

          return addedProjectTaskSection.id
        } catch (e) {
          restore()
          throw e
        }
      },
    [
      upsert,
      createProjectTaskSectionMutation,
      workspace.id,
      setProjectsTaskSections,
    ],
  )

  const deleteTaskSectionAndKeepTasks = useRecoilCallback(
    ({ reset, snapshot }) =>
      async (id: string) => {
        const projectTasks = await snapshot.getPromise(
          projectTasksByProjectTaskSectionIdState(id),
        )

        reset(projectTaskSectionState(id))

        const restore = async () => {
          const prev = await snapshot.getPromise(projectTaskSectionState(id))
          setProjectsTaskSections([prev] as ProjectTaskSectionResponse[])
        }

        try {
          const res = await deleteProjectTaskSectionAndKeepTasksMutation({
            variables: {
              input: {
                id,
                workspaceId: workspace.id,
                requestId:
                  PROJECT_TASK_SECTION_DELETED_AND_KEEP_TASKS_SUBSCRIPTION_REQUEST_ID,
              },
            },
          })
          if (res.errors) {
            await restore()
            return null
          }

          const projectTaskSection =
            res.data?.deleteProjectTaskSectionAndKeepTasks
              .keptProjectTaskSection
          if (!projectTaskSection) return

          const newProjectTasks = projectTasks.map((t) => ({
            ...t,
            projectTaskSectionId: projectTaskSection.id,
          }))
          setProjectTask(newProjectTasks as ProjectTaskResponse[], {
            includeTask: false,
          })

          return res.data
        } catch (e) {
          await restore()
          throw e
        }
      },
    [
      deleteProjectTaskSectionAndKeepTasksMutation,
      setProjectTask,
      setProjectsTaskSections,
      workspace.id,
    ],
  )

  const deleteTaskSectionAndDeleteTasks = useRecoilCallback(
    ({ reset, snapshot }) =>
      async (id: string) => {
        const projectTasks = await snapshot.getPromise(
          projectTasksByProjectTaskSectionIdState(id),
        )

        reset(projectTaskSectionState(id))
        resetProjectTasks(projectTasks)

        const restore = async () => {
          const prev = await snapshot.getPromise(projectTaskSectionState(id))
          setProjectsTaskSections([prev] as ProjectTaskSectionResponse[])
          setProjectTask(projectTasks as ProjectTaskResponse[])
        }

        try {
          const res = await deleteProjectTaskSectionAndDeleteTasksMutation({
            variables: {
              input: {
                id,
                workspaceId: workspace.id,
                requestId:
                  PROJECT_TASK_SECTION_DELETED_AND_DELETED_TASKS_SUBSCRIPTION_REQUEST_ID,
              },
            },
          })
          if (res.errors) {
            await restore()
            return null
          }

          return res.data
        } catch (e) {
          await restore()
          throw e
        }
      },
    [
      deleteProjectTaskSectionAndDeleteTasksMutation,
      resetProjectTasks,
      setProjectTask,
      setProjectsTaskSections,
      workspace.id,
    ],
  )

  const deleteProjectTaskSection = useRecoilCallback(
    ({ reset, snapshot }) =>
      async (id: string) => {
        reset(projectTaskSectionState(id))

        const restore = async () => {
          const prev = await snapshot.getPromise(projectTaskSectionState(id))
          setProjectsTaskSections([prev] as ProjectTaskSectionResponse[])
        }

        try {
          const res = await deleteProjectTaskSectionMutation({
            variables: {
              input: {
                id,
                workspaceId: workspace.id,
                requestId: PROJECT_TASK_SECTION_DELETED_SUBSCRIPTION_REQUEST_ID,
              },
            },
          })
          if (res.errors) {
            await restore()
          }
        } catch (e) {
          await restore()
          throw e
        }
      },
    [deleteProjectTaskSectionMutation, setProjectsTaskSections, workspace.id],
  )

  const undeleteTaskSectionAndKeepTasks = useRecoilCallback(
    ({ snapshot }) =>
      async (val: DeleteProjectTaskSectionAndKeepTasksMutation) => {
        const release = snapshot.retain()

        const projectTaskSection =
          val.deleteProjectTaskSectionAndKeepTasks.projectTaskSection
        const projectTaskIds =
          val.deleteProjectTaskSectionAndKeepTasks.projectTaskIds

        try {
          const res = await undeleteProjectTaskSectionAndKeepTasksMutation({
            variables: {
              input: {
                name: projectTaskSection.name,
                projectId: projectTaskSection.projectId,
                workspaceId: workspace.id,
                createdAt: projectTaskSection.createdAt,
                updatedAt: projectTaskSection.updatedAt,
                keptProjectTaskIds: projectTaskIds,
                requestId:
                  PROJECT_TASK_SECTION_UNDELETED_AND_KEEP_TASKS_SUBSCRIPTION_REQUEST_ID,
              },
            },
          })
          if (res.errors) {
            return
          }

          const data = res.data?.undeleteProjectTaskSectionAndKeepTasks
          if (!data) return

          setProjectsTaskSections([data.projectTaskSection], {
            includeProjectTasks: false,
          })

          const projectTasks = await snapshot.getPromise(
            projectTasksByIdsState(data.projectTaskIds),
          )

          const newProjectTasks = projectTasks.map((t) => ({
            ...t,
            projectTaskSectionId: data.projectTaskSection.id,
          }))
          setProjectTask(newProjectTasks as ProjectTaskResponse[], {
            includeTask: false,
          })
        } finally {
          release()
        }
      },
    [
      setProjectTask,
      setProjectsTaskSections,
      undeleteProjectTaskSectionAndKeepTasksMutation,
      workspace.id,
    ],
  )

  const undeleteTaskSectionAndDeleteTasks = useRecoilCallback(
    () => async (val: DeleteProjectTaskSectionAndDeleteTasksMutation) => {
      const projectTaskSection =
        val.deleteProjectTaskSectionAndDeleteTasks.projectTaskSection
      const projectTaskIds =
        val.deleteProjectTaskSectionAndDeleteTasks.projectTaskIds
      const taskIds = val.deleteProjectTaskSectionAndDeleteTasks.taskIds

      const res = await undeleteProjectTaskSectionAndDeleteTasksMutation({
        variables: {
          input: {
            name: projectTaskSection.name,
            projectId: projectTaskSection.projectId,
            workspaceId: workspace.id,
            createdAt: projectTaskSection.createdAt,
            updatedAt: projectTaskSection.updatedAt,
            deletedProjectTaskIds: projectTaskIds,
            deletedTaskIds: taskIds,
            requestId: '',
          },
        },
      })
      if (res.errors) {
        return
      }

      const data = res.data?.undeleteProjectTaskSectionAndDeleteTasks
      if (!data) return

      setProjectsTaskSections([data.projectTaskSection])
    },
    [
      setProjectsTaskSections,
      undeleteProjectTaskSectionAndDeleteTasksMutation,
      workspace.id,
    ],
  )

  return {
    addProjectsTaskSection,
    deleteTaskSectionAndKeepTasks,
    deleteTaskSectionAndDeleteTasks,
    deleteProjectTaskSection,
    undeleteTaskSectionAndKeepTasks,
    undeleteTaskSectionAndDeleteTasks,
  }
}
