import { createProvider } from 'src/shared/react/createProvider'

type ContextProps = {}

const useValue = (): ContextProps => {
  return {}
}
useValue.__PROVIDER__ = 'src/components/organisms/Inbox/Inbox/Provider.tsx'
export const { Provider, useContext: useInboxContext } =
  createProvider(useValue)
