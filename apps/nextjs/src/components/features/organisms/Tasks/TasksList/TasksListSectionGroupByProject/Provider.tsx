import { createProvider } from 'src/shared/react/createProvider';

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
  'src/components/organisms/Tasks/TasksList/TasksListSectionGroupByProject/Provider.tsx';
export const {
  Provider,
  useContext: useTasksListSectionGroupByProjectContext,
} = createProvider(useValue);
