import { createProvider } from 'src/shared/react/createProvider'

const useValue = () => {
  return {}
}
useValue.__PROVIDER__ = 'src/components/organisms/Tasks/TasksBoard/Provider.tsx'
export const { Provider, useContext: useTasksBoardContext } =
  createProvider(useValue)
