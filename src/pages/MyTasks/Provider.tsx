import { createProvider } from 'src/shared/react/createProvider'

type ContextProps = {
  loading: boolean
}

type Props = {
  loading: boolean
}

const useValue = (props: Props): ContextProps => {
  return {
    loading: props.loading,
  } as const
}
useValue.__PROVIDER__ = 'src/pages/MyTasks/Provider.tsx'
export const { Provider, useContext: useMyTasksContext } =
  createProvider(useValue)
