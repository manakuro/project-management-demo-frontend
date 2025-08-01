import { createProvider } from '@/shared/react/createProvider';

type ContextProps = {
  projectId: string;
};

type Props = {
  projectId: string;
};

const useValue = (props: Props): ContextProps => {
  return {
    projectId: props.projectId,
  } as const;
};
useValue.__PROVIDER__ =
  '@/components/organisms/Tasks/TasksList/TasksListSectionGroupByProject/Provider.tsx';
export const {
  Provider,
  useContext: useTasksListSectionGroupByProjectContext,
} = createProvider(useValue);
