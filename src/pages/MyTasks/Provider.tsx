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
export const { Provider, useContext: useMyTasksContext } =
  createProvider(useValue)
