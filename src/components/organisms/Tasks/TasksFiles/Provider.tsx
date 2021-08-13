import { createProvider } from 'src/shared/react/createProvider'

type ContextProps = {}

const useValue = (): ContextProps => {
  return {}
}
useValue.__PROVIDER__ = 'src/components/organisms/Tasks/TasksFiles/Provider.tsx'
export const { Provider, useContext: useTasksFilesContext } =
  createProvider(useValue)
