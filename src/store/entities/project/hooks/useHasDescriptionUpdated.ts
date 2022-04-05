import { atomFamily, useRecoilCallback, useRecoilValue } from 'recoil'

const key = (str: string) =>
  `src/store/entities/project/hooks/useHasDescriptionUpdated/${str}`

const hasDescriptionUpdatedState = atomFamily<number, string>({
  key: key('hasDescriptionUpdatedState'),
  default: 1,
})

type Props = {
  projectId: string
}

export const useHasDescriptionUpdatedValue = (props: Props) => {
  const hasDescriptionUpdated = useRecoilValue(
    hasDescriptionUpdatedState(props.projectId),
  )

  return {
    hasDescriptionUpdated,
  }
}

export const useSetHasDescriptionUpdated = () => {
  const setHasDescriptionUpdated = useRecoilCallback(
    ({ set }) =>
      async (projectId: string) => {
        set(hasDescriptionUpdatedState(projectId), (prev) => prev + 1)
      },
    [],
  )

  return {
    setHasDescriptionUpdated,
  }
}
