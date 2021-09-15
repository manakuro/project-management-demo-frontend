import React, { memo } from 'react'
import { FlexProps } from 'src/components/atoms'
import { useInboxListItem } from 'src/components/organisms/Inbox'
import { useActivityTypes } from 'src/store/entities/activityTypes'
import { Provider } from './Provider'
import { TaskActivity } from './TaskActivity'
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
      return <TaskActivity taskActivityId={listItem.id} />
    default:
      return null
  }
})

InboxListItem.displayName = 'InboxListItem'
