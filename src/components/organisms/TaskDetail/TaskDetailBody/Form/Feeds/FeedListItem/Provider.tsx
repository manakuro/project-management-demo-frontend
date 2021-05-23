import React, { createContext, useCallback, useContext, useState } from 'react'
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
}

const Context = createContext<ContextProps>({
  feed: defaultFeedStateValue(),
  teammate: defaultTeammateStateValue(),
  editable: () => false,
  onEdit: () => {},
  onCancel: () => {},
})
export const useFeedListItem = () => useContext(Context)

type Props = {
  feedId: string
}
export const Provider: React.FC<Props> = (props) => {
  const { feed } = useFeed(props.feedId)
  const { teammate } = useTeammate(feed.teammateId)
  const [isEdit, setIsEdit] = useState<boolean>(false)
  const editable = useCallback(() => isEdit, [isEdit])

  const onEdit = useCallback(() => setIsEdit(true), [])
  const onCancel = useCallback(() => setIsEdit(false), [])

  return (
    <Context.Provider
      value={{
        feed,
        teammate,
        editable,
        onEdit,
        onCancel,
      }}
    >
      {props.children}
    </Context.Provider>
  )
}
