import type React from 'react';
import { useCallback, useMemo, useState } from 'react';
import { useTasksRouter } from 'src/components/features/organisms/Tasks/hooks';
import { useToast } from 'src/hooks';
import { parseDescription } from 'src/shared/prosemirror/convertDescription';
import { createProvider } from 'src/shared/react/createProvider';
import { useTaskFeed, useTaskFeedCommand } from 'src/store/entities/taskFeed';
import { useTaskFileIdsByTaskFeedId } from 'src/store/entities/taskFile';
import { useTeammate } from 'src/store/entities/teammate';
import { Provider as ProviderContainer } from './ProviderContainer';

type Props = {
  taskFeedId: string;
  taskId: string;
  isPinned?: boolean;
};
export const Provider: React.FCWithChildren<Props> = (props) => {
  return (
    <ProviderBase {...props}>
      <ProviderContainer {...props}>{props.children}</ProviderContainer>
    </ProviderBase>
  );
};

const useValue = (props: Props) => {
  const { taskFeed } = useTaskFeed(props.taskFeedId);
  const { taskFileIds } = useTaskFileIdsByTaskFeedId(props.taskFeedId);
  const { teammate } = useTeammate(taskFeed.teammateId);
  const {
    onPin,
    onUnpin,
    onEdit,
    onDelete,
    setIsEdit,
    isEdit,
    showFeedOptionMenu,
    showLike,
    onCopyCommentLink,
  } = useFeedOptionMenu(props);

  const { editable, onCancel, onSave, onChangeDescription, description } =
    useEditor(props, {
      setIsEdit,
      isEdit,
    });

  const hasTaskFile = useMemo(() => !!taskFileIds.length, [taskFileIds]);
  const hasText = useMemo(
    () => !!taskFeed.description.content.length,
    [taskFeed.description],
  );
  return {
    taskFeed,
    teammate,
    editable,
    onEdit,
    onDelete,
    onCancel,
    description,
    onChangeDescription,
    onSave,
    showFeedOptionMenu,
    showLike,
    onPin,
    onUnpin,
    onCopyCommentLink,
    isPinned: props.isPinned ?? false,
    hasTaskFile,
    hasText,
    taskId: props.taskId,
    taskFileIds,
  };
};
useValue.__PROVIDER__ =
  'src/components/organisms/TaskDetail/TaskDetailBody/Form/FeedList/FeedListItem/Provider/Provider.tsx';
const { Provider: ProviderBase, useContext: useTaskFeedListItemContext } =
  createProvider(useValue);

const useFeedOptionMenu = (props: Props) => {
  const { getTasksDetailFeedURL } = useTasksRouter();
  const { taskFeed, setTaskFeed } = useTaskFeed(props.taskFeedId);
  const { deleteTaskFeed, undeleteTaskFeed } = useTaskFeedCommand();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const { toast } = useToast();

  const onPin = useCallback(async () => {
    await setTaskFeed({ isPinned: true });
  }, [setTaskFeed]);

  const onUnpin = useCallback(async () => {
    await setTaskFeed({ isPinned: false });
  }, [setTaskFeed]);

  const onEdit = useCallback(() => setIsEdit(true), []);

  const showFeedOptionMenu = useMemo(
    () => !taskFeed.isFirst,
    [taskFeed.isFirst],
  );
  const showLike = useMemo(() => !taskFeed.isFirst, [taskFeed.isFirst]);

  const onDelete = useCallback(async () => {
    const res = await deleteTaskFeed({ id: taskFeed.id });
    if (!res) return;

    const handleUndo = async () => {
      await undeleteTaskFeed(res);
    };

    toast({
      description: 'The comment was deleted',
      undo: handleUndo,
      duration: 10000,
    });
  }, [deleteTaskFeed, taskFeed.id, toast, undeleteTaskFeed]);

  const onCopyCommentLink = useCallback(async () => {
    await navigator.clipboard.writeText(
      getTasksDetailFeedURL({ taskId: props.taskId, taskFeedId: taskFeed.id }),
    );
    toast({
      description: 'The comment link was copied to your clipboard.',
    });
  }, [getTasksDetailFeedURL, props.taskId, taskFeed.id, toast]);

  return {
    onPin,
    onUnpin,
    onEdit,
    onDelete,
    showFeedOptionMenu,
    showLike,
    isEdit,
    setIsEdit,
    onCopyCommentLink,
  };
};

const useEditor = (
  props: Props,
  {
    setIsEdit,
    isEdit,
  }: {
    setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
    isEdit: boolean;
  },
) => {
  const { setTaskFeed } = useTaskFeed(props.taskFeedId);
  const [description, setDescription] = useState<string>('');

  const onCancel = useCallback(() => setIsEdit(false), [setIsEdit]);

  const onChangeDescription = useCallback((val: string) => {
    setDescription(val);
  }, []);

  const onSave = useCallback(async () => {
    await setTaskFeed({ description: parseDescription(description) });
    setIsEdit(false);
  }, [description, setTaskFeed, setIsEdit]);

  const editable = useCallback(() => isEdit, [isEdit]);

  return {
    onCancel,
    onSave,
    editable,
    onChangeDescription,
    description,
  };
};

export { useTaskFeedListItemContext };
