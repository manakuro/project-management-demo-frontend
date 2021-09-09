import React, { memo } from 'react'
import { FlexProps } from 'src/components/atoms'
import { useActivity } from 'src/store/app/inbox/activity/activities'
import { useActivityTypes } from 'src/store/entities/activityTypes'
import { Provider } from './Provider'
import { WorkspaceActivity } from './WorkspaceActivity'

type Props = FlexProps & {
  activityId: string
}

export const InboxListItem: React.FC<Props> = memo<Props>((props) => {
  return (
    <Provider>
      <Component {...props} />
    </Provider>
  )
})

const Component: React.FC<Props> = memo<Props>((props) => {
  const { activityId } = props
  const { activity } = useActivity(activityId)
  const { isWorkspaceType } = useActivityTypes()

  switch (true) {
    case isWorkspaceType(activity.type):
      return <WorkspaceActivity workspaceActivityId={activity.id} />
    default:
      return null
  }
})

InboxListItem.displayName = 'InboxListItem'
