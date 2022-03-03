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
          reset(projectTaskSectionState(id))
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
          const prev = await snapshot.getPromise(projectTaskSectionState(id))
          setProjectsTaskSections([prev] as ProjectTaskSectionResponse[])
          return
        }

        const projectTaskSection =
          res.data?.deleteProjectTaskSectionAndKeepTasks.keptProjectTaskSection
        if (!projectTaskSection) return

        const newProjectTasks = projectTasks.map((t) => ({
          ...t,
          projectTaskSectionId: projectTaskSection.id,
        }))
        setProjectTask(newProjectTasks as ProjectTaskResponse[], {
          includeTask: false,
        })
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

        const res = await deleteProjectTaskSectionAndDeleteTasksMutation({
          variables: {
            input: {
              id,
              workspaceId: workspace.id,
              requestId: 'requestId',
            },
          },
        })
        if (res.errors) {
          const prev = await snapshot.getPromise(projectTaskSectionState(id))
          setProjectsTaskSections([prev] as ProjectTaskSectionResponse[])
          setProjectTask(projectTasks as ProjectTaskResponse[])
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
          const prev = await snapshot.getPromise(projectTaskSectionState(id))
          setProjectsTaskSections([prev] as ProjectTaskSectionResponse[])
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
