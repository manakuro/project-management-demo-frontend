import React, { memo } from 'react'
import { FlexProps } from 'src/components/atoms'
import { useInboxListItem } from 'src/components/organisms/Inbox'
import { useActivityTypes } from 'src/store/entities/activityTypes'
import { MyTaskList } from './MyTaskList'
import { Provider } from './Provider'
import { WorkspaceList } from './WorkspaceList'

type Props = FlexProps & {
  listItemId: string
}

export const InboxListItem: React.FC<Props> = memo<Props>((props) => {
  return (
    <Provider>
      <Component {...props} />
    </Provider>
  )
})

const Component: React.FC<Props> = memo<Props>((props) => {
  const { listItemId } = props
  const { listItem } = useInboxListItem(listItemId)
  const { isWorkspaceType, isTaskType } = useActivityTypes()

  switch (true) {
    case isWorkspaceType(listItem.type):
      return <WorkspaceList workspaceListId={listItem.id} />
    case isTaskType(listItem.type):
      return <MyTaskList myTaskListId={listItem.id} />
    default:
      return null
  }
})

InboxListItem.displayName = 'InboxListItem'
