import { useEffect, useState } from 'react';
import { useMountedRef } from 'src/hooks';
import { ROUTE_MY_TASKS, useRouter } from 'src/router';
import { createProvider } from 'src/shared/react/createProvider';

type ContextProps = {
  selected: boolean;
};

type Props = {
  taskId: string;
};

const useValue = (props: Props): ContextProps => {
  const [selected, setSelected] = useState<boolean>(false);
  const { router } = useRouter();
  const { mountedRef } = useMountedRef();

  useEffect(() => {
    if (!mountedRef.current) return;

    if (router.query[ROUTE_MY_TASKS.query]?.[0] === props.taskId) {
      setSelected(true);
      return;
    }
    setSelected(false);
  }, [mountedRef, props.taskId, router]);

  return {
    selected,
  };
};
useValue.__PROVIDER__ =
  'src/components/organisms/Tasks/TasksList/TasksListItem/Provider/TasksListRowProvider.tsx';
export const { Provider, useContext: useTasksListItemRowContext } =
  createProvider(useValue);
