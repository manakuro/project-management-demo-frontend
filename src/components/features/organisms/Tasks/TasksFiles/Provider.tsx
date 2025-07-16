import { createProvider } from 'src/shared/react/createProvider';

const useValue = () => {
  return {};
};
useValue.__PROVIDER__ =
  'src/components/organisms/Tasks/TasksFiles/Provider.tsx';
export const { Provider, useContext: useTasksFilesContext } =
  createProvider(useValue);
