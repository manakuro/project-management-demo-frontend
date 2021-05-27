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
  feed: Feed
  teammate: Teammate
  editable: () => boolean
  onEdit: () => void
  onCancel: () => void
  description: string
  onChangeDescription: (val: string) => void
  onSave: () => void
  showFeedOptionMenu: boolean
  showLike: boolean
  onPin: () => void
  onUnpin: () => void
  isPinned: boolean
}

const Context = createContext<ContextProps>({
  feed: defaultFeedStateValue(),
  teammate: defaultTeammateStateValue(),
  editable: () => false,
  onEdit: () => {},
  onCancel: () => {},
  description: '',
  onChangeDescription: () => {},
  onSave: () => {},
  showFeedOptionMenu: false,
  showLike: false,
  onPin: () => void {},
  onUnpin: () => void {},
  isPinned: false,
})
export const useFeedListItem = () => useContext(Context)

type Props = {
  feedId: string
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

  return {
    onPin,
    onUnpin,
    onEdit,
    showFeedOptionMenu,
    showLike,
    isEdit,
    setIsEdit,
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
