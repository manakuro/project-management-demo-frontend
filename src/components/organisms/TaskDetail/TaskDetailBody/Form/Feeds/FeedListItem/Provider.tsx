import React, { createContext, useContext } from 'react'
import { Feed, useFeed } from 'src/store/feeds'
import { Teammate, useTeammate } from 'src/store/teammates'

type ContextProps = {
  feed: Feed
  teammate: Teammate
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
  },
  teammate: {
    id: '',
    name: '',
    image: '',
    email: '',
  },
})
export const useFeedListItem = () => useContext(Context)

type Props = {
  feedId: string
}
export const Provider: React.FC<Props> = (props) => {
  const { feed } = useFeed(props.feedId)
  const { teammate } = useTeammate(feed.teammateId)

  return (
    <Context.Provider
      value={{
        feed,
        teammate,
      }}
    >
      {props.children}
    </Context.Provider>
  )
}
