import React, { useCallback, useMemo, useState } from 'react'
import { useToast } from 'src/hooks'
import { getMyTasksDetailFeedURL } from 'src/router'
import { parseDescription } from 'src/shared/prosemirror/convertDescription'
import { createProvider } from 'src/shared/react/createProvider'
import { useFeed } from 'src/store/entities/feeds'
import { useTaskFileIdsByTaskFeedId } from 'src/store/entities/taskFile'
import { useTeammate } from 'src/store/entities/teammates'
import { Provider as ProviderContainer } from './ProviderContainer'

type Props = {
  feedId: string
  taskId: string
  isPinned?: boolean
}
export const Provider: React.FC<Props> = (props) => {
  return (
    <ProviderBase {...props}>
      <ProviderContainer {...props}>{props.children}</ProviderContainer>
    </ProviderBase>
  )
}

const useValue = (props: Props) => {
  const { feed } = useFeed(props.feedId)
  const { taskFileIds } = useTaskFileIdsByTaskFeedId(props.feedId)
  const { teammate } = useTeammate(feed.teammateId)
  const {
    onPin,
    onUnpin,
    onEdit,
    setIsEdit,
    isEdit,
    showFeedOptionMenu,
    showLike,
    onCopyCommentLink,
  } = useFeedOptionMenu(props)

  const { editable, onCancel, onSave, onChangeDescription, description } =
    useEditor(props, {
      setIsEdit,
      isEdit,
    })

  const hasTaskFile = useMemo(() => !!taskFileIds.length, [taskFileIds])
  const hasText = useMemo(
    () => !!feed.description.content.length,
    [feed.description],
  )
  return {
    feed,
    teammate,
    editable,
    onEdit,
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
  }
}
useValue.__PROVIDER__ =
  'src/components/organisms/TaskDetail/TaskDetailBody/Form/FeedList/FeedListItem/Provider/Provider.tsx'
const { Provider: ProviderBase, useContext: useFeedListItemContext } =
  createProvider(useValue)

const useFeedOptionMenu = (props: Props) => {
  const { feed, setFeed } = useFeed(props.feedId)
  const [isEdit, setIsEdit] = useState<boolean>(false)
  const { toast } = useToast()

  const onPin = useCallback(async () => {
    await setFeed({ isPinned: true })
  }, [setFeed])

  const onUnpin = useCallback(async () => {
    await setFeed({ isPinned: false })
  }, [setFeed])

  const onEdit = useCallback(() => setIsEdit(true), [])

  const showFeedOptionMenu = useMemo(() => !feed.isFirst, [feed.isFirst])
  const showLike = useMemo(() => !feed.isFirst, [feed.isFirst])

  const onCopyCommentLink = useCallback(async () => {
    await navigator.clipboard.writeText(
      getMyTasksDetailFeedURL(props.taskId, feed.id),
    )
    toast({
      description: 'The comment link was copied to your clipboard.',
    })
  }, [feed.id, props.taskId, toast])

  return {
    onPin,
    onUnpin,
    onEdit,
    showFeedOptionMenu,
    showLike,
    isEdit,
    setIsEdit,
    onCopyCommentLink,
  }
}

const useEditor = (
  props: Props,
  {
    setIsEdit,
    isEdit,
  }: {
    setIsEdit: React.Dispatch<React.SetStateAction<boolean>>
    isEdit: boolean
  },
) => {
  const { setFeed } = useFeed(props.feedId)
  const [description, setDescription] = useState<string>('')

  const onCancel = useCallback(() => setIsEdit(false), [setIsEdit])

  const onChangeDescription = useCallback((val: string) => {
    setDescription(val)
  }, [])

  const onSave = useCallback(async () => {
    await setFeed({ description: parseDescription(description) })
    setIsEdit(false)
  }, [description, setFeed, setIsEdit])

  const editable = useCallback(() => isEdit, [isEdit])

  return {
    onCancel,
    onSave,
    editable,
    onChangeDescription,
    description,
  }
}

export { useFeedListItemContext }
