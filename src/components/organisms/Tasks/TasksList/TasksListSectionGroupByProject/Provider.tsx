import { createProvider } from 'src/shared/react/createProvider'

type ContextProps = {
  projectId: string
}

type Props = {
  projectId: string
}

const useValue = (props: Props): ContextProps => {
  return {
    projectId: props.projectId,
  } as const
}
export const {
  Provider,
  useContext: useTasksListSectionGroupByProjectContext,
} = createProvider(useValue)
