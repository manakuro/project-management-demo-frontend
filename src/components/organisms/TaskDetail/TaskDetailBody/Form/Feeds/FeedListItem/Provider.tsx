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
  const { feed, setFeed } = useFeed(props.feedId)
  const { teammate } = useTeammate(feed.teammateId)
  const [isEdit, setIsEdit] = useState<boolean>(false)
  const editable = useCallback(() => isEdit, [isEdit])

  const onEdit = useCallback(() => setIsEdit(true), [])
  const onCancel = useCallback(() => setIsEdit(false), [])

  const [description, setDescription] = useState<string>('')
  const onChangeDescription = useCallback((val: string) => {
    setDescription(val)
  }, [])

  const onSave = useCallback(async () => {
    await setFeed({ description })
    setIsEdit(false)
  }, [description, setFeed])

  const onPin = useCallback(async () => {
    await setFeed({ isPinned: true })
  }, [setFeed])

  const onUnpin = useCallback(async () => {
    await setFeed({ isPinned: false })
  }, [setFeed])

  const showFeedOptionMenu = useMemo(() => !feed.isFirst, [feed.isFirst])
  const showLike = useMemo(() => !feed.isFirst, [feed.isFirst])

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
