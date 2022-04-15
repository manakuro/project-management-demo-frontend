import React, { memo } from 'react'
import { FlexProps } from 'src/components/atoms'
import { useInboxListItem } from 'src/components/organisms/Inbox'
import { ActivityTypeCode } from 'src/store/entities/activityType'
import { Provider } from './Provider'
import { TaskActivity } from './TaskActivity'
import { WorkspaceActivity } from './WorkspaceActivity'

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

  switch (listItem.type) {
    case ActivityTypeCode.Workspace:
      return <WorkspaceActivity workspaceActivityId={listItem.id} />
    case ActivityTypeCode.Task:
      return <TaskActivity taskActivityId={listItem.id} />
    default:
      return null
  }
})
Component.displayName = 'Component'

InboxListItem.displayName = 'InboxListItem'
