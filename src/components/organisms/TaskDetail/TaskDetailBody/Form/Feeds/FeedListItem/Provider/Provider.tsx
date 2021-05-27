import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'
import { Feed, defaultFeedStateValue, useFeed } from 'src/store/feeds'
import {
  Teammate,
  defaultTeammateStateValue,
  useTeammate,
} from 'src/store/teammates'
import { Provider as ProviderContainer } from './ProviderContainer'

type ContextProps = {
  description: string
  editable: () => boolean
  feed: Feed
  isPinned: boolean
  onCancel: () => void
  onChangeDescription: (val: string) => void
  onCopyCommentLink: () => void
  onEdit: () => void
  onPin: () => void
  onSave: () => void
  onUnpin: () => void
  showFeedOptionMenu: boolean
  showLike: boolean
  teammate: Teammate
}

const Context = createContext<ContextProps>({
  description: '',
  editable: () => false,
  feed: defaultFeedStateValue(),
  isPinned: false,
  onCancel: () => {},
  onChangeDescription: () => {},
  onCopyCommentLink: () => {},
  onEdit: () => {},
  onPin: () => void {},
  onSave: () => {},
  onUnpin: () => void {},
  showFeedOptionMenu: false,
  showLike: false,
  teammate: defaultTeammateStateValue(),
})
export const useFeedListItem = () => useContext(Context)

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

const ProviderBase: React.FC<Props> = (props) => {
  const { feed } = useFeed(props.feedId)
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

  return (
    <Context.Provider
      value={{
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
        isPinned: props.isPinned || false,
      }}
    >
      {props.children}
    </Context.Provider>
  )
}

function useFeedOptionMenu(props: Props) {
  const { feed, setFeed } = useFeed(props.feedId)
  const [isEdit, setIsEdit] = useState<boolean>(false)

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
      `${window.location.origin}/tasks/${props.taskId}/${feed.id}/`,
    )
  }, [feed.id, props.taskId])

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

function useEditor(
  props: Props,
  {
    setIsEdit,
    isEdit,
  }: {
    setIsEdit: React.Dispatch<React.SetStateAction<boolean>>
    isEdit: boolean
  },
) {
  const { setFeed } = useFeed(props.feedId)

  const onCancel = useCallback(() => setIsEdit(false), [setIsEdit])

  const [description, setDescription] = useState<string>('')
  const onChangeDescription = useCallback((val: string) => {
    setDescription(val)
  }, [])

  const onSave = useCallback(async () => {
    await setFeed({ description })
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
