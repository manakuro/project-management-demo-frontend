import { atom, useRecoilState } from 'recoil';
import { useResizeObserver } from 'src/hooks/useResizeObserver';
import { useTasksListContent } from './useTasksListContent';

const key = (str: string) =>
  `src/components/organisms/Tasks/TasksList/TasksListContent/useTasksListContentSticky/${str}`;

const stickyVerticalState = atom<boolean>({
  key: key('stickyVerticalState'),
  default: false,
});

type Props = {
  listenOnEvent?: boolean;
};
export const useTasksListContentSticky = (props?: Props) => {
  const { dom } = useTasksListContent();
  const [isStickyVertical, setIsStickyVertical] =
    useRecoilState(stickyVerticalState);

  useResizeObserver(
    (dom?.children?.[0] ?? null) as HTMLElement | null,
    (entry) => {
      const listContainerWidth = dom?.getBoundingClientRect().width ?? 0;
      const listContentWidth = entry.contentRect.width;
      setIsStickyVertical(listContentWidth > listContainerWidth);
    },
    {
      skip: !props?.listenOnEvent,
    },
  );

  return {
    isStickyVertical,
  };
};
