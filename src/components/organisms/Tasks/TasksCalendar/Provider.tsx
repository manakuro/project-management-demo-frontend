import { createProvider } from 'src/shared/react/createProvider'

type ContextProps = {}

const useValue = (): ContextProps => {
  return {}
}
useValue.__PROVIDER__ =
  'src/components/organisms/Tasks/TasksCalendar/Provider.tsx'
export const { Provider, useContext: useTasksCalendarContext } =
  createProvider(useValue)
