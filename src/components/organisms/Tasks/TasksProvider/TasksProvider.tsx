import { createProvider } from 'src/shared/react/createProvider'

type ContextProps = {
  isMyTasksPage: boolean
  isProjectsPage: boolean
}

type Props = {
  isMyTasksPage?: boolean
  isProjectsPage?: boolean
}
export type TasksProviderProps = Props

const useValue = (props: Props): ContextProps => {
  return {
    isMyTasksPage: !!props.isMyTasksPage,
    isProjectsPage: !!props.isProjectsPage,
  } as const
}
export const { Provider: TasksProvider, useContext: useTasksContext } =
  createProvider(useValue)
