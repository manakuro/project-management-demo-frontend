import { createProvider } from '@/shared/react/createProvider';

const useValue = () => {
  return {};
};
useValue.__PROVIDER__ = '@/components/organisms/Tasks/TasksBoard/Provider.tsx';
export const { Provider, useContext: useTasksBoardContext } =
  createProvider(useValue);
