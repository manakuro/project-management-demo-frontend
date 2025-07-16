import { createProvider } from 'src/shared/react/createProvider';

type ContextProps = {
  isActivity: boolean;
  isArchive: boolean;
};
type Props = {
  isActivity?: boolean;
  isArchive?: boolean;
};
export type InboxProviderProps = Props;

const useValue = (props: Props): ContextProps => {
  return {
    isActivity: !!props.isActivity,
    isArchive: !!props.isArchive,
  };
};
useValue.__PROVIDER__ = 'src/components/organisms/Inbox/Inbox/Provider.tsx';
export const { Provider, useContext: useInboxContext } =
  createProvider(useValue);
