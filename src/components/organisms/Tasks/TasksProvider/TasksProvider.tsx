import { createProvider } from 'src/shared/react/createProvider'

type ContextProps = {
  isMyTasksPage: boolean
  isProjectsPage: boolean
  isHomePage: boolean
}

type Props = {
  isMyTasksPage?: boolean
  isProjectsPage?: boolean
  isHomePage?: boolean
}
export type TasksProviderProps = Props

const useValue = (props: Props): ContextProps => {
  return {
    isMyTasksPage: !!props.isMyTasksPage,
    isProjectsPage: !!props.isProjectsPage,
    isHomePage: !!props.isHomePage,
  } as const
}
useValue.__PROVIDER__ = 'TasksProvider'
export const { Provider: TasksProvider, useContext: useTasksContext } =
  createProvider(useValue)
