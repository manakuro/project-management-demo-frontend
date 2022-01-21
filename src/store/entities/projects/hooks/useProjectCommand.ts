import isEqual from 'lodash-es/isEqual'
import { useRecoilCallback } from 'recoil'
import { useUpdateProjectMutation } from 'src/graphql/hooks'
import { UpdateProjectInput } from 'src/graphql/types'
import { omit } from 'src/shared/utils/omit'
import { projectState } from '../atom'
import { Project } from '../type'

export const useProjectCommand = () => {
  const [updateProjectMutation] = useUpdateProjectMutation()

  const upsert = useRecoilCallback(
    ({ set }) =>
      (project: Project) => {
        set(projectState(project.id), project)
      },
    [],
  )

  const setProject = useRecoilCallback(
    ({ snapshot }) =>
      async (payload: { projectId: string } & Partial<Omit<Project, 'id'>>) => {
        const current = await snapshot.getPromise(
          projectState(payload.projectId),
        )
        const input = { ...current, ...payload }

        upsert(input)

        try {
          await updateProjectMutation({
            variables: {
              input: prepareUpdateProjectInput(payload),
            },
          })
        } catch (err) {
          console.error(err)
          upsert(current)
          throw err
        }
      },
    [updateProjectMutation, upsert],
  )

  const setProjectBySubscription = useRecoilCallback(
    ({ snapshot }) =>
      async (projectId: string, response: Project) => {
        const current = await snapshot.getPromise(projectState(projectId))

        if (isEqual(omit(current, 'updatedAt'), omit(response, 'updatedAt')))
          return

        console.log(
          'projectBaseColorId!!: ',
          current.projectBaseColorId,
          response.projectBaseColorId,
        )

        upsert(response)
      },
    [upsert],
  )

  return {
    upsert,
    setProject,
    setProjectBySubscription,
  }
}

const prepareUpdateProjectInput = (
  payload: { projectId: string } & Partial<Omit<Project, 'id'>>,
): UpdateProjectInput => {
  return {
    id: payload.projectId,
    ...omit(payload, 'projectId'),
  }
}
