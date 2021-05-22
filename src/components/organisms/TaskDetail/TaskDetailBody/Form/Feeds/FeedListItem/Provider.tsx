import React, { createContext, useCallback, useContext, useState } from 'react'
import { Feed, useFeed } from 'src/store/feeds'
import { Teammate, useTeammate } from 'src/store/teammates'

type ContextProps = {
  feed: Feed
  teammate: Teammate
  editable: () => boolean
  onEdit: () => void
}

const Context = createContext<ContextProps>({
  feed: {
    id: '',
    description: '',
    attachmentIds: [],
    createdAt: '',
    updatedAt: '',
    taskId: '',
    teammateId: '',
    type: 1,
    isFirst: false,
  },
  teammate: {
    id: '',
    name: '',
    image: '',
    email: '',
  },
  editable: () => false,
  onEdit: () => {},
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

  return (
    <Context.Provider
      value={{
        feed,
        teammate,
        editable,
        onEdit,
      }}
    >
      {props.children}
    </Context.Provider>
  )
}
