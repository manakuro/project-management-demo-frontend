import { useRecoilCallback } from 'recoil'
import {
  useCreateProjectTaskSectionMutation,
  useDeleteProjectTaskSectionAndKeepTasksMutation,
  useDeleteProjectTaskSectionAndDeleteTasksMutation,
  useDeleteProjectTaskSectionMutation,
} from 'src/graphql/hooks'
import { uuid } from 'src/shared/uuid'
import {
  ProjectTaskResponse,
  projectTasksByProjectTaskSectionIdState,
  useProjectTaskResponse,
  useResetProjectTask,
} from 'src/store/entities/projectTask'
import { useWorkspace } from 'src/store/entities/workspace'
import { initialState, projectTaskSectionState } from '../atom'
import { ProjectTaskSectionResponse } from '../type'
import { PROJECT_TASK_SECTION_CREATED_SUBSCRIPTION_REQUEST_ID } from './useProjectTaskSectionCreatedSubscription'
import { PROJECT_TASK_SECTION_DELETED_AND_DELETED_TASKS_SUBSCRIPTION_REQUEST_ID } from './useProjectTaskSectionDeletedAndDeleteTasksSubscription'
import { PROJECT_TASK_SECTION_DELETED_AND_KEEP_TASKS_SUBSCRIPTION_REQUEST_ID } from './useProjectTaskSectionDeletedAndKeepTasksSubscription'
import { PROJECT_TASK_SECTION_DELETED_SUBSCRIPTION_REQUEST_ID } from './useProjectTaskSectionDeletedSubscription'
import { useProjectTaskSectionResponse } from './useProjectTaskSectionResponse'
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
            return
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
          }
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

  return {
    addProjectsTaskSection,
    deleteTaskSectionAndKeepTasks,
    deleteTaskSectionAndDeleteTasks,
    deleteProjectTaskSection,
  }
}
